
export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const times = [
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
];

export const schedule: ScheduleItem[] = [
  {
    id: 1,
    day: "Monday",
    start: "06:00",
    end: "08:00",
    title: "Breakfast Show",
    host: "RJ Alex",
    category: "Music",
  },
  {
    id: 2,
    day: "Monday",
    start: "08:00",
    end: "10:00",
    title: "Morning News",
    host: "Sarah",
    category: "News",
  },
  {
    id: 3,
    day: "Monday",
    start: "10:00",
    end: "12:00",
    title: "Rock Legends",
    host: "Mike",
    category: "Music",
  },
  {
    id: 4,
    day: "Tuesday",
    start: "06:00",
    end: "08:00",
    title: "Breakfast Show",
    host: "RJ Alex",
    category: "Music",
  },
  {
    id: 5,
    day: "Tuesday",
    start: "08:00",
    end: "10:00",
    title: "Morning News",
    host: "Sarah",
    category: "News",
  },
  {
    id: 6,
    day: "Wednesday",
    start: "14:00",
    end: "16:00",
    title: "Sports Hour",
    host: "Chris",
    category: "Sports",
  },
  {
    id: 7,
    day: "Thursday",
    start: "18:00",
    end: "20:00",
    title: "Evening Talk",
    host: "Emma",
    category: "Talk",
  },
  {
    id: 8,
    day: "Friday",
    start: "20:00",
    end: "22:00",
    title: "Weekend Mix",
    host: "David",
    category: "Special",
  },
  {
    id: 9,
    day: "Saturday",
    start: "10:00",
    end: "12:00",
    title: "Top 40",
    host: "RJ John",
    category: "Music",
  },
];

export interface ScheduleItem {
  id: number;
  day: string;
  start: string;
  end: string;
  title: string;
  host: string;
  category: "Music" | "News" | "Talk" | "Sports" | "Special";
}