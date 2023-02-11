import { createContext, useContext } from "react";

type AppStateTypes = {
  isSearching: boolean;
  setSearchingState?: (value: boolean) => void;
};

export const initialAppState: AppStateTypes = {
  isSearching: false,
};

type ACTIONTYPE =
  | { type: "SEARCHING"; payload: boolean }
  | { type: "decrement"; payload: string };

export const AppContext =
  createContext<typeof initialAppState>(initialAppState);

// reducers
export const appReducer = (
  state: typeof initialAppState,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case "SEARCHING":
      return (state.isSearching = action.payload);
    default:
      return state;
  }
};

export const useAppContext = () => {
  return useContext(AppContext);
};
