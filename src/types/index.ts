export interface User {
    name: string;
    age: string;
    dob: string;
    phone: string;
    address: string[];
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserStateType{
    users: User[];
    editUserData: User;
    isEditUser: boolean;
    selectedUserIndex: number;
  }

export interface ErrorMessageType {
    [key:string]:string
}