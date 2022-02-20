const sid = 755009;
export const keyExtractor = (id: number | string): string => (`${Math.floor(Math.random() * sid).toString()}${id}`);
export const limitTextLength = (text: string, maxLength: number = 10): string => (text.length < maxLength ?
  `${text}` :
  `${text.substring(0, maxLength)}...`).replace(/\r?\n|\r/g, ' ');

export const capitalize = (text: string): string => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

export const sanitizeText = (text: string): string => text.
  replace(/\r?\n|\r/g, ' ').
  replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ').
  replace(/\s{2,}/g, ' ');
