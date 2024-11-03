export type Exchange = {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
};

export type Stock = {
  code: string;
  stockName: string;
  price: number;
};

export type ControlOption = {
  code: string;
  text: string;
};

export type Option = Exchange | Stock | ControlOption;

export type Message = {
  id: string;
  speaker: "user" | "bot";
  text: string;
  options?: Option[];
};

export const isExchange = (object: Option): object is Exchange =>
  "stockExchange" in object;

export const isStock = (object: Option): object is Stock =>
  "stockName" in object;
