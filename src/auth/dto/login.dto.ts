import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'example' })
  username: string;

  @ApiProperty({ example: 'secretpassword123' })
  password: string;
}
