import { PortfolioEntity } from '../../portfolio/portfolio.entity';

export type GetPortfolioListResponse =
  | PortfolioEntity[]
  | {
      message: 'TO CREATE YOUR PORTFOLIO ADD TRANSACTION!';
    };

export interface GetPortfolioReq {
  coinId: string;
  coinName: string;
  overallAmount: number;
  overallPrice: number;
}
