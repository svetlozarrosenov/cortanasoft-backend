import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from 'src/client/schemas/client.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientsModel: Model<ClientDocument>,
  ) {}

  public async getAllClients(user) {
    const clients = await this.clientsModel
      .find({ companyId: user.companyId })
      .exec();
    return clients;
  }

  public async createClient(createClientDto, user) {
    const newClient = new this.clientsModel({
      ...createClientDto,
      companyId: user.companyId,
    });

    return await newClient.save();
  }

  public async updateClient(_id, rolesData, user) {
    return await this.clientsModel.updateOne(
      { _id, companyId: user.companyId },
      {
        ...rolesData,
      },
    );
  }
}
