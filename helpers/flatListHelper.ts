const sid = 755009;
const keyExtractor = (id: number): string => (`${Math.floor(Math.random() * sid).toString()}${id}`);

export { keyExtractor };