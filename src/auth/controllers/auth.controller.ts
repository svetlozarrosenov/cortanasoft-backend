import {
  Controller,
  Post,
  UseGuards,
  Res,
  Req,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from '../dto/login.dto';
import { FirebaseDevicesProvider } from 'src/notifications/providers/firebase-devices.provider';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ConfirmPasswordResetDto } from '../dto/confirm-password-reset.dto';

@Controller('auth')
export class AuthController {
  public constructor(
    private authService: AuthService,
    @InjectModel('UserSchema') private userSchema: Model<UserDocument>,
    private firebaseDevicesProvider: FirebaseDevicesProvider,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Req() req: Request,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const firebaseId = loginDto.firebaseId;
    const user = req.user as any;

    const token = await this.authService.login(user);

    if (
      firebaseId &&
      !(await this.firebaseDevicesProvider.firebaseIdExists(firebaseId))
    ) {
      await this.firebaseDevicesProvider.addFirebaseId(user, firebaseId);
    }

    const cookieSettings: CookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 часа
      path: '/',
      sameSite: 'lax',
    };

    if (process.env.NODE_ENV === 'production') {
      cookieSettings.secure = true;
    }
    res.cookie('jwt', token, cookieSettings);

    return {
      user,
      nestjsAccessToken: token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }

  @Post('reset/password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.sendResetPasswordEmail(
      resetPasswordDto.email,
    );
  }

  @Post('/confirm-password-reset')
  async confirmPasswordReset(
    @Body() confirmPasswordResetDto: ConfirmPasswordResetDto,
  ) {
    return await this.authService.confirmPasswordReset(
      confirmPasswordResetDto.newPassword,
      confirmPasswordResetDto.confirmNewPassword,
      confirmPasswordResetDto.token,
    );
  }
}
