export function dateTimeToIso(date: Date) {
  return date.toISOString();
}

export function dateTimeIsEqual(d1: Date, d2: Date) {
  return d1.getTime() === d2.getTime();
}
