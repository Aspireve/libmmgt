export interface ImportData {
  title: string;
  headers: string[];
  data: any[];
}

export interface InstituteDetails {
  institute_uuid: string;
  institute_id: string;
  institute_name: string;
  institute_abbr: string;
  institute_contact_person: string;
  landline: string;
  institute_email: string;
  mobile: string;
  institute_address: string | null;
  pincode: string;
  state: string;
  city: string;
  website_url: string;
  author: string;
  created_date: string;
  institute_logo: string | null;
  institute_header: string | null;
  is_archived: boolean;
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
  currentInstitute: string | InstituteDetails | any | undefined;
}

export interface EmailNotification {
  bookBorrowing: boolean;
  bookReturning: boolean;
  checkIn: boolean;
  checkOut: boolean;
  penalties: boolean;
}

// types/auth.ts
export interface LibraryDetails {
  libraryRuleId: string;
  instituteUuid: string;
  instituteName: string;
  instituteLogo: string;
  instituteHeader: string;
  organisation: string;
  instituteAbbr: string;
  maxBooksStudent: number;
  maxBooksStaff: number;
  maxDaysStudent: number;
  maxDaysStaff: number;
  lateFeesPerDay: number;
  openingHour: string;
  closingHour: string;
  createdAt: string;
  updatedAt: string;
  createdByUUID: string;
  isArchived: boolean;
  emailNotificationStudent: EmailNotification;
  emailNotificationAdmin: EmailNotification;
}

export interface LoginResponse {
  meta: { accessToken: string };
  data: {
    userId: string;
    employeeId: string;
    username: string;
    organization: string;
    enableTabs: boolean;
    darkMode: boolean;
    userPreference: string;
    userPreferenceUuid: string;
    accessToken: string;
    libraryDetails: LibraryDetails[];
  };
}

export interface AuthState {
  token: string | null;
  user: {
    accessToken: string;
    userId: string;
    employeeId: string;
    username: string;
    organization: string;
    enableTabs: boolean;
    darkMode: boolean;
    userPreference: string;
    userPreferenceUuid: string;
  } | null;
  libraryDetails: LibraryDetails[] | null;
  currentInstitute: LibraryDetails | null;
}
