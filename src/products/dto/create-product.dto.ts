import { Sector } from './../../users/user.role.enum';
import {
  IsString,
  Length,
  IsIn,
  IsNumber,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// I could only implement class validator on dtos-classes, doesnt work on mongoose documents

export class CreateProductDto {
  @IsString()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsString()
  @Length(3, 100)
  @ApiProperty({ type: String, description: 'desc' })
  description: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'price' })
  price: number;

// must be ceil value
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, description: 'quantity' })
  quantity: number;

}
