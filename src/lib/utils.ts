import { type ClassValue, clsx  } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

export function getWN(locale = 'en-US', short = false) {
  const format = new Intl.DateTimeFormat(locale, { weekday: short ? 'short' : 'long' });
  const days = [];

  // Проходим по всем 7 дням недели (0-6)
  for (let day = 0; day < 7; day++) {
    // Создаём дату, где день недели = day (воскресенье = 0)
    const date = new Date(2023, 0, day + 1); // 1 января 2023 = воскресенье (0)
    days.push(format.format(date));
  }

  return days;
}