import {
  IMatch, Gender, MatchStatus, IParty, IUser 
} from "../models/types";
import { loremIpsium } from "../styles/common";

export const fakeFetch = <T>(response: T, delay: number): Promise<T> => new Promise((resolve) => {
  setTimeout(() => { resolve(response); }, delay);
});

export const fakeMatches: IMatch[] = [
  {
    id: 1,
    name: 'Clémentine',
    gender: Gender.WOMAN,
    phoneNumber: '07692039459',
    status: MatchStatus.ACCEPTED,
    address: 'Paris',
    description: loremIpsium,
    job: 'Engineer',
    imgs: [
      { uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80' },
      { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80' },
      { uri: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
      { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80' },
    ],
    interests: ['Science', 'Art', 'Socialism'],
  },
  {
    id: 2,
    name: 'Noemie',
    gender: Gender.WOMAN,
    phoneNumber: '07442039459',
    status: MatchStatus.UNCHECKED,
    address: 'Paris',
    description: loremIpsium,
    job: 'Danseuse',
    imgs: [{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80' }],
    interests: ['Science', 'Art', 'Socialism'],
  },
  {
    id: 3,
    name: 'Fiona',
    gender: Gender.WOMAN,
    phoneNumber: '07492039459',
    status: MatchStatus.WAITING,
    address: 'Paris',
    description: loremIpsium,
    job: 'Designer',
    imgs: [{ uri: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }],
    interests: ['Science', 'Art', 'Socialism'],
  },
  {
    id: 4,
    name: 'Alice',
    gender: Gender.WOMAN,
    phoneNumber: '07122039459',
    status: MatchStatus.UNAVAILABLE,
    address: 'Paris',
    description: loremIpsium,
    job: 'Barwomen',
    imgs: [{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80' }],
    interests: ['Science', 'Art', 'Socialism'],
  },
];

export const fakeParties: IParty[] = [
  {
    id: 1,
    title: 'Fleurus',
    theme: 'Soirée Internationl',
    date: '24 octobre',
    location: 'Paris 14',
    people: 34,
    minAge: 19,
    maxAge: 28,
    description: loremIpsium,
    foods: [
      { name: 'Steak', price: 10 },
      { name: 'Chicken', price: 12 },
      { name: 'Porc', price: 8 },
      { name: 'Beef', price: 14 },
    ],
    drinks: [
      { name: 'Beer', price: 6 },
      { name: 'Champain', price: 8 },
      { name: 'Whiskey', price: 9 },
      { name: 'Wine', price: 14 },
    ],
    price: 0,
    imgs: [
      { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
      { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
      { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
    ],
  },
  {
    id: 2,
    title: 'Social Bar',
    theme: 'Soirée Internation',
    date: '24 octobre',
    location: 'Paris 12',
    people: 22,
    minAge: 19,
    maxAge: 28,
    description: loremIpsium,
    foods: [
      { name: 'Steak', price: 10 },
      { name: 'Chicken', price: 12 },
      { name: 'Porc', price: 8 },
      { name: 'Beef', price: 14 },
    ],
    drinks: [
      { name: 'Beer', price: 6 },
      { name: 'Champain', price: 8 },
      { name: 'Whiskey', price: 9 },
      { name: 'Wine', price: 14 },
    ],
    price: 0,
    imgs: [{ uri: 'https://storage.googleapis.com/eyp-wordpress/1/2021/09/social-bar-saint-ouen-1440x946.jpg' }],
  },
  {
    id: 3,
    title: 'Café OZ',
    theme: 'Soirée Internationl',
    date: '12 octobre',
    location: 'Paris 01',
    people: 14,
    minAge: 19,
    maxAge: 28,
    description: loremIpsium,
    foods: [
      { name: 'Steak', price: 10 },
      { name: 'Chicken', price: 12 },
      { name: 'Porc', price: 8 },
      { name: 'Beef', price: 14 },
    ],
    drinks: [
      { name: 'Beer', price: 6 },
      { name: 'Champain', price: 8 },
      { name: 'Whiskey', price: 9 },
      { name: 'Wine', price: 14 },
    ],
    price: 0,
    imgs: [{ uri: 'https://www.oubruncher.com/photos1/1631_1.jpg' }],
  },
];

export const fakeUser: IUser = {
  id: 1,
  name: 'Clémentine',
  gender: Gender.WOMAN,
  phoneNumber: '07692039459',
  address: 'Paris',
  description: loremIpsium,
  job: 'Engineer',
  imgs: [
    { uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80' },
    { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80' },
    { uri: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80' },
  ],
  interests: ['Science', 'Art', 'Socialism'],
  matches: fakeMatches,
  parties: fakeParties,
};

