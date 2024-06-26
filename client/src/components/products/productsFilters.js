import {
  Box,
  Select,
  Input,
  IconButton,
  Tooltip,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import "../../assets/styleSheet.css";
import {  getFiltered, getFilteredSearch } from "../../redux/actions-products";
import { useDispatch } from "react-redux";
import { AiOutlineClear } from "react-icons/ai";
import SqftSlider from "./sqftSlider";
import { useLocation, useNavigate } from "react-router-dom";
import CreateProduct from "./createProduct/createProduct";
import CreateProductDimension from "./createProductDimension/modalCreateProductDimension";

const ProductsFilters = ({ values, factories, materials, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const sqftMin = getParamsSqftMin ? getParamsSqftMin : 0;
  const sqftMax = getParamsSqftMax ? getParamsSqftMax : values?.sqftMinMax?.max;
  const validUser = user[0].SellerID === 17 ? true : false

  const [filters, setFilters] = useState({
    finish: getParamsFinish ? getParamsFinish : "",
    size: getParamsSize ? getParamsSize : "",
    thickness: getParamsThickness ? getParamsThickness : "",
    material: getParamsMaterial ? getParamsMaterial : "",
    search: getParamsSearch ? getParamsSearch : "",
    type: getParamsType ? getParamsType : "",
    sqft: [sqftMin, sqftMax],
  });
  const [limit, setLimit] = useState([sqftMin, sqftMax]);
  const [valueDefault, setValueDefault] = useState([0 , values?.sqftMinMax?.max]) 

  const handleFinish = (e) => {
    const finish = encodeURIComponent(e.target.value);
    searchParams.set("finish", finish);
    searchParams.set("size", filters?.size);
    searchParams.set("thickness", filters?.thickness);
    searchParams.set("material", filters?.material);
    searchParams.set("search", filters?.search);
    searchParams.set("type", filters?.type);
    navigate(`?${searchParams.toString()}`);
    setFilters({
      ...filters,
      finish,
    });
  
    dispatch(
      getFiltered(
        finish,
        filters.size,
        filters.thickness,
        filters.material,
        filters.search,
        filters.sqft,
        filters.type
      )
    );
  };

  const handleSize = (e) => {
    const size = e.target.value;
    searchParams.set("size", size);
    searchParams.set("finish", filters.finish);
    searchParams.set("thickness", filters.thickness);
    searchParams.set("material", filters.material);
    searchParams.set("search", filters.search);
    searchParams.set("type", filters.type);
    navigate(`?${searchParams.toString()}`);
    setFilters({
      ...filters,
      size,
    });
    // setCurrentPage(1)
    dispatch(
      getFiltered(
        filters.finish,
        size,
        filters.thickness,
        filters.material,
        filters.search,
        filters.sqft,
        filters.type
      )
    );
  };

  const handleThickness = (e) => {
    const thickness = e.target.value;
    searchParams.set("thickness", thickness);
    searchParams.set("size", filters.size);
    searchParams.set("finish", filters.finish);
    searchParams.set("material", filters.material);
    searchParams.set("type", filters.type);
    searchParams.set("search", filters.search);
    navigate(`?${searchParams.toString()}`);
    setFilters({
      ...filters,
      thickness,
    });

    dispatch(
      getFiltered(
        filters.finish,
        filters.size,
        thickness,
        filters.material,
        filters.search,
        filters.sqft,
        filters.type
      )
    );
  };

  const handleMaterial = (e) => {
    const material = e.target.value;
    searchParams.set("material", material);
    searchParams.set("size", filters.size);
    searchParams.set("finish", filters.finish);
    searchParams.set("thickness", filters.thickness);
    searchParams.set("search", filters.search);
    searchParams.set("type", filters.type);
    navigate(`?${searchParams.toString()}`);
    setFilters({
      ...filters,
      material,
    });

    dispatch(
      getFiltered(
        filters.finish,
        filters.size,
        filters.thickness,
        material,
        filters.search,
        filters.sqft,
        filters.type
      )
    );
  };

  const handleType = (e) => {
    const type = e.target.value;
    searchParams.set("type", type);
    searchParams.set("thickness", filters.thickness);
    searchParams.set("size", filters.size);
    searchParams.set("finish", filters.finish);
    searchParams.set("material", filters.material);
    searchParams.set("search", filters.search);
    navigate(`?${searchParams.toString()}`);
    setFilters({
      ...filters,
      type,
    });

    dispatch(
      getFiltered(
        filters.finish,
        filters.size,
        filters.thickness,
        filters.material,
        filters.search,
        filters.sqft,
        type
      )
    );
  };

  const handleClear = () => {
    searchParams.delete("material");
    searchParams.delete("size");
    searchParams.delete("finish");
    searchParams.delete("thickness");
    searchParams.delete("search");
    searchParams.delete("sqftMin");
    searchParams.delete("sqftMax");
    searchParams.delete("page");
    searchParams.delete("type");
    navigate(`?${searchParams.toString()}`);
    setFilters({
      finish: "",
      size: "",
      thickness: "",
      material: "",
      search: "",
      type: "",
      sqft: [valueDefault[0], valueDefault[1]],
    });
    // setCurrentPage(1)
    dispatch(getFiltered("", "", "", "", "", "", ""));
    setLimit([valueDefault[0], valueDefault[1]]);
  };

  const handleChangeProductName = (e) => {
    const search = e.target.value;
    searchParams.set("search", search);
    searchParams.set("size", filters.size);
    searchParams.set("finish", filters.finish);
    searchParams.set("material", filters.material);
    searchParams.set("thickness", filters.thickness);
    searchParams.set("type", filters.type);
    navigate(`?${searchParams.toString()}`);
    setFilters({
      ...filters,
      search: e.target.value,
    });
    dispatch(
      getFiltered(filters.finish, filters.size, filters.thickness, filters.material, e.target.value, filters.sqft, filters.type
      )
    );
  };

  useEffect(() => {
    dispatch(getFilteredSearch(''))
  },[])

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        ml={"2vw"}
        mr={"2vw"}
        mb={"6vh"}
        h={"17vh"}
        w={"80vw"}
        justifyContent={"center"}
      >
        {/* -------------------- SEARCH INPUT and CREATE PRODUCT/DIMENSION------------------------------ */}
        <Box
          ml={"1vh"}
          mt={"8vh"}
          display={"flex"}
          w={"full"}
          alignSelf={"flex-start"}
          flexDir={"row"}
          justifyContent={"space-between"}
        >
          <Box w={"25vw"}>
            <Input
              mb={"3vh"}
              w={"60%"}
              minH={"4.5vh"}
              variant="unstyled"
              placeholder={"Product name"}
              textColor={"web.text2"}
              _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
              size={"sm"}
              value={filters.search}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              onChange={(e) => handleChangeProductName(e)}
            />
            <IconButton
              color={"web.text2"}
              borderRadius={2}
              aria-label="Search database"
              bgColor={"web.bg"}
              ml={1}
              icon={<SearchIcon />}
              _hover={{
                color: "orange",
              }}
              _active={{ color: "gray.800" }}
            />
          </Box>
          {
          validUser === true ? (
          <Box display={'flex'} flexDir={'row'} h={'6vh'} justifyContent={'center'} alignItems={'center'} gap={'3vw'} pr={"1vw"}>
            <CreateProduct
              values={values}
              factories={factories}
              materials={materials}
            />
            <CreateProductDimension 
              values={values}
              materials={materials}
          />
          </Box>) :
          null
          }
        </Box>
        {/* --------------------BOX SELECTS, SLIDER AND CLEAR BUTTON ------------------------------ */}
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          h={'10vh'}
          w={"80vw"}
          ml={"1vw"}
        >
          <Box
            display={"flex"}
            flexDir={"row"}
            w={"45vw"}
            justifyContent={"space-between"}
          >
            <Select
              onChange={(e) => handleMaterial(e)}
              mb={"0.5vh"}
              w={"9vw"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
                textColor: "inherit",
              }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              _hover={{ borderColor: "web.border" }}
              cursor={"pointer"}
              value={filters.material}
              mr={"15px"}
            >
              <option value="" className="options">
                Material
              </option>
              {values?.materials &&
                values?.materials?.map((v, i) => {
                  return (
                    <option
                      value={`${v}`}
                      key={i}
                      className={"options"}
                    >{`${v}`}</option>
                  );
                })}
            </Select>
            <Select
              onChange={(e) => handleType(e)}
              mb={"0.5vh"}
              w={"9vw"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
                textColor: "inherit",
              }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              _hover={{ borderColor: "web.border" }}
              cursor={"pointer"}
              value={filters.type}
              mr={"15px"}
            >
              <option value="" className="options">
                Type
              </option>
              {values?.types &&
                values?.types?.map((v, i) => {
                  return (
                    <option
                      value={`${v}`}
                      key={i}
                      className={"options"}
                    >{`${v}`}</option>
                  );
                })}
            </Select>
            <Select
              onChange={(e) => handleSize(e)}
              mb={"0.5vh"}
              w={"9vw"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
                textColor: "inherit",
              }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              _hover={{ borderColor: "web.border" }}
              cursor={"pointer"}
              value={filters.size}
              mr={"15px"}
            >
              <option value="" className="options">
                Size
              </option>
              {values?.sizes &&
                values?.sizes.map((v, i) => {
                  return (
                    <option
                      value={`${v}`}
                      key={i}
                      className={"options"}
                    >{`${v}`}</option>
                  );
                })}
            </Select>
            <Select
              onChange={(e) => handleThickness(e)}
              mb={"0.5vh"}
              w={"9vw"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
                textColor: "inherit",
              }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              _hover={{ borderColor: "web.border" }}
              cursor={"pointer"}
              value={filters.thickness}
              mr={"15px"}
            >
              <option value="" className="options">
                Thickness
              </option>
              {values?.thickness &&
                values?.thickness?.map((v, i) => {
                  return (
                    <option
                      value={`${v}`}
                      key={i}
                      className={"options"}
                    >{`${v}`}</option>
                  );
                })}
            </Select>
            <Select
              onChange={(e) => handleFinish(e)}
              mb={"0.5vh"}
              w={"9vw"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
                textColor: "inherit",
              }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              _hover={{ borderColor: "web.border" }}
              cursor={"pointer"}
              value={decodeURIComponent(filters.finish)}
              mr={"15px"}
            >
              <option value="" className="options">
                Finish
              </option>
              {values?.finishValues &&
                values?.finishValues?.map((v, i) => {
                  return (
                    <option
                    value={`${v}`}
                    key={i}
                    className={"options"}
                  >{`${v}`}</option>
                  );
                })
                }
            </Select>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDir={"row"}
          >
            {/* <Box display={"flex"} flexDir={"column"}>
              <SqftSlider
                setFilters={setFilters}
                filters={filters}
                limit={limit}
                setLimit={setLimit}
                values={values}
                valueDefault={valueDefault}
                setValueDefault={setValueDefault}
              />
            </Box> */}
            <Divider orientation={"vertical"} h={"5vh"} ml={"2vw"} />
            <Tooltip
              placement={"bottom-start"}
              label={"Clear all filters"}
              fontWeight={"hairline"}
            >
              <IconButton
                icon={<AiOutlineClear />}
                variant={"unstyled"}
                display={"flex"}
                borderRadius={"sm"}
                placeContent={"center"}
                alignItems={"center"}
                color={"web.text2"}
                _hover={{
                  color: "logo.orange",
                }}
                _active={{}}
                onClick={(e) => handleClear(e)}
              ></IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ProductsFilters;
