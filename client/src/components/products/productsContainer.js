import { Box } from "@chakra-ui/react";
import ProductList from "./productsList";
import ProductsFilters from "./productsFilters";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ProductsContainer = ({
  allProducts,
  user,
  values,
  factories,
  materials,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [spinner, setSpinner] = useState(false);
  const handleSpinner = () => {
    setTimeout(() => {
      setSpinner(true);
    }, 500);
  };
  useEffect(() => {
    handleSpinner();
  });

  if (spinner) {
    return (
      <Box ml={"16vw"} bg={"web.bg"}>
        <Box>
          <ProductsFilters
            allProducts={allProducts}
            setFilteredProducts={setFilteredProducts}
            values={values}
            factories={factories}
            materials={materials}
            user={user}
          />
          <ProductList
            allProducts={allProducts}
            filteredProducts={filteredProducts}
            user={user}
          />
        </Box>
      </Box>
    );
  } else {
    return (
      <Center ml={"16vw"} w={"84vw"} bg={"web.bg"} h={"92vh"}>
        <Spinner thickness={"4px"} size={"xl"} color={"logo.orange"} />
      </Center>
    );
  }
};

export default ProductsContainer;
