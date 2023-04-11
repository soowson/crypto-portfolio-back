export interface CoinReq {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  current_price: number;
  market_cap: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  image: string;
}

export interface CoinInfoReq {
  id: string;
  symbol: string;
  name: string;
  market_data: MarketData;
  market_cap_rank: number;
  image: string;
  description: Description;
}

export type MarketData = {
  current_price: number;
  market_cap: number;
};
export type Description = {
  en: string;
};
