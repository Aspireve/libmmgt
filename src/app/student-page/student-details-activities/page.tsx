import React from "react";
import { studentActivitiesColumns } from "../student-profile/studentprofile";
import { DataTable } from "@/components/data-tables/data-table";

// If you have fallback data, define it here or fetch from your API
const activitiesData = [
  {
    activity_id: "A101",
    activity_type: "Library Visit",
    activity_date: "2025-03-01",
    description: "Borrowed Books",
  },
  {
    activity_id: "A102",
    activity_type: "Online Workshop",
    activity_date: "2025-03-05",
    description: "React Basics",
  },
];

const StudentDetailActivities = () => {
  return (
    <></>
    // <DataTable columns={studentActivitiesColumns} resource="Book_v2/activities" />
  );
};

export default StudentDetailActivities;
