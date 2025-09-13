import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfirmUserDto } from '../dto/confirm-user.dto';
import { Request } from 'express';
import { CompanyRolesEnum } from 'src/company-roles/constants';
import { CompanyRoles } from 'src/company-roles/decorators/company-roles.decorator';
import { CompanyRolesGuard } from 'src/company-roles/guards/company-roles.guard';

@Controller('user')
export class UserController {
  public constructor(private userService: UserService) {}

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

  @UseGuards(JwtAuthGuard, CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Post('create')
  public async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @UseGuards(JwtAuthGuard, CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Put('update/:id')
  public async update(@Param('id') userId: any, @Body() userDto: UserDto) {
    return await this.userService.update(userId, userDto);
  }

  @UseGuards(JwtAuthGuard, CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Get(':id')
  public async getAllCompanyUsers(@Param('id') companyId: any): Promise<any> {
    return await this.userService.getAllCompanyUsers(companyId);
  }
}
