import React from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import Stats from "../components/Stats";
import infoContainer from "../components/infoContainer";


const Home = () => {
    return(
        <>
        <SideBar/>
        <Stats/>
        <infoContainer/>
        </>
    )
}

export default Home