import { type ClassValue, clsx  } from "clsx";
import { twMerge } from "tailwind-merge";

export function localCapitalize(str: string) {
  if (str.length > 1) {
    str = str.toLocaleLowerCase()
    return str[0].toLocaleUpperCase() + str.slice(1)
  }
  else {
    return str ? str.toLocaleUpperCase() : str
  }
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

export function getWN(locale = 'en-US', short = false) {
  const format = new Intl.DateTimeFormat(locale, { weekday: short ? 'short' : 'long' });
  const days = [];

  for (let day = 0; day < 7; day++) {
    const date = new Date(2023, 0, day + 1);
      days.push(localCapitalize(format.format(date)))
  }

  return days;
}

export async function getUserCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code; // Returns 'US', 'PL', etc.
  } catch (error) {
    console.error("Error detecting country:", error);
    return 'PL'; // Fallback country
  }
}