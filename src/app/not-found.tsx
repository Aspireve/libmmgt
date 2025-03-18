"use client";

import { Authenticated, ErrorComponent } from "@refinedev/core";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Authenticated key="not-found">
        <ErrorComponent />
      </Authenticated>
    </Suspense>
  );
}
