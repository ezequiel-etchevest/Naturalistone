import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../redux/actions-employees";
import Redirect from "./RedirectPage";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SamplesContainer from "../components/samples/SamplesContainer";
import { getSamples } from "../redux/actions-samples";

const Samples = ({ focus, setFocus }) => {
  const dispatch = useDispatch();
  const samples = useSelector((state) => state.samples);
  const user = useSelector((state) => state.user);
  const [focusFilter, setFocusFilter] = useState("All");
  const userLocal = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (samples === undefined) dispatch(getSamples());
    if (userLocal && !user.length) {
      dispatch(getEmployeeById(userLocal.SellerID));
    }
  });

  useEffect(() => {
    if (!samples.length) {
      dispatch(getSamples());
    }
  }, []);

  if (userLocal) {
    if (user.length) {
      return (
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus} />
          <SamplesContainer
            samples={samples}
            user={user}
            focusFilter={focusFilter}
            setFocusFilter={setFocusFilter}
          />
        </>
      );
    } else return (
      <Center bg={'web.bg'} h={'80vh'}>
        <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
      </Center>
    )
  } else
    return (
      <>
        <Redirect />
      </>
    );
};

export default Samples;
