import LogInForm from "../components/LogInForm";
import { getEmployees } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect, useLayoutEffect } from "react";


const LogIn = () => {

    return(
        <>
        <LogInForm/>
        </>
    )
    
}

export default LogIn



