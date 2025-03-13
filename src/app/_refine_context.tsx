"use client";


import { Refine, type AuthProvider } from "@refinedev/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "../providers/data";
import "../styles/global.css";

// Import your pages
// import Dashboard from "@/pages/dashboard";

import IssuedBooks from "@/app/book-pages/issued-books/page"
import IssueBooks from "@/app/book-pages/issue-books/page"

import BooksPage from "@/app/book-pages/all-books/page";
// import LoginPage from "./LoginPage/page";


const queryClient = new QueryClient();

type RefineContextProps = {};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();

  const authProvider: AuthProvider = {
    login: async () => {
      signIn("auth0", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
            resources={[
              {
                name: "all-books",
                list: BooksPage,
                meta: { label: "All Books" },
              },
              {
                name: "issued-books",
                list: IssuedBooks,
                meta: { label: "Issued Books" },
              },
              {
                name: "issue-books",
                list: IssueBooks,
                meta: { label: "Issue Books" },
              },
              
            ]}
          >
            {/* <LoginPage/> */}
            {props.children}
            <RefineKbar />
          </Refine>
        </RefineKbarProvider>
      </QueryClientProvider>
    </>
  );
};

export default RefineContext;
