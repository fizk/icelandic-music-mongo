const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/;

export const validDate = (date: string): boolean => date.match(RFC_3339_REGEX) !== null;
