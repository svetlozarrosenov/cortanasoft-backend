import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type TasksDocument = Tasks & Document;

@Schema({ collection: 'tasks', timestamps: true })
export class Tasks {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  creator: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  assignee: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  reporter: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company', required: true })
  companyId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    required: true,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop({ required: false })
  deadline?: Date;

  @Prop({
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    default: null,
  })
  recurrenceInterval?: string;

  @Prop({
    type: [
      {
        text: { type: String, required: true },
        author: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  comments?: Array<{ text: string; author: ObjectId; createdAt: Date }>;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);