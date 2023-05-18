import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import img1 from '../../../assets/ProductPicture/354-1.jpg'


const CarouselProduct = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
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
    //slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };
  const settingsModal = {
    infinite: true,
    speed: 500,
    slidesToShow: 1 ,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };
  
  
  return (
    <>
    <Box px="1vh">
      <Slider {...settings}>
        {/* <Box p="1vh" h="23vh">
          <img
          onClick={onOpen}
          src={img1}
          alt={`Image `}
          style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }}
          />
        </Box>
        <Box p="1vh" h="23vh">
          <img
          onClick={onOpen}
          src={img1}
          alt={`Image `}
          style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }}
          />
        </Box> */}
        {
           images.map((url, i) => (
            <Box key={i} p="1vh" h="23vh">
              <img
                onClick={onOpen}
                src={url}
                alt={`Image ${i}`}
                style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }} 
                />
            </Box>
          ))
       }
      </Slider>

    </Box>
          <Modal isOpen={isOpen} onClose={onClose}  size={'6xl'}>
          <ModalOverlay />
          <ModalContent
            rounded={'md'} 
            mt={'4vh'} 
            mb={'4vh'} 
            w={'60vw'} 
            bg={'web.sideBar'} 
            border={'1px solid'} 
            pt={'2vh'} 
            pb={'2vh'} 
            borderColor={'web.border'}>
            <ModalCloseButton />
            <ModalBody w={'100%'} h={'100%'}>
              <Box>
                <Slider {...settingsModal}>
                  {/* <Box px='0.5vw'>
                    <img
                      src={img1}
                      alt={`Image `}
                      style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }}
                    />
                  </Box>
                  <Box px='0.5vw'>
                    <img
                      src={img1}
                      alt={`Image `}
                      style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }}
                    />
                  </Box>
                  <Box px='0.5vw'>
                    <img
                      src={img1}
                      alt={`Image `}
                      style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }}
                    />
                  </Box> */}
                  {
                    images.map((url, i) => (
                      <Box key={i} p="1vh" h="70vh">
                        <img
                          src={url}
                          alt={`Image ${i}`}
                          style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }} 
                          />
                      </Box>
                      ))
                    }
                  </Slider>

              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
};

export default CarouselProduct;
