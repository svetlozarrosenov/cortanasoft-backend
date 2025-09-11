import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseDevicesProvider } from './providers/firebase-devices.provider';
import {
  FirebaseDevices,
  FirebaseDevicesSchema,
} from './schemas/firebase-devices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
    ]),
  ],
  providers: [NotificationsService, FirebaseDevicesProvider],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
