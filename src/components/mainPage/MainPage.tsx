import { Link } from "react-router-dom";
import { FC } from 'react';
import { IAuthProps } from "../types/types";

const MainPage: FC<IAuthProps> = ({ authed }) => {

    return (
        <section className={`font-effect-fire-animation wrapper`}>
            {!authed
                ? <>
                    <h1 >Здравствуйте! Приветствовую вас в приложении-менеджере контактов.</h1>
                    <p>
                        Приложение - пет проект Елисеева Евгения.
                    </p>
                    <p>
                        Использованы следующие технологии React, MUI, Router , Hooks, Redux, Redux-thunk, TypeScript и FireBase
                    </p>
                    <p>
                        В данном приложении можно добавить/редактировать/искать/удалить контакт.
                    </p>
                    <a href="https://github.com/e-n-eliseev/contacts_list_cabinet">
                        Нажмите для перехода на страницу с исходным кодом проекта.
                    </a>
                    <p><strong>Работа с приложением невозможна без  авторизации.</strong></p>
                    <Link to={"/login"}>
                        Нажмите здесь прохождения этой процедуры.
                    </Link>

                </>
                : <>
                    <h1 >Рады что вы пользуетесь моим приложением.</h1>
                    <p>
                        Замечания и предложения можно отправлять на электронную почту: e.n.eliseev@mail.ru
                    </p>
                    <p>Для того, чтобы продолжить работу перейдите <Link to={"/contacts"}>по ссылке </Link>  или используйте верхнюю панель
                    </p>
                </>
            }
        </section >
    )
}

export default MainPage;