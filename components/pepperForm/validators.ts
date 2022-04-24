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

export const upcomingDateValidator = (date: Moment): string => {
  const today = moment();
  const validDateOfBirth = moment(date).isAfter(today);
  if (!validDateOfBirth) { return 'It must be an upcoming Date'; } return '';
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

export const passwordValidator = (text: string): string => {
  if (text === '') {
    return '';
  };
  if (text.length < 7) {
    return 'At least 8 characters are required';
  };
  if ((/^[0-9a-zA-Z]+$/.test(text))) {
    return 'Must contain a special caracter #@ ...';
  }
  return '';
};

export const userNameValidator = (text: string): string => {
  if (text === '') {
    return '';
  };
  if (text.length < 7) {
    return 'Choose a userName to remember ! At least 8 characters are required';
  };
  return '';
};

export const themeValidator = (text: string): string => {

  if (text.length < 2) {
    return 'Provide a theme ! ex : Vanilla ';
  };
  return '';
};

export const priceValidator = (text: string): string => {
  if (text === '') {
    return '';
  };
  if (((/^[0-9].'\s-]+$/.test(text)))) {
    return 'Must be a number';
  };
  return '';
};

export const alwaysValidValidator = (): string => '';
