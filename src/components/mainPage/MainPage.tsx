import { Link } from "react-router-dom";
import { FC } from 'react';
import { IAuthProps } from "../types/types";

const MainPage: FC<IAuthProps> = ({ authed }) => {

    return (
        <section className={`font-effect-fire-animation wrapper`}>
            <h1 >Welcome to my react contacts list cabinet SPA</h1>
            <p >
                This page has been created by Evgeny Eliseev.<br /><br />
                I've used React, Router , Hooks , Redux , Redux-thunk, TS and FireBase to build it.<br /><br />
                Here you can add/remove/modify you contacts list!<br /><br />
                <a href="https://github.com/e-n-eliseev/contacts_list_cabinet">
                    If you click here, you can visit my GitHub page!
                </a>
            </p>

            {!authed
                ? <>
                    <Link to={"/login"}>
                        Please click here to LogIn or SignUp if you are in the first time here!<br />
                    </Link>
                    <p>You can't open contacts listpage without it!</p>
                </>
                : <>
                    <p>You've signedin!!! Now you can take a look on your
                        <Link to={"/contacts"}>  contacts list  </Link>
                    </p>
                </>
            }
            <br />
        </section >
    )
}

export default MainPage;