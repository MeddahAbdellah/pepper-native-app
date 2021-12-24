export interface IParty {
  id: number,
  title: string,
  theme: string,
  date: string,
  location: string,
  people: number,
  minAge: number,
  maxAge: number,
  description: string,
  foods: Array<{ name: string, price: number }>,
  drinks: Array<{ name: string, price: number }>,
  price: number,
  imgs: Array<{ uri: string }>,
};

export interface IMatch {
  id: number,
  name: string,
  gender: Gender
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

export enum Gender {
  MAN = 'man',
  WOMAN = 'woman'
}