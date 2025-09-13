import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { NotificationsService } from 'src/notifications/notifications.service';
import {
  FirebaseDevices,
  FirebaseDevicesSchema,
} from 'src/notifications/schemas/firebase-devices.schema';
import { FirebaseDevicesProvider } from 'src/notifications/providers/firebase-devices.provider';
import { Company, CompanySchema } from 'src/company/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    NotificationsService,
    FirebaseDevicesProvider,
  ],
  exports: [UserService],
})
export class UserModule {}
