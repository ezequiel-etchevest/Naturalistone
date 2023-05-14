import { useState, useEffect } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import '../../assets/carousel.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

const CarouselProduct = () => {

  const product_images = useSelector(state => state.product_images)
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageResponses = await Promise.all(
        product_images.map(url => axios.get(`/images/img/${url}`, { responseType: 'blob' }))
      );
      const imageBlobs = imageResponses.map(response => response.data);
      const imageUrls = imageBlobs.map(blob => URL.createObjectURL(blob));
      setImages(imageUrls);
    };
    fetchImages();
  }, [product_images]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };
  
  return(
    <>
      <Box  px={'1vh'}  >
      <Slider {...settings}>
        {
          images.map((url, i) => (
            <Box p={'1vh'} h={'23vh'}>
              <img src={url} alt={`img-${i}`} />
            </Box>
          ))
        }
      </Slider>
      </Box>
    </>
  )
}

export default CarouselProduct
