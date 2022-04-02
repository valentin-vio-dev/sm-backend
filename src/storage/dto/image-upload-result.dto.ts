import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadResult {
  @ApiProperty({ example: 'example.png' })
  readonly filename: string;
}
