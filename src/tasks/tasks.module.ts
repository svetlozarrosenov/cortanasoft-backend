import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from './schemas/tasks.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tasks.name, schema: TasksSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
