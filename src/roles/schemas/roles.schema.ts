import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type RolesDocument = Roles & Document;

// Дефинираме интерфейс за секцията, за да улесним рекурсията
interface Permission {
  sectionId: string;
  title: string;
  url: string;
  apis: string[];
  tables: {
    id: string;
    fields: {
      field?: string;
      headerName: string;
      filter?: boolean;
      flex?: number;
      width?: number;
      minWidth?: number;
    }[];
  }[];
  children?: Permission[];
}

@Schema({ collection: 'roles', timestamps: true })
export class Roles {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company', required: true })
  companyId: ObjectId;

  @Prop({
    type: [
      {
        sectionId: { type: String, required: true },
        title: { type: String, required: true },
        url: { type: String, required: true },
        apis: [{ type: String }],
        tables: [
          {
            id: { type: String, required: true },
            fields: [
              {
                field: { type: String, required: false },
                headerName: { type: String, required: true },
                filter: { type: Boolean, required: false },
                flex: { type: Number, required: false },
                width: { type: Number, required: false },
                minWidth: { type: Number, required: false },
              },
            ],
          },
        ],
        children: { type: [Object], default: undefined }, // Рекурсивно поле
      },
    ],
    default: [],
  })
  permissions: Permission[];

  @Prop({ type: [{ type: String }], default: [] })
  backendPermissions: string[];
}

export const RolesSchema = SchemaFactory.createForClass(Roles);

// Рекурсивно дефиниране на children
RolesSchema.path('permissions').schema.add({
  children: [{ type: RolesSchema.path('permissions').schema }],
});
