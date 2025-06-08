export interface User {
  id: string;
  email: string;
}

export interface Preferences {
  lang: string;
  currencyCode: string;
  timezone: string | null;
  marketingOptIn: boolean;
}