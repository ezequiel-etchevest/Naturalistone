/* eslint-disable jsx-a11y/img-redundant-alt */
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Text, Center } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import img1 from '../../../assets/ProductPicture/354-1.jpg'
import AddFiles from './addNewImagesModal';


const CarouselProduct = ({ product }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const productImages = useSelector(state => state.product_images);
  const [imageIndex, setImageIndex ] = useState(0)
  // useEffect(() => {
  //   setImages([])
  //   const fetchImages = async () => {
  //     const imageUrls = await Promise.all(
  //       productImages.map(data => `data:image/jpeg;base64,${data}`)
  //     );
  //     setImages(imageUrls);
  //   };
  //   if(productImages) fetchImages();
  // }, [productImages]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: productImages.length === 1 ? 1 : 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };
  const settingsModal = {
    infinite: true,
    speed: 500,
    slidesToShow: 1 ,
    slidesToScroll: 1,
    adaptiveHeight: false,
    initialSlide: imageIndex,
  };
  
  
  return (
    <>
    <Box display={"flex"} h={"full"} w={"full"} flexDir={"column"}>
    <Box display={"flex"} h={"90%"} w={"full"} px="1vh">
      <Slider 
      {...settings}>
        {
           productImages.map((img, i) => (
            <Box key={i} p="1vh" h="23vh">
              <img
                onClick={() => {
                  setImageIndex(i)
                  onOpen()
                }}
                src={img.url}
                alt={`Image ${i}`}
                style={{ height: '100%', objectFit: 'cover', margin: '0 auto' }} 
                />
            </Box>
          ))
       }
      </Slider>
    </Box>
      <Center >
        <AddFiles
        product={product}
        allowedFileTypes={['image/jpeg', 'image/png']}
        title={"Add new images"}
        fieldName={'image'}
        url={'/uploadPdf/image'}
        />
      </Center>
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
                  {
                    productImages.map((img, i) => (
                      <Box key={i} p="1vh" h="70vh">
                        <img
                          src={img.url}
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
