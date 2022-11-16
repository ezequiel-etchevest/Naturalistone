import React from "react";
import SideBar from "../components/sideBar";
import InfoContainer from "../components/infoContainer";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";

const Invoices = () => {

    const user = useSelector(state => state.user)

    return(
        <>
        { user.length ? <SideBar user={user}/> : <Text>Loading...</Text> }
        <InfoContainer/>
        </>
    )
}

export default Invoices