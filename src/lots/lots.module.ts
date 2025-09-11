import { Module } from '@nestjs/common';
import { LotsController } from './controllers/lots.controller';
import { LotsService } from './services/lots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lots, LotsSchema } from './schemas/lots.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lots.name, schema: LotsSchema }]),
  ],
  controllers: [LotsController],
  providers: [LotsService],
})
export class LotsModule {}
