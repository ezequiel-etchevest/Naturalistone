import React, { useEffect, useState } from "react";
import { Box, Text, Switch, Select } from "@chakra-ui/react";
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { useDispatch } from "react-redux";
import { getProductById, patchProduct } from "../../../redux/actions-products";

const ProductSale = ({product}) => {
  const productFlag = product.Sale_Flag === 'True' ? true : false
  const [saleFlag, setSaleFlag] = useState(productFlag)
  const dispatch = useDispatch()
  const rate = [10, 15, 20]
  const productRateNumber = product.Sale_Rate ? product.Sale_Rate : 0
  const [productRate, setProductRate] = useState(productRateNumber)

  const handleClickSwitch = () => {
    setSaleFlag(saleFlag === true ? false : true)
    const bodyUpdate = {
      saleFlag,
    }
    dispatch(patchProduct(product.ProdID, bodyUpdate))
  }

  useEffect(() => {
    dispatch(getProductById(product.ProdID))
  },[saleFlag, productRate])

  const handleChange = (event) => {
    const newProductRate = event.target.value
    setProductRate(newProductRate)
    const bodyUpdate = {
      productRate: newProductRate
    }
    dispatch(patchProduct(product.ProdID, bodyUpdate))
  }

    return (
        <>
         <Box
          ml={'1vw'}
          mt={'1.5vh'}
          px={'1.5vw'}
          py={'2vh'}
          h={'30vh'}
          w={'18vw'}
          display={'flex'}
          flexDir={'column'}
          color={'web.text'}
          bg={'web.sideBar'}
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'}
          >
          <Text color={'web.text2'} fontSize={'2.2vh'}>Product Sale</Text>
            <Box display={"flex"} w={"full"} h={"full"} pt={"4vh"} justifyContent={"space-between"}>
                <Text>Product in Sale</Text>
                <Switch onChange={() => handleClickSwitch()} isChecked={saleFlag} colorScheme={'orange'} size={'md'}/>
            </Box>
            <Box display={"flex"} w={"full"} h={"full"} justifyContent={"space-between"} >
                <Text>Discount Rate</Text>
                <Select
                  onChange={(e)=>handleChange(e)}
                  w={'5vw'}
                  maxW={'280px'}
                  disabled={ product.Sale_Flag === 'False' ? true : false}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"0"}
                  value={productRate}
                  cursor={'pointer'}
                  name="Seller"
                >
                  {
                    rate.length && rate.map((rate, i) => {
                      return(
                        <option key={i} value={rate} className="options">{rate}</option>
                      )
                    })
                  }
            </Select>
            </Box>
        </Box>
        </>
    )
}

export default ProductSale