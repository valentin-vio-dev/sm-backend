import { Controller, Post, UseGuards } from '@nestjs/common';
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
import { CurrentUser } from './decorators/current-user.decorator';
import { Employee } from 'src/employee/employee.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/employees')
  @UseGuards(AuthGuard('employee-local'))
  @ApiOperation({ summary: 'Authenticate employee.' })
  @ApiBody({ type: LoginDTO })
  @ApiCreatedResponse({
    description: 'Returns auth token.',
    type: TokenDTO,
  })
  async loginEmployee(@CurrentUser() user: Employee) {
    return await this.authService.loginEmployee(user);
  }
}
