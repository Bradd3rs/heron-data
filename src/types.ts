type Category = {
  code: string;
  description: string;
};

type PaymentProcessor = {
  heron_id: string;
  name: string;
  url: string;
};

type Merchant = {
  name: string;
  heron_id: string;
  icon_url: string;
  url: string;
  categories: Category[];
};

export type Transaction = {
  merchant: Merchant;
  payment_processor: PaymentProcessor;
};
