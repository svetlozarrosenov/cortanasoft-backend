import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfirmUserDto } from '../dto/confirm-user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  public constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async getAllCompanyUsers(@Req() req: Request): Promise<any> {
    return await this.userService.getAllCompanyUsers(req.user);
  }

  @Post('register')
  public async register(@Body() userDto: UserDto): Promise<{ status; text }> {
    const message = await this.userService.register(userDto);

    return message;
  }

  @Get('register/confirm')
  public async confirm(@Query() confirmUserDto: ConfirmUserDto) {
    const confirmed = await this.userService.confirm(confirmUserDto.token);
    return confirmed;
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  public async currentUser(@Req() request): Promise<any> {
    const user = await this.userService.findOne(request.user.email);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async profile(): Promise<string> {
    return 'profile';
  }
}
