import { Navigate, Outlet } from "react-router";
import { FC } from 'react';
import { IAuthProps } from "../types/types";

export const PublicRoute: FC<IAuthProps> = ({ authed }) =>
    !authed ? <Outlet /> : <Navigate to="/contacts" replace />;