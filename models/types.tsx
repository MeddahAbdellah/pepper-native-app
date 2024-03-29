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
  attendees?: IUserBase[],
  status?: UserPartyStatus,
};

export enum UserPartyStatus {
  WAITING = 'waiting',
  ACCEPTED = 'accepted',
  ATTENDED = 'attended',
  REJECTED = 'rejected',
  ABSENT = 'absent',
}
export interface IUserBase {
  id: number,
  name: string,
  gender: Gender
  phoneNumber: string,
  address: string,
  description: string,
  job: string,
  imgs: Array<{ uri: string }>,
  interests: string[],
  facebook: string,
  instagram: string,
  snapchat: string,
}

export interface IUser extends IUserBase {
  matches: IMatch[],
  parties: IParty[],
};

export interface IMatch extends IUserBase{
  status: MatchStatus,
};

export interface IOrganizerBase {
  id: number,
  title: string,
  userName: string,
  password: string,
  location: string,
  phoneNumber: string,
  description: string,
  foods: Array<{ name: string, price: number }>,
  drinks: Array<{ name: string, price: number }>,
  imgs: Array<{ uri: string}>
}

export interface IOrganizer extends IOrganizerBase {
  parties: IParty[],
}

export enum MatchStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
}

export enum Gender {
  MAN = 'man',
  WOMAN = 'woman'
}

export enum StoreStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
};

export interface IUserStore {
  user: IUser;
  fetchStatus: StoreStatus;
  updateStatus: StoreStatus;
  addMatchStatus: StoreStatus;
  deleteMatchStatus: StoreStatus;
  updatePartyStatus: StoreStatus;
  attendPartyStatus: StoreStatus;
  deletePartyStatus: StoreStatus;
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

export interface IOrganizerStore {
  organizer: IOrganizer;
  fetchStatus: StoreStatus;
  updateStatus: StoreStatus;
  updatePartyStatus: StoreStatus;
  addPartyStatus: StoreStatus;
  deletePartyStatus: StoreStatus;
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
