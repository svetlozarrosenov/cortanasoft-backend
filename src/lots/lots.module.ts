import { Module } from '@nestjs/common';
import { LotsController } from './controllers/lots.controller';
import { LotsService } from './services/lots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lots, LotsSchema } from './schemas/lots.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lots.name, schema: LotsSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [LotsController],
  providers: [LotsService],
})
export class LotsModule {}
