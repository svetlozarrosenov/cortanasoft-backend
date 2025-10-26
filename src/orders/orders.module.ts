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
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';
import { Supplies, SuppliesSchema } from 'src/supplies/schemas/supplies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orders.name, schema: OrdersSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: FirebaseDevices.name, schema: FirebaseDevicesSchema },
      { name: Lots.name, schema: LotsSchema },
      { name: Supplies.name, schema: SuppliesSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, NotificationsService, FirebaseDevicesProvider],
})
export class OrdersModule {}
