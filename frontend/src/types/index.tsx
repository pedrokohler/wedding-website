export type ErrorResponse = {
  message: string;
};

export type GiftCardProduct = {
  _id: string;
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  isActive: boolean;
  productUrl: string;
};

export type GiftsDto = {
  items: GiftCardProduct[];
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
};

export enum SortFields {
  "name:asc" = "name",
  "priceInCents:asc" = "priceInCents",
  "manualOrdering:asc" = "manualOrdering",
  "name:desc" = "-name",
  "priceInCents:desc" = "-priceInCents",
  "manualOrdering:desc" = "-manualOrdering",
}

export type VisitorsDto = {
  uniqueSessionsCount: number;
};
