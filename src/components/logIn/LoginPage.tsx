import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../loginForm/LoginForm";
import { logIn, signUp } from "../services/firebase";
import { FC } from 'react';
import { IAuthProps } from "../types/types";
import { ILogIn } from "../types/types";


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
        catch (error: any) {
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
            {error && <h2 style={{
                position: "absolute",
                backgroundColor: "#ff6333",
                zIndex: 5, top: "20%",
                textAlign: "center",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 20px #ff6333,0 0 50px #ff6333,0 0 80px #ff6333"
            }}>{error}</h2>}
        </>
    )
}

export default LoginPage;