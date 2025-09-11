import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ContactMessages,
  ContactMessagesDocument,
} from '../schemas/contact-messages.schema';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectModel(ContactMessages.name)
    private contactMessagesModel: Model<ContactMessagesDocument>,
    private notificationsService: NotificationsService,
  ) {}

  public async createMessage(messageData) {
    const contactMessage = new this.contactMessagesModel(messageData);

    const contactMessageStatus = await contactMessage.save();

    await this.notificationsService.sendPushNotificationToUserDevices(
      process.env.ADMIN_EMAIL,
      {
        title: 'Ново съобщение',
        body: `Ново съобщение от потребител ${messageData.name}`,
      },
    );

    return contactMessageStatus;
  }
}
