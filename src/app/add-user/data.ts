    export interface User{
        user_name:string;
        email:string;
        password:string;
        phone_number:string;
        role:string;
        address:string;
    }

    export interface AddUserType extends User {
      institute_uuid: string;
      institute_name: string;
    }