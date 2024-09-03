export interface NewsItem {
  title: string;
  type: ('Wettkampf' | 'Seminar' | 'Prüfung')[];
  startDate: Date | string;
  endDate?: Date | string;
  location: string;
  announcement: string;
  id: number | string;
}
