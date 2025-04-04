export interface InstituteList {
  institute_uuid: string;
  institute_name: string;
  logo: string;
  header: string;
}

export interface AuthState {
  token: string | null;
  institute_uuid: string | null;
  employee_uuid: string | null;
  first_name: string | null;
  institute_name: string | null;
  organization_uuid: string | null;
  email: string | null;
  phone: string | null;
  logo: string | null;
  designation: string | null;
  header_image: string | null;
  currentInstitute: InstituteList ;
  instituteList: InstituteList[] ;
}

export interface ImportData {
  title: string;
  headers: string[];
  data: any[];
}
