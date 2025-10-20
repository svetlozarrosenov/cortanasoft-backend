import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppLoggerMiddleware } from './app.middleware';
import { NotificationsModule } from './notifications/notifications.module';
import { RolesModule } from './roles/roles.module';
import * as admin from 'firebase-admin';
import { NotificationsService } from './notifications/notifications.service';
import { FirebaseDevicesProvider } from './notifications/providers/firebase-devices.provider';
import {
  FirebaseDevices,
  FirebaseDevicesSchema,
} from './notifications/schemas/firebase-devices.schema';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { CompanyModule } from './company/company.module';
import { ClientModule } from './client/client.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { SuppliesModule } from './supplies/supplies.module';
import { LotsModule } from './lots/lots.module';
import { LocationsModule } from './locations/locations.module';
import { TasksModule } from './tasks/tasks.module';
import { CompanyRolesModule } from './company-roles/company-roles.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CortanaModule } from './cortana/cortana.module';
import { CurrencyModule } from './currency/currency.module';
// const firebaseConfig = require('../firebase.json');

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseConfig),
// });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
    ]),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    NotificationsModule,
    RolesModule,
    ContactMessagesModule,
    CompanyModule,
    ClientModule,
    ProductsModule,
    OrdersModule,
    SuppliesModule,
    LotsModule,
    LocationsModule,
    TasksModule,
    CompanyRolesModule,
    InvoicesModule,
    CortanaModule,
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsService, FirebaseDevicesProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
