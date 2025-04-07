export interface InstituteList {
  institute_uuid: string;
  institute_name: string;
  institute_logo: string;
  institute_header: string;
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
  currentInstitute: InstituteList;
  instituteList: InstituteList[];
}

export interface ImportData {
  title: string;
  headers: string[];
  data: any[];
}

interface InstituteDetails {
  institute_logo: string | null;
  institute_name: string;
  institute_uuid: string;
  institute_header: string | null;
}

interface EmailNotifications {
  checkin_admin: boolean;
  checkout_admin: boolean;
  checkin_student: boolean;
  penalties_admin: boolean;
  checkout_student: boolean;
  penalties_student: boolean;
  borrow_books_admin: boolean;
  return_books_admin: boolean;
  borrow_books_student: boolean;
  return_books_student: boolean;
}

interface OperatingHours {
  closing_time: string;
  starting_time: string;
}

interface Rules {
  library_rule_id: string;
  max_books: number;
  max_days: number;
  late_fees_per_day: number;
  operating_hours: OperatingHours;
  created_at: string;
  created_by_uuid: string | null;
  is_archived: boolean;
  email_notifications: EmailNotifications;
  institute_uuid: string;
}

export interface User {
  user_uuid: string;
  name: string;
  email: string;
  designation: string;
  address: string;
  phone_no: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  user_id: number;
  institute_details: InstituteDetails[];
  rules: Rules[];
}

export interface AuthStates {
  token: {
    accessToken: string | undefined;
  };
  user: User | undefined;
  currentInstitute: string | InstituteList | any | undefined;
}
