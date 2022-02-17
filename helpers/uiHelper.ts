const sid = 755009;
const keyExtractor = (id: number): string => (`${Math.floor(Math.random() * sid).toString()}${id}`);
const limitTextLength = (text: string, maxLength: number = 10): string => (text.length < maxLength ?
  `${text}` :
  `${text.substring(0, maxLength)}...`).replace(/\r?\n|\r/g, ' ');

const sanitizeText = (text: string): string => text.
  replace(/\r?\n|\r/g, ' ').
  replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ').
  replace(/\s{2,}/g, ' ');

export { keyExtractor, limitTextLength, sanitizeText };
