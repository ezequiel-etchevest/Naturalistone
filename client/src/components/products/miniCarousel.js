import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import '../../assets/carousel.css'
import { useSelector } from 'react-redux';


const CarouselProduct = () => {

  const product_images = useSelector(state => state.product_images)
  console.log(product_images)
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
          product_images?.map((url, i) => {
            return(
              <Box p={'1vh'} h={'23vh'}>
                <img src={`file://${url}`} key={i} alt={i} />
              </Box>
            )
          })
        }
      </Slider>
      </Box>
    </>
  )
}

export default CarouselProduct