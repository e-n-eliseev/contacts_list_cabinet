import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/404.png";
import { FC } from 'react';

const PageNotFound: FC = () => {

    const navigate = useNavigate();
    //перенаправление через 5 сек после ошибки роутинга
    useEffect(() => {
        let timeout = setTimeout(() => {
            navigate("/")
        }, 5000)
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return (
        <>
            <h1 className={'font-effect-fire-animation App__heading'}>
                Извините, страница не найдена!
            </h1>
            <p>Пожалуйста, перейдите <Link to="/">по ссылке...</Link></p>
            <img className="App__img" src={pic} alt="404" />

        </>
    )
}

export default PageNotFound;