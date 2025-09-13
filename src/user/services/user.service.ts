import {
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { JwtService } from '@nestjs/jwt';
import { Company, CompanyDocument } from 'src/company/schemas/company.schema';

@Injectable()
export class UserService {
  public constructor(
    private notificationService: NotificationsService,
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private jwtService: JwtService,
  ) {}

  public async getAllCompanyUsers(companyId) {
    const users =  await this.userSchema.aggregate([
      { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
      {
        $lookup: {
          from: `roles`,
          localField: 'roleId',
          foreignField: '_id',
          as: 'roles',
        },
      },
      {
        $unwind: {
          path: '$roles',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          email: 1,
          phone: 1,
          firstName: 1,
          middleName: 1,
          lastName: 1,
          address: 1,
          city: 1,
          country: 1,
          role: '$roles.name',
          roleId: '$roles._id',
        },
      },
    ]);
    console.log('crb_users', users);
    return users;
  }

  public async create(userDto: UserDto) {
    const newUser = new this.userSchema({
      ...userDto,
      password: await bcrypt.hash(userDto.password, 10),
    });

    return await newUser.save();
  }

  public async update(_id, userData) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await this.userSchema.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...userData,
        },
      },
    );

    return updatedUser;
  }

  public async register(userDto: UserDto): Promise<any> {
    if (await this.userExists(userDto.email)) {
      throw new ConflictException(
        'Потребител с този имейл адрес вече съществува',
      );
    }

    const confirmationToken = this.jwtService.sign(
      { email: userDto.email },
      {
        secret: process.env.PASSPORT_SECRET,
        expiresIn: '24h',
      },
    );

    const user: any = await this.userSchema.insertMany({
      ...userDto,
      password: await bcrypt.hash(userDto.password, 10),
      confirmationToken,
    });

    const message = {
      status: 'success',
      text: 'User Created!',
    };

    if (!user.length) {
      message.status = 'failed';
      message.text = 'User was not created';
    }

    if (message.status === 'success' && user.length) {
      await this.notificationService.sendEmail(
        user[0].email,
        'Успешна регистрация в Сентинел',
        await this.getEmailText(user[0], confirmationToken),
      );
    }

    return message;
  }

  private async userExists(email: string): Promise<boolean> {
    const user = await this.userSchema.findOne({ email });
    return !!user;
  }

  public async confirm(token: string) {
    try {
      const decodedToken = await this.verifyToken(token);
      const email = decodedToken.email;
      await this.userSchema.updateOne(
        { email },
        { confirmed: true, confirmationToken: '' },
      );
      return { status: 'success' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired confirmation token');
    }
  }

  private async verifyToken(token: string) {
    try {
      const jwt = this.jwtService.verify(token, {
        secret: process.env.PASSPORT_SECRET,
      });
      return jwt;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private async getEmailText(user, token) {
    return `Уважаеми ${user.firstName} ${user.lastName},

Благодарим Ви, че се регистрирахте в Сентинел! Радваме се да Ви приветстваме в нашата общност.

За да завършите процеса на регистрация и да активирате акаунта си, моля, кликнете върху линка по-долу:

[Потвърдете регистрацията си](${process.env.FRONT_END_URL}/register/confirm?token=${token}

Този линк ще бъде валиден в рамките на 24 часа. Ако не успеете да потвърдите регистрацията си в този срок, моля, посетете нашия уебсайт и заявете нов линк за потвърждение.

След като потвърдите регистрацията си, ще имате пълен достъп до всички функции на Сентинел. Ето няколко стъпки, които можете да предприемете:

1. Попълнете профила си с допълнителна информация
2. Разгледайте нашите въвеждащи ръководства
3. Свържете се с нашата поддръжка, ако имате въпроси

Ако не сте заявявали регистрация в Сентинел, моля, игнорирайте това съобщение или се свържете с нашия екип за поддръжка.

Благодарим Ви отново за присъединяването към Сентинел. Очакваме с нетърпение да Ви предоставим отлично обслужване!

С уважение,
Екипът на Сентинел

---

Това съобщение е изпратено автоматично. Моля, не отговаряйте на този имейл. Ако имате въпроси, използвайте формата за контакт на нашия уебсайт.`;
  }
  public async findOne(email: string): Promise<UserDocument> {
    return await this.userSchema
      .findOne({ email })
      .select(
        'email firstName middleName lastName role country city address phone companyId',
      )
      .lean();
  }

  public async updateUserPassword(email, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw Error('Passwords are different');
    }

    return await this.userSchema.updateOne(
      { email },
      {
        $set: { password: await bcrypt.hash(password, 10) },
      },
    );
  }
}
