import { EventItem } from './NewsItem';

export interface CalendarMonth {
  label: number;
  inMonth: boolean;
  date: Date;
  today: boolean;
  event?: EventItem | undefined;
}
