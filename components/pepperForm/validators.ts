import moment, { Moment } from 'moment';

export const facebookValidator = (text: string): string => {
  if (!text.length) { return ''; }
  if (!(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(text))) {
    return 'Enter a valid facebook username';
  }
  return '';
};

export const instagramValidator = (text: string): string => {
  if (!text.length) { return ''; }
  if (!(/^(?!.*\.\.|.*\.$)[A-z0-9][\w.]+[A-z0-9]{0,30}$/i.test(text))) {
    return 'Enter a valid instagram username (without @)';
  }
  return '';
};

export const snapchatValidator = (text: string): string => {
  if (!text.length) { return ''; }
  if (!(/^(?!.*\.\.|.*\_\_|.*\-\-)(?!.*\.$|.*\_$|.*\-$)(?!.*\.\-|.*\-\.|.*\-\_|.*\_\-|.*\.\_|.*\_\.)[a-zA-Z]+[\w.-][0-9A-z]{0,15}$/i.test(text))) {
    return 'Enter a valid snapchat username';
  }
  return '';
};

export const nameValidator = (text: string): string => {
  if (!(/^[a-zA-Z]+$/.test(text))) {
    return 'A name (with characters) is required';
  }
  return '';
};

export const passwordValidator = (text: string): string => {
  if (!(/(?=.{8,})/.test(text))) {
    return 'The password must be eight characters or longer';
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
  if (!(/^0[6-7][0-9]{8}$/.test(text))) {
    return 'Phone number must be in this format 0760208022';
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
  const eighteenYearsAgo = moment().subtract(18, 'years');
  const validDateOfBirth = moment(date).isSameOrBefore(eighteenYearsAgo);
  if (!validDateOfBirth) { return 'The app is for people over 18'; } return '';
};

export const cityValidator = (text: string): string => {
  if (!(/^[a-zA-Z',.\s-]{1,25}$/.test(text))) {
    return 'A city is required';
  }
  return '';
};

export const tagValidator = (text: string): string => {
  if (text === '') {
    return '';
  };
  if (text.length < 4) {
    return 'At least 4 characters are required';
  };
  if (!(/^[a-zA-Z'\s-]+$/.test(text))) {
    return 'Only characters and \'-\' are allowed )';
  }
  return '';
};

export const alwaysValidValidator = (): string => '';
