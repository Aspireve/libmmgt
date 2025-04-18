"use client";

import React from "react";
import Header from "@/components/custom/header";
import MasterTable from "../test/table-page";
import { StudentListTable } from "@/constants/students";
import AddStudents from "@/components/students/add-students";
import ImportStudentButton from "@/components/students/import-students-button";
import DeleteStudent from "@/components/students/delete-student";
import ExportStudent from "@/components/students/export-students-button";
import { StudentFromDatabase } from "@/types/student";
import { SearchFilter } from "@/components/students/search-student";
import Filter from "@/components/students/filter-student";

export default function StudentDirectory() {
  return (
    <>
      <Header heading="Student Directory" subheading="Tanvir Chavan" />

      <div className="mx-[40px]">
        <MasterTable<StudentFromDatabase>
          title="Students"
          resource="student"
          columns={StudentListTable}
          idField={"barCode"}
          AddedOptions={[
            DeleteStudent,
            ({ setFilters }) => (
              <Filter
                filtersConfig={[
                  {
                    label: "Departments",
                    field: "department",
                    resource: "student/departments",
                  },
                ]}
                setFilters={setFilters}
              />
            ),
            AddStudents,
            ImportStudentButton,
            ExportStudent,
            ({ setFilters }) =>
              SearchFilter({
                setFilters,
                options: [
                  { label: "Student Id", value: "barCode" },
                  { label: "Name", value: "firstName" },
                  { label: "Phone Number", value: "mobileNumber" },
                  { label: "Email", value: "email" },
                ],
                placeholder: "Search",
              }), // Pass the setFilters function to SearchFilter,
          ]}
        />
      </div>
    </>
  );
}
