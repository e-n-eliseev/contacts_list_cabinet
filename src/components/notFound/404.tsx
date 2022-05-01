import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/404.png";
import { FC } from 'react';

const PageNotFound: FC = () => {

    const navigate = useNavigate();

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
            <h1 className={'font-effect-fire-animation'}>
                Sorry, the page is not found, please follow link below
            </h1>
            <img src={pic} alt="404" />
            <Link to="/">to the main page....</Link>
        </>
    )
}

export default PageNotFound;