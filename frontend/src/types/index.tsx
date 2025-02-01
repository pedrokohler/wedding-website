
export type ErrorResponse = {
  message: string;
}

export type GiftCardProduct = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  isActive: boolean;
  productUrl: string;
};