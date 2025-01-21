import { ReactNode } from "react";

export type TRoutePaths = {
    name: string;
    path?: string;
    element?: ReactNode;
    icon?: ReactNode;
    children?: TRoutePaths[];
}

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TSidebarItem = {
    key: string;
    label: ReactNode;
    icon?: ReactNode;
    children?: TSidebarItem[];
} | undefined;