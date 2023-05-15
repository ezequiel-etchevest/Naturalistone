import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Picture1 from '../../assets/ProductPicture/354-1.jpg'
import Picture2 from '../../assets/ProductPicture/354-2.jpg'
import Picture3 from '../../assets/ProductPicture/354-3.jpg'
import Picture4 from '../../assets/ProductPicture/354-4.jpg'
import Picture5 from '../../assets/ProductPicture/354-5.jpg'

const CarouselProduct = () => {
  const dispatch = useDispatch();
  const productImages = useSelector(state => state.product_images);
  const [images, setImages] = useState([]);

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
        { images.length ? (
           images.map((url, i) => (
            <Box key={i} p="1vh" h="23vh">
              <img
                src={url}
                alt={`Image ${i}`}
                style={{ height: '100%', objectFit: 'cover' }} />
            </Box>
          ))
        ) : (
          <>
            <Box  px={'1vh'}  >
            <Slider {...settings}>
              <Box p={'1vh'} h={'23vh'}>
                <img src={Picture1} />
              </Box>
              <Box p={'1vh'} h={'23vh'}>
                <img src={Picture2} />
              </Box >
              <Box p={'1vh'} h={'23vh'}>
                <img src={Picture3} />
              </Box>
              <Box p={'1vh'} h={'23vh'}>
                <img src={Picture4} />
              </Box>
              <Box p={'1vh'} h={'23vh'}>
                <img src={Picture5} />
              </Box>
      
            </Slider>
            </Box>
          </>
          )
       }
      </Slider>
    </Box>
  );
};

export default CarouselProduct;
