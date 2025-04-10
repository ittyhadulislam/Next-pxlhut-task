"use client";

import store from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const DataProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
