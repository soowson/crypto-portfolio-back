import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorators';
import { UserEntity } from '../user/user.entity';
import { GetPortfolioListResponse } from '../types/portfolio/portfolio';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    @Inject(PortfolioService) private portfolioService: PortfolioService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  portfolioListForUser(
    @UserObj() user: UserEntity,
  ): Promise<GetPortfolioListResponse> {
    return this.portfolioService.portfolioListForUser(user);
  }
}
