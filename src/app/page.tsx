"use client";

import { Suspense } from "react";
import  Dashboard from "../app/Dashboard/dashboard"

export default function IndexPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Dashboard/>
    </Suspense>
  );
}