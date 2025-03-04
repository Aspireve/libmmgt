"use client";
import React, { createContext, useState, useContext } from "react";

type Tab = {
  id: string;
  title: string;
  route: string;
};

interface TabContextType {
  tabs: Tab[];
  activeTab: string;
  addTab: (title: string, route: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: "dashboard", title: "Dashboard", route: "/" }]);
  const [activeTab, setActiveTab] = useState("");

  const addTab = (title: string, route: string) => {
    const id = route;
    if (!tabs.find((tab) => tab.id === id)) {
      setTabs([...tabs, { id, title, route }]);
    }
    setActiveTab(id);
  };

  const closeTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <TabContext.Provider value={{ tabs, activeTab, addTab, closeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
};
