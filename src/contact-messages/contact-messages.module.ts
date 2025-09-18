import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactMessagesController } from './controllers/contact-messages.controller';
import { ContactMessagesService } from './services/contact-messages.service';
import {
  ContactMessages,
  ContactMessagesSchema,
} from './schemas/contact-messages.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { FirebaseDevicesProvider } from 'src/notifications/providers/firebase-devices.provider';
import {
  FirebaseDevices,
  FirebaseDevicesSchema,
} from 'src/notifications/schemas/firebase-devices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactMessages.name, schema: ContactMessagesSchema },
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
    ]),
  ],
  controllers: [ContactMessagesController],
  providers: [
    ContactMessagesService,
    NotificationsService,
    FirebaseDevicesProvider,
  ],
})
export class ContactMessagesModule {}
