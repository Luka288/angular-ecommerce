export interface userSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  address: string;
  phone: string;
  zipcode: string;
  gender: genders;
  avatar?: string;
}

export interface verifyUser {
  status: number;
  message: string;
}

type genders = 'MALE' | 'FEMALE' | 'OTHER';
