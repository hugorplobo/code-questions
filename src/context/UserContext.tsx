import { createContext } from "react";

export interface User {
    id: string;
    userName: string;
};

export const userContext = createContext<User>({ id: "", userName: "" });