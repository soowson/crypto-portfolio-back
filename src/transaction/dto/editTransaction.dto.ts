import { IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';

export class EditTransactionDto {
  @IsString()
  id;

  @IsString()
  transactionType: string;

  @IsString()
  @Length(1, 36)
  coinId: string;

  @IsString()
  @Length(1, 50)
  coinName: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  amount: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  @Length(0, 1000)
  notes: string;
}
