"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store/store";
import { RefineContext } from "./_refine_context";
import Sidebar from "@/components/custom/sidebar";
import Navbar from "@/components/custom/navbar";
import "../styles/global.css";
import { Toaster } from "@/components/ui/sonner";
import { PersistGate } from "redux-persist/integration/react";
//import LoginPage from "./LoginPage/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isHydrated, setIsHydrated] = useState(false);

  // Set hydrated state after mounting on the client
  // useEffect(() => {
  //   setIsHydrated(true);
  // }, []);

  return (
    <html lang="en" className={`h-full `}>
      <body className="h-full m-0 p-0">
        <Suspense fallback={<> loding...</>}>
          <Provider store={store}>
            <RefineContext>
              <PersistGate loading={null} persistor={persistor}>
                <div className="flex h-full">
                  <Sidebar />
                  <div className="flex flex-1 flex-col">
                    <Navbar />
                    <div className="flex-1 overflow-y-auto">{children}</div>

                    <Toaster richColors position="top-center" />
                  </div>
                </div>
              </PersistGate>
            </RefineContext>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
