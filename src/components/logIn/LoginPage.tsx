import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../loginForm/LoginForm";
import { logIn, signUp } from "../services/firebase";
import { FC } from 'react';
import { IAuthProps } from "../types/types";
import { ILogIn } from "../types/types";
import { FirebaseError } from "firebase/app";


const LoginPage: FC<IAuthProps> = ({ authed }) => {
    const [error, setError] = useState<string>("");

    const handleSubmit = async ({ login, pass }: ILogIn): Promise<void> => {
        try {
            if (authed) {
                await signUp(login, pass);
            } else {
                await logIn(login, pass);
            }
        }
        catch (error) {
            if (error instanceof FirebaseError)
                setError(error.code.split("/")[1]);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => setError(""), 2000);
        return () => clearTimeout(timeout)
    }, [error])

    return (
        <>
            {authed
                ? <p className={'font-effect-fire-animation wrapper'}>
                    Please SignUp in the form below!
                </p>
                : <p className={'font-effect-fire-animation wrapper'}>
                    Please LogIn in the form below!
                </p>

            }

            <LoginForm onSubmit={handleSubmit} />
            <Link className={'font-effect-fire-animation wrapper'} to={authed ? "/login" : "/signup"}>
                {authed
                    ? "Go back to login form"
                    : "If you don't have an account, please go to signup form"}
            </Link>
            {error && <h2 className="error">{error}</h2>}
        </>
    )
}

export default LoginPage;