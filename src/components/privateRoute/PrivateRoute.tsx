import { Navigate, Outlet } from "react-router";
import { FC } from 'react';
import { IAuthProps } from "../types/types";

export const PrivateRoute: FC<IAuthProps> = ({ authed }) =>
    authed ? <Outlet /> : <Navigate to="/" replace />;