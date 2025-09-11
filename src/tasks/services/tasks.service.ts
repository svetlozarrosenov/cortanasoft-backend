import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks, TasksDocument } from '../schemas/tasks.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>,
  ) {}

  async getActiveTasks(user) {
    const tasks = await this.tasksModel
      .aggregate([
        {
          $match: {
            companyId: user.companyId,
            status: { $nin: ['complated'] },
          },
        },
        {
          $lookup: {
            from: `users`,
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $unwind: {
            path: '$creator',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: `users`,
            localField: 'reporter',
            foreignField: '_id',
            as: 'reporter',
          },
        },
        {
          $unwind: {
            path: '$reporter',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: `users`,
            localField: 'assignee',
            foreignField: '_id',
            as: 'assignee',
          },
        },
        {
          $unwind: {
            path: '$assignee',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            status: 1,
            deadline: 1,
            recurrenceInterval: 1,
            reporter: {
              $concat: ['$reporter.firstName', ' ', '$reporter.lastName'],
            },
            assignee: {
              $concat: ['$assignee.firstName', ' ', '$assignee.lastName'],
            },
          },
        },
      ])
      .exec();

    return tasks;
  }

  async getAllTasks(user) {
    console.log('crb_user', user);
    const tasks = await this.tasksModel
      .aggregate([
        { $match: { companyId: user.companyId } },
        {
          $lookup: {
            from: `users`,
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $unwind: {
            path: '$creator',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: `users`,
            localField: 'reporter',
            foreignField: '_id',
            as: 'reporter',
          },
        },
        {
          $unwind: {
            path: '$reporter',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: `users`,
            localField: 'assignee',
            foreignField: '_id',
            as: 'assignee',
          },
        },
        {
          $unwind: {
            path: '$assignee',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            status: 1,
            deadline: 1,
            recurrenceInterval: 1,
            reporter: {
              $concat: ['$reporter.firstName', ' ', '$reporter.lastName'],
            },
            assignee: {
              $concat: ['$assignee.firstName', ' ', '$assignee.lastName'],
            },
          },
        },
      ])
      .exec();

    console.log('crb_tasks', tasks);
    return tasks;
  }

  public async getTask(taskId, user) {
    const task = await this.tasksModel
      .aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(taskId),
            companyId: user.companyId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $unwind: {
            path: '$creator',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'reporter',
            foreignField: '_id',
            as: 'reporter',
          },
        },
        {
          $unwind: {
            path: '$reporter',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'assignee',
            foreignField: '_id',
            as: 'assignee',
          },
        },
        {
          $unwind: {
            path: '$assignee',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'comments.author',
            foreignField: '_id',
            as: 'commentAuthors',
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            deadline: 1,
            status: 1,
            recurrenceInterval: 1,
            creator: {
              _id: '$creator._id',
              name: {
                $concat: [
                  '$creator.firstName',
                  ' ',
                  { $ifNull: ['$creator.lastName', ''] },
                ],
              },
            },
            reporter: {
              _id: '$reporter._id',
              name: {
                $concat: [
                  '$reporter.firstName',
                  ' ',
                  { $ifNull: ['$reporter.lastName', ''] },
                ],
              },
            },
            assignee: {
              _id: '$assignee._id',
              name: {
                $concat: [
                  '$assignee.firstName',
                  ' ',
                  { $ifNull: ['$assignee.lastName', ''] },
                ],
              },
            },
            comments: {
              $map: {
                input: '$comments',
                as: 'comment',
                in: {
                  text: '$$comment.text',
                  createdAt: '$$comment.createdAt',
                  author: {
                    $let: {
                      vars: {
                        author: {
                          $arrayElemAt: [
                            '$commentAuthors',
                            {
                              $indexOfArray: [
                                '$commentAuthors._id',
                                '$$comment.author',
                              ],
                            },
                          ],
                        },
                      },
                      in: {
                        _id: '$$author._id',
                        name: {
                          $concat: [
                            '$$author.firstName',
                            ' ',
                            { $ifNull: ['$$author.lastName', ''] },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ])
      .exec();

    console.log('crb_task', task);
    return task.length ? task[0] : null;
  }

  public async updateTask(_id, taskData, user) {
    const updatedTask = await this.tasksModel.findOneAndUpdate(
      { _id, companyId: user.companyId },
      {
        $set: {
          ...taskData,
        },
      },
      {
        new: true,
      },
    );

    return updatedTask;
  }

  public async createComment(_id, taskData, user) {
    const updatedTask = await this.tasksModel.findOneAndUpdate(
      { _id, companyId: user.companyId },
      {
        $push: {
          comments: {
            text: taskData.text,
            author: user.userId,
            createdAt: new Date(),
          },
        },
      },
    );

    return updatedTask;
  }

  public async createTask(user, task) {
    const newTask = new this.tasksModel({
      ...task,
      creator: user.userId,
      companyId: user.companyId,
    });

    return await newTask.save();
  }
}
