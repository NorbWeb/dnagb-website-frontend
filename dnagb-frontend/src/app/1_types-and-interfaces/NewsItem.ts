export interface EventItem {
  title: string;
  type: EventType[];
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

export type EventType = 'Wettkampf' | 'Seminar' | 'Prüfung';

export interface NewsItem {
  announcement: string;
  article: string;
  id: number;
  image: string;
  date_start: Date | string;
  title: string;
  status: string;
}
