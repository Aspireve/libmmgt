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

//Books BreadCrumbs
export const BookProfileBC = () => {
  const breadcrumbItems = [
    { label: "All Books", href: "/book-pages/all-books" },
    { label: "Book Profile", href: "/book-pages/book-details" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};
export const AddBookBC = () => {
  const breadcrumbItems = [
    { label: "All Books", href: "/book-pages/all-books" },
    { label: "Add Books", href: "/book-pages/add-books" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};

export const EditBookBC = () => {
  const breadcrumbItems = [
    { label: "All Books", href: "/book-pages/all-books" },
    { label: "Edit Books", href: "/book-pages/edit-book" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};

export const ImportBookBC = () => {
  const breadcrumbItems = [
    { label: "All Books", href: "/book-pages/all-books" },
    { label: "Import Books", href: "/book-pages/import-books" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};


//Periodicals
export const AddPeriodicalBC = () => {
  const breadcrumbItems = [
    { label: "Periodicals", href: "/periodicals-pages/periodicals-page" },
    { label: "Add Periodical", href: "/periodicals-pages/add-periodical" },
  ];
  return <CustomBreadcrumb items={breadcrumbItems} />;
}
export const PeriodicalProfileBC = () => {
  const breadcrumbItems = [
    { label: "Periodicals", href: "/periodicals-pages/periodicals-page" },
    { label: "Periodicals Details", href: "/periodicals-pages/periodical-details" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};
export const EditPeriodicalBC = () => {
  const breadcrumbItems = [
    { label: "Periodicals", href: "/periodicals-pages/periodicals-page" },
    { label: "Edit Periodical", href: "/book-pages/edit-periodical" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};
export const EditPeriodicalCopyBC = () => {
  const breadcrumbItems = [
    { label: "Periodicals", href: "/periodicals-pages/periodicals-page" },
    { label: "Edit Periodical", href: "/book-pages/editperiodicalCopy" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};

export const ImportPeriodicalBC = () => {
  const breadcrumbItems = [
    { label: "Periodicals", href: "/periodicals-pages/periodicals-page" },
    { label: "Import Periodical", href: "/book-pages/import-periodicals" },
  ];

  return <CustomBreadcrumb items={breadcrumbItems} />;
};


//Users
export const AddUserBC = () => {
  const breadcrumbItems = [
    { label: "Users", href: "/Users" },
    { label: "Add User", href: "/Users/add-user" },
  ];
  return <CustomBreadcrumb items={breadcrumbItems} />;
}

