import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../loginForm/LoginForm";
import { logIn, signUp } from "../../services/firebase";
import { FC } from 'react';
import { IAuthProps } from "../types/types";
import { ILogIn } from "../types/types";
import { FirebaseError } from "firebase/app";


const LoginPage: FC<IAuthProps> = ({ authed }) => {
    //сообщание ошибки
    const [error, setError] = useState<string>("");
    //авторизация
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
    //сброс ошибки авторизации через 2 сек
    useEffect(() => {
        const timeout = setTimeout(() => setError(""), 2000);
        return () => clearTimeout(timeout)
    }, [error])

    return (
        <>
            {authed
                ? <p className={'font-effect-fire-animation wrapper'}>
                    Пожалуйста, введите адрес электроной почты и пароль для регистрации.
                </p>
                : <p className={'font-effect-fire-animation wrapper'}>
                    Пожалуйста, введите адрес электроной почты и пароль для входа в систему.
                </p>

            }

            <LoginForm onSubmit={handleSubmit} />
            <Link className={'font-effect-fire-animation wrapper'} to={authed ? "/login" : "/signup"}>
                {authed
                    ? "Пожалуйста, нажмите здесь для перехода на страницу входа."
                    : "Если вы не зарегистрированы , пожалуйста, нажмите здесь для перехода на страницу регистрации."}
            </Link>
            {error && <h2 className="error">{error}</h2>}
        </>
    )
}

export default LoginPage;