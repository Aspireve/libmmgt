"use client";

import React from "react";
import Header from "@/components/custom/header";
import MasterTable from "../test/table-page";
import { StudentListTable, StudentListTableAction } from "@/constants/students";
import AddStudents from "@/components/students/add-students";
import ImportStudentButton from "@/components/students/import-students-button";
import DeleteStudent from "@/components/students/delete-student";
import ExportStudent from "@/components/students/export-students-button";
import { StudentFromDatabase } from "@/types/student";


export default function StudentDirectory() {
  return (
    <>
      <Header heading="Student Directory" subheading="Tanvir Chavan" />

      <div className="mx-[40px]">
        <MasterTable<StudentFromDatabase>
          title="Students"
          resource="student/all"
          columns={StudentListTable}
          priorColumns={StudentListTableAction}
          AddedOptions={[
            DeleteStudent,
            AddStudents,
            ImportStudentButton,
            ExportStudent,
          ]}
        />
      </div>
    </>
  );
}
