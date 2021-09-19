export {};

export function dateToTime(date: Date): string {
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  return `${hour >= 10 ? hour : `0${hour}`}:${
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  } ${date.getHours() > 12 ? 'PM' : 'AM'}`;
}
