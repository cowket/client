export {};

export function dateToTime(date: Date): string {
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  return `${hour >= 10 ? hour : `0${hour}`}:${
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  } ${date.getHours() > 12 ? 'PM' : 'AM'}`;
}

export function dateToShortDate(date: Date): string {
  return `${date.getFullYear()}.${
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }.${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`;
}

export function isFirstMessage(prevDate: Date, nextDate: Date): boolean {
  return (
    prevDate.getFullYear() !== nextDate.getFullYear() &&
    prevDate.getMonth() !== nextDate.getMonth() &&
    prevDate.getDate() !== nextDate.getDate()
  );
}
