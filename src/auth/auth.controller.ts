import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDTO } from './dto/token.dto';
import { LoginDTO } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/employee')
  @UseGuards(AuthGuard('employee-local'))
  @ApiOperation({ summary: 'Authenticate employee.' })
  @ApiBody({ type: LoginDTO })
  @ApiCreatedResponse({
    description: 'Return the generated JWT token.',
    type: TokenDTO,
  })
  async loginEmployee(@Request() request) {
    return {
      token: this.authService.getToken(request.user),
    };
  }
}
