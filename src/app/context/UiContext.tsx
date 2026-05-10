"use client";
import React, { createContext, useContext, useReducer } from "react";

interface Alert {
  type: string;
  message: string;
}

interface Notification {
  visible: boolean;
}

interface UiContextType {
  alert: Alert;
  notification: Notification;
  dispatch: React.Dispatch<Action>;
}

const initialState: UiContextType = {
  alert: { type: "", message: "" },
  notification: { visible: true },
  dispatch: () => undefined,
};

type Action =
  | { type: "SET_ALERT"; payload: Alert }
  | { type: "CLEAR_ALERT" }
  | { type: "SET_NOTIFICATION"; payload: Notification }
  | { type: "CLEAR_NOTIFICATION" };

const uiReducer = (state: UiContextType, action: Action): UiContextType => {
  switch (action.type) {
    case "SET_ALERT":
      return { ...state, alert: action.payload };
    case "CLEAR_ALERT":
      return { ...state, alert: { type: "", message: "" } };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "CLEAR_NOTIFICATION":
      return { ...state, notification: { visible: false } };
    default:
      return state;
  }
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export const useUiContext = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUiContext must be used within a UiContextProvider");
  }
  return context;
};

interface UiContextProviderProps {
  children: React.ReactNode;
}

export const UiContextProvider: React.FC<UiContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UiContext.Provider
      value={{ alert: state.alert, notification: state.notification, dispatch }}
    >
      {children}
    </UiContext.Provider>
  );
};
