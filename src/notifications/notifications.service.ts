import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';
import { FirebaseDevicesProvider } from './providers/firebase-devices.provider';

@Injectable()
export class NotificationsService {
  constructor(private firebaseDevicesProvider: FirebaseDevicesProvider) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
  }

  public async sendPushNotificationToUserDevices(
    userEmail: string,
    messageData: { title: string; body: string },
  ) {
    const userTokens = await this.firebaseDevicesProvider.getUserTokens(
      userEmail,
    );

    if (!userTokens.length) {
      return;
    }
    const prepareDMessage = userTokens.map((token) => {
      return {
        token: token.firebaseDeviceId,
        data: {
          title: messageData.title,
          body: messageData.body,
        },
      };
    });

    try {
      const response = await admin.messaging().sendEach(prepareDMessage);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async sendPushNotification(
    tokens: string[],
    messageData: { title: string; body: string; url?: string },
  ) {
    const prepareDMessage = tokens.map((token) => {
      return {
        token: token,
        data: {
          url: messageData.url,
          title: messageData.title,
          body: messageData.body,
        },
      };
    });

    try {
      const response = await admin.messaging().sendEach(prepareDMessage);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  public async sendEmail(to: string, subject: string, text: string) {
    const msg = {
      to: to,
      from: process.env.EMAIL,
      subject: subject,
      text: text,
    };

    try {
      const response = await sgMail.send(msg);
      console.log('Email sent:', response);
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
