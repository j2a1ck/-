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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: loginDto) {
    return this.authService.signIn(signInDto.email, signInDto.pass);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: 'Cat',
  })
  @Post('signup')
  signup(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.pass);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user.sub;
  }

  @Public()
  @Post('reset-password')
  forgetPassword(@Body() restPasswordDto: restPasswordDto) {
    return this.authService.requestResetPassword(restPasswordDto.email);
  }

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
