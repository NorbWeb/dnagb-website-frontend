export interface NewsItem {
  title: string;
  type: NewsItemType[];
  date_start: Date | string;
  date_end: Date | string | null;
  past: boolean;
  location_name: string;
  street: string;
  number: string;
  city: string;
  postal_code: string;
  announcement: string;
  id: number;
  description: string;
  status: string;
  image: string;
}

export type NewsItemType = 'Wettkampf' | 'Seminar' | 'Prüfung';
