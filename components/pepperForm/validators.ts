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

export const phoneNumberValidator = (text: string): string => {
  if (!(/^0033[6-7][0-9]{8}$/.test(text))) {
    return 'Phone number must be in this format 0033760208022';
  }
  return '';
};

export const codeValidator = (text: string): string => {
  if (!(/^[0-9]{6}$/.test(text))) {
    return 'The code must have 6 numbers';
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
