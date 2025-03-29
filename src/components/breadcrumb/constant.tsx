import { CustomBreadcrumb } from ".";

export const StudentProfileBC = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Student Profile", href: "/student-page/student-profile" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};

export const ImportStudentBC = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Import Student", href: "/student-page/import-students" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};
