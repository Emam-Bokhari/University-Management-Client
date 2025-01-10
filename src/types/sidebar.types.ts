import { ReactNode } from "react";

export type TRoutePaths = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TRoutePaths[];
}

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
};