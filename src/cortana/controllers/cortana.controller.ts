
import { Request } from 'express';
import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CortanaService } from '../services/cortana.service';

@Controller('cortana')
export class CortanaController {
  constructor(private cortanaService: CortanaService) {}

  @Post('ask')
  async testAskAI(
    @Body() data: any,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    try {
      for await (const chunk of this.cortanaService.askAI(data, req.user)) {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      }
    } catch (error) {
      console.error('Error in askAI:', error);
      res.write(`data: ${JSON.stringify({ error: 'An error occurred' })}\n\n`);
    } finally {
      res.end();
    }
  }

  @Post('ask-test')
  async askAI(@Body() data: any, @Req() req: Request): Promise<any> {
    try {
      console.log('crb_data_we', data)
      const response = await this.cortanaService.askAINoGenerator(
        data,
        req.user,
      );
      return { response };
    } catch (error) {
      console.error('Error in askAI:', error);
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
