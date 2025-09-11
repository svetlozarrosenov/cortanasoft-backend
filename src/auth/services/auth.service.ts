import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotificationsService } from 'src/notifications/notifications.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectModel('UserSchema') private userSchema: Model<UserDocument>,

    private jwtService: JwtService,
    private notificationService: NotificationsService,
  ) {}

  public async validateUser(email: string, pass: string) {
    const user = await this.userSchema.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const verified = bcrypt.compareSync(pass, user?.password);
    if (verified) {
      return user;
    }

    throw new UnauthorizedException();
  }

  public async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user._id };
    return await this.jwtService.sign(payload, {
      secret: process.env.PASSPORT_SECRET,
    });
  }

  public async sendResetPasswordEmail(email: string) {
    try {
      const findedUser = await this.userService.findOne(email);
      if (!findedUser) {
        throw new Error("User doesn't exist!");
      }

      const payload = {
        email: email,
        sub: findedUser.id,
      };
      const resetToken = await this.jwtService.signAsync(payload, {
        secret: process.env.PASSPORT_SECRET,
        expiresIn: '4h',
      });

      const resetLink = `${process.env.FRONT_END_URL}/reset-password?token=${resetToken}`;

      const emailSubject = 'Заявка за възстановяване на парола в Сентинел';
      const emailBody = `
        Здравей,

        Получихме заявка за възстановяване на паролата за твоя акаунт в Сентинел. 
        Моля, използвай следния линк, за да зададеш нова парола:

        ${resetLink}

        Линкът е валиден 4 часа. Ако не си направил тази заявка, моля, игнорирай този имейл 
        или се свържи с нас на sentinel@sentinel-bg.info за допълнителна помощ.

        Благодарим ти, че използваш Сентинел!

        Поздрави,  
        Екипът на Сентинел  
      `;

      await this.notificationService.sendEmail(email, emailSubject, emailBody);

      return { message: 'Линк за възстановяване е изпратен успешно' };
    } catch (e) {
      throw e;
    }
  }

  public async confirmPasswordReset(password, confirmPassword, token) {
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.PASSPORT_SECRET,
    });

    const passwordUpdate = await this.userService.updateUserPassword(
      decodedToken.email,
      password,
      confirmPassword,
    );

    const bgTime = new Date().toLocaleString('bg-BG', {
      timeZone: 'Europe/Sofia',
    });

    const emailSubject = 'Паролата ти в Сентинел беше успешно сменена';
    const emailBody = `
      Здравей,

      Паролата за твоя акаунт в Сентинел беше успешно сменена на ${bgTime}.

      Ако ти си направил тази промяна, няма нужда от действие от твоя страна. 
      Ако не си сменил паролата или смяташ, че това е грешка, моля, свържи се с нас незабавно на 
      sentinel@sentinel-bg.info или на +359 87 664 9967, за да защитим акаунта ти.

      Благодарим ти, че използваш Сентинел!

      Поздрави,  
      Екипът на Сентинел  
      sentinel@sentinel-bg.info | +359 87 664 9967
    `;

    await this.notificationService.sendEmail(
      decodedToken.email,
      emailSubject,
      emailBody,
    );

    return passwordUpdate;
  }
}
