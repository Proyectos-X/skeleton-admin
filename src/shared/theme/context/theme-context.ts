import { createContext } from "react";
import { initialState, type ThemeProviderState } from "../types/types";

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)