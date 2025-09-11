import { Module } from '@nestjs/common';
import { RoleSettingsController } from './controllers/role-settings.controller';
import { RoleSettingsService } from './services/role-settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RoleSettings,
  RoleSettingsSchema,
} from './schemas/role-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleSettings.name, schema: RoleSettingsSchema },
    ]),
  ],
  controllers: [RoleSettingsController],
  providers: [RoleSettingsService],
})
export class RoleSettingsModule {}
