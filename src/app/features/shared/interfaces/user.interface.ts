export interface baseUser {
  _id: string;
  firstName: string;
  lastName: string;
  age: 50;
  email: string;
  address: string;
  role: string;
  zipcode: string;
  avatar: string;
  gender: string;
  phone: string;
  verified: boolean;
  iat: number; // access_token
  exp: number; // refresh_token
}

// export type currUser = Pick<
//   baseUser,
//   | 'firstName'
//   | 'lastName'
//   | 'email'
//   | 'address'
//   | 'age'
//   | 'phone'
//   | 'gender'
//   | 'zipcode'
// >;

export type exclude = 'iat' | 'exp' | 'verified' | 'avatar' | 'role' | '_id';

export interface currUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  age: number;
  phone: string;
  gender: string;
  zipcode: string;
}

export interface updatedResponse {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  role: string;
  zipcode: string;
  avatar: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  cartID: string;
  verified: boolean;
  chatIds: string[];
  __v: number;
}
