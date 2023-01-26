import Picture1 from '../../assets/ProductPicture/354-1.jpg'
import Picture2 from '../../assets/ProductPicture/354-2.jpg'
import Picture3 from '../../assets/ProductPicture/354-3.jpg'
import Picture4 from '../../assets/ProductPicture/354-4.jpg'
import Picture5 from '../../assets/ProductPicture/354-5.jpg'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import '../../assets/carousel.css'


const CarouselProduct = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
    
  };
  return(
    <>
      <Box >
      <Slider {...settings}>
        <Box px={'1vh'} h={'23vh'}>
          <img src={Picture1} />
        </Box>
        <Box px={'1vh'} h={'23vh'}>
          <img src={Picture2} />
        </Box >
        <Box px={'1vh'} h={'23vh'}>
          <img src={Picture3} />
        </Box>
        <Box px={'1vh'} h={'23vh'}>
          <img src={Picture4} />
        </Box>
        <Box px={'1vh'} h={'23vh'}>
          <img src={Picture5} />
        </Box>

      </Slider>
      </Box>
    </>
    )
}

export default CarouselProduct