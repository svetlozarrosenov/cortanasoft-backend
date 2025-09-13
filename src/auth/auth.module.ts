import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { FirebaseDevicesProvider } from 'src/notifications/providers/firebase-devices.provider';
import {
  FirebaseDevices,
  FirebaseDevicesSchema,
} from 'src/notifications/schemas/firebase-devices.schema';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.PASSPORT_SECRET}`,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  exports: [AuthService],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    FirebaseDevicesProvider,
    NotificationsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
