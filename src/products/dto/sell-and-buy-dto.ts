import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// sell/buy only by quantity entered
export class SellOrBuyDTO {
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number, description: 'quantity change' })
  quantity: number;
}
