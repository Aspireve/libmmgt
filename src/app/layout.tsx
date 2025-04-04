"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { RefineContext } from "./_refine_context";
import Sidebar from "@/components/custom/sidebar";
import Navbar from "@/components/custom/navbar";
import "../styles/global.css";
import { Toaster } from "@/components/ui/sonner";
import DarkModeWrapper from "@/components/custom/DarkModeWrapper"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<> loading...</>}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RefineContext>
                {/* Move dark mode handling to a wrapper component */}
                <DarkModeWrapper>
                  <div className="flex h-screen overflow-hidden">
                    <Sidebar />
                    <div className="flex flex-1 flex-col h-full">
                      <Navbar />
                      <div className="flex-1 overflow-y-auto h-0 scrollbar-none">{children}</div>
                      <Toaster position="top-center" />
                    </div>
                  </div>
                </DarkModeWrapper>
              </RefineContext>
            </PersistGate>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
