import moment, { Moment } from 'moment';

export const nameValidator = (text: string): string => {
  if (!(/^[a-zA-Z]+$/.test(text))) {
    return 'A name (with characters) is required';
  }
  return '';
};

export const numberValidator = (text: string): string => {
  if (!(/^[0-9]+$/.test(text))) {
    return 'A number is required';
  }
  return '';
};

export const legalAgeValidator = (date: Moment): string => {
  const eighteenYearsAgo = moment().subtract(18, 'years').startOf('year');
  const validDateOfBirth = moment(date).isSameOrBefore(eighteenYearsAgo);
  if (!validDateOfBirth) { return 'The app is for people over 18'; } return '';
};

export const cityValidator = (text: string): string => {
  if (!(/^[a-zA-Z',.\s-]{1,25}$/.test(text))) {
    return 'A city is required';
  }
  return '';
};

export const alwaysValidValidator = (): string => '';
