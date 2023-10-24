import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../redux/actions-employees";
import Redirect from "./RedirectPage";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SamplesContainer from "../components/samples/SamplesContainer";
import { clearSamples, getSamples } from "../redux/actions-samples";
import { getSellers } from "../redux/actions-sellers";

const Samples = ({ focus, setFocus }) => {
  const dispatch = useDispatch();
  const samples = useSelector((state) => state.samples);
  const sellers = useSelector((state) => state.sellers);
  const user = useSelector((state) => state.user);
  const [focusFilter, setFocusFilter] = useState("All");
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if(!sellers.length){
      dispatch(getSellers())
    }
    if (userLocal && !user.length) {
      dispatch(getEmployeeById(userLocal.SellerID));
    }
    if (user.length) {
      const sellerDinamic = user[0].Secction7Flag === 1 || user[0].SellerID === 8 ? '3' : user[0].SellerID
      if (!samples.length) {
      dispatch(getSamples('', sellerDinamic));
    }
  }

    return(() => {
      dispatch(clearSamples())
    })
  }, [user]);

  if (userLocal) {
    if (user.length) {
      return (
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus} />
          <SamplesContainer
            samples={samples}
            sellers={sellers}
            user={user}
            focusFilter={focusFilter}
            setFocusFilter={setFocusFilter}
            loading={loading}
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
