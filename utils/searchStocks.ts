import { stockPrices, stocks } from "@/data";

export const searchStocks = (text: string) => {
  if (!text) return [];

  return stocks.filter(
    (stock) =>
      stock.ticker.match(new RegExp(text, "i")) ||
      stock.companyName.match(new RegExp(text, "i"))
  );
};

export const selectStock = (text: string) => {
  const stock = stocks.filter((stock) => stock.ticker === text);
  if (stock) return stock[0];
  return null;
};

export const selectStockPrices = (text: string) => {
  const stock = stockPrices.filter((stock) => stock.ticker === text);
  if (stock) return stock[0].prices;
  return null;
};
