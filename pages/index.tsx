import {
  Box,
  Flex,
  FlexProps,
  Image,
  Button,
  Heading,
  Grid,
  Container
} from '@chakra-ui/react';
import { INGREDIENTS, LOGIN, REGISTER, SUPPORT, WHITE_LABEL, PREMIX, CASE_STUDIES } from '../lib/app/common/routeConstants';
import { INDEX_PAGE } from '../lib/app/common/routeConstants';
import { useRouter } from 'next/router';
import { useState } from 'react';
import IndexPageModal from '../components/modal/IndexPageButtonsModal';
import { GuestUser } from '../lib/storage';
import Link from 'next/link';

const Index = () => {
  let guestUserId: number = Date.now();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pagePath, setPagePath] = useState<string>("");

  const handleIndexPageConfirmModal = () => {
    setShowModal(!showModal);
  }

  const handleIngredientOnClick = () => {
    setPagePath(INGREDIENTS);
    setShowModal(!showModal);
  }

  const handleWhiteLabelOnClick = () => {
    setPagePath(WHITE_LABEL);
    setShowModal(!showModal);
  }

  const handlePreMixOnClick = () => {
    setPagePath(PREMIX);
    setShowModal(!showModal);
  }

  const handleSupportOnClick = () => {
    setPagePath(SUPPORT);
    setShowModal(!showModal);
  }

  const handlePrimaryButtonOnClick = () => {
    if (!GuestUser.getGuestUserDetails()) {
      GuestUser.setGuestUserDetails({ "id": `${guestUserId}` });
    }
    router.push(pagePath);
  }

  return (
    <Flex flex={1} flexDirection={{ base: "column" }}>
      <Box display="flex" bg="white" p="15px" alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link href={INDEX_PAGE}><Image cursor={"pointer"} src={'/logo.svg'} alt="logo" height="90px" ml={"25px !important"} /></Link>
        </Box>
        <Box>
           <button type="button" class="chakra-button css-166ip0x" width="50px"  onClick={() => router.push(CASE_STUDIES)}>Case Studies</button> 
        </Box>
        <Box alignItems="center" mr={{ base: 5, md: 20 }}>
          <Button
            display="block"
            w={"full"}
            colorScheme="rgb(84 122 26)"
            color="rgb(84 122 26)"
            _hover={{ bg: "rgb(84 122 26)", color: "white" }}
            _active={{ bg: "rgb(84 122 26)", color: "white" }}
            variant="outline"
            onClick={() => router.push(LOGIN)}
          >LOG IN</Button>
          <Button mt="10px" color="rgb(84 122 26)" textAlign="center" variant="link" onClick={() => router.push(REGISTER)}>CREATE AN ACCOUNT</Button>
        </Box>
      </Box>
      <Box w="100%" padding={{ base: "5% 9%", md: "2% 22%" }}>
        <Heading textAlign="center" lineHeight={{ base: "30px", md: "35px" }} fontSize={{ base: "22px", md: "25px" }}>{"By unlocking ancestral wisdoms of plant nutrition through its proprietary, machine-learning platform, CharakaTM, The Live Green Group accelerates the industry's shift from plant-based to plant-only products."}</Heading>
      </Box>
      <Container maxW={{ base: "100%", md: "80%" }} centerContent p={{ base: "15px", md: "15px" }}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }}
          gap={10}
          // p="10px 100px"
          justifyContent={{ base: "start", md: "center" }}
          alignItems="center">
          <Box textAlign="center">
            <Image cursor={"pointer"} alt="img" borderRadius='8px' src="/images/ingredientsImage.jpg" max-width="100%" width="100%" onClick={handleIngredientOnClick} />
            <Button leftIcon={<Image src={"/images/ingredientIcon.svg"} fontSize="16" />} width="100%" mt="20px" bg="rgb(84 122 26)" color="white" textAlign="center" variant="solid" fontSize="20px" fontWeight="500" _hover={{ bg: "rgb(84 122 26)", color: "white" }} _active={{ bg: "rgb(84 122 26)", color: "white" }} onClick={handleIngredientOnClick}>Visit Ingredients</Button>
          </Box>
          <Box>
            <Image cursor={"pointer"} alt="img" borderRadius='8px' src="/images/icecreamImage.jpg" max-width="100%" width="100%" onClick={handleWhiteLabelOnClick} />
            <Button leftIcon={<Image src={"/images/labelIcon.svg"} fontSize="16" />} w="100%" mt="20px" bg="rgb(84 122 26)" color="white" textAlign="center" variant="solid" fontSize="20px" fontWeight="500" _hover={{ bg: "rgb(84 122 26)", color: "white" }} _active={{ bg: "rgb(84 122 26)", color: "white" }} onClick={handleWhiteLabelOnClick}>Visit Whitelabel</Button>
          </Box>
          <Box>
            <Image cursor={"pointer"} alt="img" borderRadius='8px' src="/images/preMixImage.jpg" max-width="100%" width="100%" onClick={handlePreMixOnClick} />
            <Button leftIcon={<Image src={"/images/preMixIcon.svg"} fontSize="16" maxW={"28px"}/>} w="100%" mt="20px" bg="rgb(84 122 26)" color="white" textAlign="center" variant="solid" fontSize="20px" fontWeight="500" _hover={{ bg: "rgb(84 122 26)", color: "white" }} _active={{ bg: "rgb(84 122 26)", color: "white" }} onClick={handlePreMixOnClick}>Visit Pre-Mix</Button>
          </Box>
          <Box>
            <Image cursor={"pointer"} alt="img" borderRadius='8px' src="/images/supportImage.jpg" max-width="100%" width="100%" onClick={handleSupportOnClick} />
            <Button leftIcon={<Image src={"/images/supportIcon.svg"} fontSize="16" />} w="100%" mt="20px" bg="rgb(84 122 26)" color="white" textAlign="center" variant="solid" fontSize="20px" fontWeight="500" _hover={{ bg: "rgb(84 122 26)", color: "white" }} _active={{ bg: "rgb(84 122 26)", color: "white" }} onClick={handleSupportOnClick}>Visit Support</Button>
          </Box>
        </Grid>
      </Container>
      {showModal && <IndexPageModal isLoading={false} isOpen={showModal} onClose={handleIndexPageConfirmModal} modalPrimaryButtonText="BROWSE AS GUEST" modalPrimaryButtonFn={handlePrimaryButtonOnClick} modalSecondaryButtonText="LOGIN" modalSecondaryButtonFn={() => router.push(LOGIN)} closeOnOverlayClick={false} />}
    </Flex>
  );
}

export default Index;