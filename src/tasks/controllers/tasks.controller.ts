import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('active')
  async getActiveTasks(@Req() req: Request) {
    return await this.tasksService.getActiveTasks(req.user);
  }

  @Get('/:id')
  async getTask( @Param('id') taskId: any, @Req() req: Request) {
    return await this.tasksService.getTask(taskId, req.user);
  }

  @Get()
  async getTasks(@Req() req: Request) {
    return await this.tasksService.getAllTasks(req.user);
  }

  @Put('/:id/comment/create')
  async createComment(
    @Param('id') productIdDto: any,
    @Body() test,
    @Req() req: Request,
  ) {
    return await this.tasksService.createComment(productIdDto, test, req.user);
  }
  
  @Put('update/:id')
  async getProduct(
    @Param('id') productIdDto: any,
    @Body() test,
    @Req() req: Request,
  ) {
    return await this.tasksService.updateTask(productIdDto, test, req.user);
  }

  @Post('create')
  async createTasks(@Req() req: Request, @Body() TasksDto: any) {
    return await this.tasksService.createTask(req.user, TasksDto);
  }
}
