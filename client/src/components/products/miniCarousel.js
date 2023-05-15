import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const CarouselProduct = () => {
  const dispatch = useDispatch();
  const productImages = useSelector(state => state.product_images);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getProductImages());
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = await Promise.all(
        productImages.map(data => `data:image/jpeg;base64,${data}`)
      );
      setImages(imageUrls);
    };
    fetchImages();
  }, [productImages]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };

  return (
    <Box px="1vh">
      <Slider {...settings}>
        {images.map((url, i) => (
          <Box key={i} p="1vh" h="23vh">
            <img src={url} alt={`Image ${i}`} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselProduct;
