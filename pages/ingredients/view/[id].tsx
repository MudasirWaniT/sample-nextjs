import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Box, Button, Flex, FormControl, Grid, GridItem, Heading, Image, Input, List, ListItem, Text, useToast,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react';
import Slider from "react-slick";
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getIngredientDetailApi } from '../../../lib/api/sdk';
import { FiChevronRight } from 'react-icons/fi';
import { IIngredientMediaData, IIngredientMediaTypeData, IPriceData } from '..';
import Link from 'next/link';
import { INDEX_PAGE, INGREDIENTS, LIST_ORDER } from '../../../lib/app/common/routeConstants';
import { isLoggedIn } from '../../../lib/app/common/authService';
import { Camelize } from '../../../lib/app/utils';
import { addCartItemApi } from '../../../lib/api/sdk/carts';
import { ICartItemData } from '../../../lib/api/interfaces';
import { GuestUser } from '../../../lib/storage';
import S3Image from '../../../components/image/S3Image';
import NutritionParamsTable from '../../../components/ingredients/viewIngredient/NutritionParamsTable';
import Loader from '../../../components/loader/Loader';

const ViewIngredient = () => {
    const queryClient = useQueryClient();
    let guestUserObj = GuestUser.getGuestUserDetails();
    const router = useRouter();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'

    };
    const toast = useToast();
    const ingredientId = typeof router.query?.id === "string" ? router.query.id : "";
    const { data, isLoading: isGettingData, isError } = useQuery(['getIngredientDetails', ingredientId], () => getIngredientDetailApi(ingredientId), { enabled: ingredientId.length > 0 });
    const nutritionParams = data && data.status && data.data?.nutritionParams || [];
    const ingredientMedia = data && data.status && data.data?.IngredientMedia || [];
    const [liActive, setLiActive] = useState<string>("");
    const [quantityVal, setQuantityVal] = useState<number>(1);

    useEffect(() => {
        if (data && (!data.status || isError)) {
            toast({
                title: 'Something went Wrong!',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
            })
        }
    }, [data]);
    const handleDescOnClick = () => {
        setLiActive("desc");
        const element: HTMLElement | null = document.getElementById("desc");
        element?.scrollIntoView(true);
    }
    const handleInstructionsOnClick = () => {
        setLiActive("instruction");
        const element: HTMLElement | null = document.getElementById("instructions");
        element?.scrollIntoView(true);
    }
    const handlePreparationMethodsOnClick = () => {
        setLiActive("prepMethods");
        const element: HTMLElement | null = document.getElementById("prepMethods");
        element?.scrollIntoView(true);
    }
    const handleNutritionOnClick = () => {
        setLiActive("nutrition");
        const element: HTMLElement | null = document.getElementById("nutrition");
        element?.scrollIntoView(true);
    }
    const handleVideoOnClick = () => {
        setLiActive("video");
        const element: HTMLElement | null = document.getElementById("video");
        element?.scrollIntoView(true);
    }
    const handleQuantityOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuantityVal(parseInt(value));
    }
    const handleQuantityOnBlur = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        let parseValue: number = parseInt(value);
        if (parseValue < 1 || !parseValue) {
            parseValue = 1;
        } else if (parseValue > 10) {
            parseValue = 10;
        }
        setQuantityVal(parseValue);
    }
    const handleQuantityDecrement = () => {
        setQuantityVal(quantityVal - 1);
    }
    const handleQuantityIncrement = () => {
        setQuantityVal(quantityVal + 1);
    }

    const { mutate, isLoading } = useMutation(addCartItemApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "success",
                });
                queryClient.invalidateQueries(['listCartItem']);
            } else {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                });
            }
        },
        onError: () => {
            toast({
                title: "Something went wrong",
                position: "top-right",
                isClosable: true,
                status: "error",
            });
        },
    });

    const handleBuyNowOnClick = (event: React.MouseEvent<HTMLButtonElement>, priceId: string) => {
        event.preventDefault();
        if (quantityVal) {
            let cartItem: ICartItemData = { ingredientId, priceId, quantity: quantityVal };
            mutate({ cartItem });
            GuestUser.setGuestUserDetails({ ...guestUserObj, cartItems: true })
        }   
    }
    if (isGettingData) {
        return <Loader loading={isGettingData} />
    }

    return (
        <Box>
            <Breadcrumb spacing='8px' py="5px" separator={<FiChevronRight color='gray.500' />}>
                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                    <Link href={isLoggedIn() ? LIST_ORDER : INDEX_PAGE}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                    <Link href={INGREDIENTS}>Ingredients</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#' color={"#5E8E22"}>{Camelize(data && data.status && data.data.name)}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex mb={"50px"} className="product_detail" flexWrap={"wrap"}>
                <Box width={{ base: "250px", md: "310px" }} height={{ base: "auto", md: "270px" }} borderRadius={"8px"} overflow={"hidden"}>
                    <Slider {...settings}>
                        {
                            ingredientMedia.length > 0 ? ingredientMedia.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Image).length > 0 ? ingredientMedia.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Image).map((file: IIngredientMediaData, imageIndex: number) => {
                                return <S3Image
                                    className="s3ImageCustomDesign"
                                    key={imageIndex}
                                    component="list"
                                    image={file}
                                    alt="img" />
                            }) :
                                <Image src="/images/notFoundIngredientImg.jpg" />
                                :
                                <Image src="/images/notFoundIngredientImg.jpg" />
                        }
                    </Slider>
                </Box>
                <Box ml={{ base: 0, md: "60px" }} width={"100%"} display={"flex"} flex={{ base: "inherit", md: 1 }} marginTop={{ base: "25px", md: 0 }} flexDirection="column" alignItems={"flex-start"} justifyContent="flex-start">
                    <Text
                        fontSize={"30px"}
                        fontWeight="700"
                        lineHeight="34px"
                        color={"#000000"}
                    >
                        {Camelize(data && data.status && data.data.name)}
                    </Text>

                    {isLoggedIn() &&
                        <>
                        <Text
                        mt="5px"
                        color={"#989898"}
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="22.4px"
                    >
                        {Camelize(data && data.status && data.data.category)}
                    </Text>
                    <Text
                        mt="5px"
                        color={"#989898"}
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="22.4px"
                    >
                        {Camelize(data && data.status && data.data.type)}
                    </Text>
                        </>}
                    {
                        data && data.status && data.data.prices.length > 0 &&
                        data.data.prices.slice(0, 1).map((price: IPriceData, priceIndex: number) => {
                                return (
                                    <Box key={priceIndex} mt={isLoggedIn() ? "none" : "50px"}>
                                        {isLoggedIn() && <Text
                                        mt="30px"
                                        color={"#0D0D0B"}
                                        fontSize="22px"
                                        fontWeight="700"
                                        lineHeight="22.4px"
                                    >
                                            {`$${price.amount}`}
                                        </Text>}
                                        <Box display={"flex"} flexWrap="wrap" mt="30px" alignItems="center">
                                            <Box>
                                                <List display={"flex"}>
                                                    <ListItem bg="#767F88" border={"none"} color="white" borderRadius="20px 0 0 20px" borderTop="1px solid #767F88" borderBottom="1px solid #767F88" borderLeft="1px solid #767F88" onClick={handleQuantityDecrement}><Button disabled={quantityVal <= 1} bg="transparent" h={"32px !important"} fontSize={"26px"} fontWeight="light" _hover={{ bg: "transparent", color: "#fff" }} _active={{ bg: "transparent", color: "#fff" }}>-</Button></ListItem>
                                                    <ListItem border="2px solid #767F88">
                                                        <FormControl id='quantity'>
                                                            <Input
                                                                id='quantity'
                                                                name="quantityVal"
                                                                type="number"
                                                                borderRadius={"0 !important"}
                                                                w="45px"
                                                                height={"34px !important"}
                                                                minHeight="34px !important"
                                                                outline={"0 !important"}
                                                                borderColor="transparent !important"
                                                                boxShadow={"none !important"}
                                                                p="0 12px"
                                                                value={quantityVal}
                                                                onChange={handleQuantityOnChange}
                                                                onBlur={handleQuantityOnBlur}
                                                            />
                                                        </FormControl>
                                                    </ListItem>
                                                    <ListItem bg="#767F88" border={"none"} color="white" borderRadius="0 20px 20px 0" borderTop="1px solid #767F88" borderBottom="1px solid #767F88" borderRight="1px solid #767F88" onClick={handleQuantityIncrement}><Button disabled={quantityVal >= 10} bg="transparent" h={"32px !important"} fontSize={"26px"} fontWeight="light" _hover={{ bg: "transparent", color: "#fff" }} _active={{ bg: "transparent", color: "#fff" }}>+</Button></ListItem>
                                                </List>
                                            </Box>
                                            <Box w={{ base: "100%", md: "inherit" }} marginLeft={{ base: "0", md: "40px" }} marginTop={{ base: "15px", md: 0 }}>
                                                <Button
                                                    isLoading={isLoading}
                                                    loadingText={"Adding"}
                                                    size={"lg"}
                                                    variant="solid"
                                                    p="16px 24px"
                                                    bg={"#5E8E22"}
                                                    color="white"
                                                    _hover={{ bg: "#5E8E22", color: "#fff" }}
                                                    borderRadius={"4px"}
                                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleBuyNowOnClick(event, price.id)}>
                                                    Add to Cart
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                    }
                </Box>
            </Flex >
            <Grid gridTemplateColumns={{ base: "01fr", md: "250px 1fr" }} display={{ base: "inherit", md: "grid" }} bg="white" >
                <GridItem>
                    <Box p="25px" height={"100%"}>
                        <List position={"sticky"} top="0" className='product_detail_list'>
                            <ListItem display={"flex"} justifyContent="space-between" alignItems={"center"} className={liActive === "desc" ? "active" : ""} py="10px" borderBottom={isLoggedIn() ? "1px solid #E4E5E7" : "none"} _hover={{ color: "#5E8E22", cursor: "pointer", fontWeight: "700" }} fontSize={"16px"} onClick={handleDescOnClick}>
                                Description
                                {liActive === "desc" && <FiChevronRight />}
                            </ListItem>
                            {isLoggedIn() &&
                                <>
                            <ListItem display={"flex"} justifyContent="space-between" alignItems={"center"} className={liActive === "instruction" ? "active" : ""} py="10px" borderBottom={"1px solid #E4E5E7"} _hover={{ color: "#5E8E22", cursor: "pointer", fontWeight: "700" }} fontSize={"16px"} onClick={handleInstructionsOnClick}>
                                Instructions
                                {liActive === "instruction" && <FiChevronRight />}
                            </ListItem >
                            <ListItem display={"flex"} justifyContent="space-between" alignItems={"center"} className={liActive === "prepMethods" ? "active" : ""} py="10px" borderBottom={"1px solid #E4E5E7"} _hover={{ color: "#5E8E22", cursor: "pointer", fontWeight: "700" }} fontSize={"16px"} onClick={handlePreparationMethodsOnClick}>
                                Preperation Method
                                {liActive === "prepMethods" && <FiChevronRight />}
                            </ListItem>
                            <ListItem display={"flex"} justifyContent="space-between" alignItems={"center"} className={liActive === "nutrition" ? "active" : ""} py="10px" borderBottom={"1px solid #E4E5E7"} _hover={{ color: "#5E8E22", cursor: "pointer", fontWeight: "700" }} fontSize={"16px"} onClick={handleNutritionOnClick}>
                                Nutrition
                                {liActive === "nutrition" && <FiChevronRight />}
                            </ListItem>
                            <ListItem display={"flex"} justifyContent="space-between" alignItems={"center"} className={liActive === "video" ? "active" : ""} py="10px" _hover={{ color: "#5E8E22", cursor: "pointer", fontWeight: "700" }} fontSize={"16px"} onClick={handleVideoOnClick}>
                                <Text>Videos</Text>
                                {liActive === "video" && <FiChevronRight color="#5E8E22" />}
                            </ListItem>
                                </>}
                        </List>
                    </Box>
                </GridItem>
                <Box p="25px">
                    <Box mb="40px" id="desc">
                        <Heading fontSize={"16px"} lineHeight="20px" fontWeight={"800"} mb="10px">Description</Heading>
                        <Text>{Camelize(data && data.status && data.data.description)}</Text>
                    </Box>
                    {isLoggedIn() &&
                        <>
                        <Box mb="40px" id="instructions">
                        <Heading fontSize={"16px"} lineHeight="20px" fontWeight={"800"} mb="10px">Instructions</Heading>
                        <Text>{Camelize(data && data.status && data.data.instructions)}</Text>
                    </Box>
                    <Box mb="40px" id="prepMethods">
                        <Heading fontSize={"16px"} lineHeight="20px" fontWeight={"800"} mb="10px">Preparation Method</Heading>
                        <Text>{Camelize(data && data.status && data.data.preparationMethods)}</Text>
                    </Box>
                    <Box mb="40px" id="nutrition">
                        <Heading fontSize={"16px"} lineHeight="20px" fontWeight={"800"} mb="10px">Nutrition</Heading>
                        <Box>
                            <NutritionParamsTable data={nutritionParams} />
                        </Box>
                    </Box>
                    <Box id="video">
                        <Heading fontSize={"16px"} lineHeight="20px" fontWeight={"800"} mb="10px">Videos</Heading>
                        <Flex flexDirection={{ base: "column", md: "row" }}>
                            {
                                ingredientMedia.length > 0 ? ingredientMedia.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Video).length > 0 ? ingredientMedia.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Video).map((videoFile: IIngredientMediaData, videoIndex: number) => {
                                    return (
                                        <Box px="5" key={videoIndex}>
                                            <ReactPlayer
                                                controls={true}
                                                url={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/ingredients/media/${videoFile.ingredientId}/${videoFile.path}`}
                                                height={"100%"}
                                                width={"100%"}
                                            />
                                        </Box>
                                    )
                                })
                                    :
                                    <Box>
                                        No video to display!
                                    </Box>
                                    :
                                    <Box>
                                        No video to display!
                                    </Box>
                            }
                        </Flex>
                    </Box>
                        </>}
                </Box>
            </Grid>
        </Box>
    );
}

export default ViewIngredient;