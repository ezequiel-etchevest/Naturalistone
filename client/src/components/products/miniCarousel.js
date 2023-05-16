import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const CarouselProduct = () => {

  const productImages = useSelector(state => state.product_images);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    setImages([])
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
    slidesToShow: images.length === 1 ? 1 : 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };
  
  console.log(images)
  return (
    <Box px="1vh">
      <Slider {...settings}>
        {
           images.map((url, i) => (
            <Box key={i} p="1vh" h="23vh">
              <img
                src={url}
                alt={`Image ${i}`}
                style={{ height: '100%', objectFit: 'cover' }} 
                />
            </Box>
          ))
       }
      </Slider>
    </Box>
  );
};

export default CarouselProduct;
