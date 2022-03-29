import { ApiProperty } from '@nestjs/swagger';

export class TokenDTO {
  @ApiProperty({ example: 'nvc43j23wkmap34h3kokxol4' })
  token: string;
}
