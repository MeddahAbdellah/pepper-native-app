export interface IParty {
  id: number,
  title: string,
  theme: string,
  date: string,
  location: string,
  people: number,
  minAge: number,
  maxAge: number,
  img: { uri: string },
};

export interface IMatch {
  id: number,
  name: string,
  phoneNumber: string,
  job: string,
  status: MatchStatus,
  imgs: Array<{ uri: string }>,
};

export enum MatchStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  UNCHECKED = 'unchecked',
  UNAVAILABLE = 'unavailable',
}