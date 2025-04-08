export interface UserData {
  user_uuid: string;
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  designation: string;
  address: string;
}

export interface EditUser {
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  designation: string;
  address: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  phone_no: string;
  designation: string;
  address: string;
}

export interface AddUserType extends User {
  institute_uuid: string;
  institute_name: string;
}
