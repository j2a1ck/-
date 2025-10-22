import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  signUpDto,
  loginDto,
  restPasswordDto,
  verifyRestPasswordDTo,
} from './dto/auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'User login successfully',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        message: 'User login successfully',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: loginDto) {
    return this.authService.signIn(signInDto.email, signInDto.pass);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        message: 'User registered successfully',
      },
    },
  })
  @Post('signup')
  signup(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.pass);
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: '22',
      },
    },
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user.sub;
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        messgae: 'email has been send',
      },
    },
  })
  @Public()
  @Post('reset-password')
  forgetPassword(@Body() restPasswordDto: restPasswordDto) {
    return this.authService.requestResetPassword(restPasswordDto.email);
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'your password has been changed',
      },
    },
  })
  @Public()
  @Post('verify-reset-password')
  verifyRestPassword(@Body() verifyRestPasswordDTo: verifyRestPasswordDTo) {
    return this.authService.resetPassword(
      verifyRestPasswordDTo.email,
      verifyRestPasswordDTo.token,
      verifyRestPasswordDTo.newPassword,
    );
  }
}
