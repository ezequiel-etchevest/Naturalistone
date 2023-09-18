import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import ProductsContainer from "../components/products/productsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getFiltered, getMaterials } from "../redux/actions-products";
import { getEmployeeById } from "../redux/actions-employees";
import Redirect from "./RedirectPage";
import { useLocation } from "react-router-dom";
import { getFactories } from "../redux/actions-factories";

const Products = ({ focus, setFocus }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allProducts = useSelector((state) => state.all_products);
  const values = useSelector((state) => state.product_values);
  const factories = useSelector((state) => state.factories);
  const materials = useSelector((state) => state.materials);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const getParamsFinish = searchParams.get("finish");
  const getParamsSize = searchParams.get("size");
  const getParamsThickness = searchParams.get("thickness");
  const getParamsMaterial = searchParams.get("material");
  const getParamsSearch = searchParams.get("search");
  const getParamsSqftMin = searchParams.get("sqftMin");
  const getParamsSqftMax = searchParams.get("sqftMax");
  const getParamsType = searchParams.get("type");
  const sqftMin = getParamsSqftMin ? getParamsSqftMin : values?.sqftMinMax?.min;
  const sqftMax = getParamsSqftMax ? getParamsSqftMax : values?.sqftMinMax?.max;
  const [filters, setFilters] = useState({
    finish: getParamsFinish ? getParamsFinish : "",
    size: getParamsSize ? getParamsSize : "",
    thickness: getParamsThickness ? getParamsThickness : "",
    material: getParamsMaterial ? getParamsMaterial : "",
    search: getParamsSearch ? getParamsSearch : "",
    sqft: [sqftMin, sqftMax],
    type: getParamsType ? getParamsType : "",
  });

  useEffect(() => {
    if (userLocal && !user.length) {
      dispatch(getEmployeeById(userLocal.SellerID));
    }
  }, [dispatch, userLocal, user]);

  useEffect(() => {
    // if(!allProducts?.length && !Object.entries(productsErrors)?.length)
    dispatch(
      getFiltered(
        filters.finish,
        filters.size,
        filters.thickness,
        filters.material,
        filters.search,
        filters.sqft,
        filters.type
      )
    );
  }, [filters]);

  useEffect(() => {
    if (factories.length === 0) {
      dispatch(getFactories(""));
    }
    if (materials.length === 0) {
      dispatch(getMaterials());
    }
  }, []);

  if (user) {
    if (user.length) {
      return (
        <>
          <SideBar user={user} focus={focus} setFocus={setFocus} />
          <ProductsContainer
            allProducts={allProducts}
            user={user}
            values={values}
            factories={factories}
            materials={materials}
          />
        </>
      );
    }
  } else {
    return <Redirect />;
  }
};

export default Products;
