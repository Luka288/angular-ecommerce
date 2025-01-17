export interface currentUser {
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
