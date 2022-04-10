import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'example' })
  readonly username: string;

  @ApiProperty({ example: 'secretpassword123' })
  readonly password: string;
}
