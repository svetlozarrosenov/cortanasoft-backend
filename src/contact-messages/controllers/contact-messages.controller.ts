import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ContactMessagesService } from '../services/contact-messages.service';
import { ContactMessagesDto } from '../dto/contact-messages.dto';

@Controller('contact-form')
export class ContactMessagesController {
  constructor(
    private readonly contactMessagesService: ContactMessagesService,
  ) {}

  @Post('/create-message')
  public async createMessage(@Body() contactMessagesDto: ContactMessagesDto) {
    return await this.contactMessagesService.createMessage(contactMessagesDto);
  }
}
