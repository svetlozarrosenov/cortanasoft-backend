import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './schemas/orders.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { FirebaseDevicesProvider } from 'src/notifications/providers/firebase-devices.provider';
import {
  FirebaseDevices,
  FirebaseDevicesSchema,
} from 'src/notifications/schemas/firebase-devices.schema';
import { Lots, LotsSchema } from 'src/lots/schemas/lots.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    MongooseModule.forFeature([
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
    ]),
    MongooseModule.forFeature([{ name: Lots.name, schema: LotsSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, NotificationsService, FirebaseDevicesProvider],
})
export class OrdersModule {}
