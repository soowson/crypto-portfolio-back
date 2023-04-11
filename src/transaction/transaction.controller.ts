import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorators';
import { UserEntity } from '../user/user.entity';
import { AddTransactionDto } from './dto/addTransaction.dto';
import {
  AddTransactionResponse,
  DeleteTransactionResponse,
  EditTransactionResponse,
  GetTransactionListResponse,
} from '../types/transaction/transaction';
import { EditTransactionDto } from './dto/editTransaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(TransactionService) private transactionService: TransactionService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addTransaction(
    @Body() transaction: AddTransactionDto,
    @UserObj() user: UserEntity,
  ): Promise<AddTransactionResponse> {
    return this.transactionService.addTransaction(transaction, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  editTransaction(
    @Param('id') id: string,
    @Body() transaction: EditTransactionDto,
    @UserObj() user: UserEntity,
  ): Promise<EditTransactionResponse> {
    return this.transactionService.editTransaction(transaction, user);
  }

  @Delete('/:id/:coinId')
  @UseGuards(AuthGuard('jwt'))
  deleteTransaction(
    @Param('id') id: string,
    @Param('coinId') coinId: string,
    @UserObj() user: UserEntity,
  ): Promise<DeleteTransactionResponse> {
    return this.transactionService.deleteTransaction(user, id, coinId);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  transactionListForUser(
    @UserObj() user: UserEntity,
  ): Promise<GetTransactionListResponse> {
    return this.transactionService.transactionListForUser(user);
  }
}
