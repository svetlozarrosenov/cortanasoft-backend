import { Module } from '@nestjs/common';
import { CortanaController } from './controllers/cortana.controller';
import { CortanaService } from './services/cortana.service';

@Module({
  controllers: [CortanaController],
  providers: [CortanaService],
})
export class CortanaModule {}
