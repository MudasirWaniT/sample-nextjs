import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    FormControl,
    Grid,
    Heading,
    Image,
    Input,
    List,
    ListItem,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Loader from "../components/loader/Loader";
import IndexPageModal from "../components/modal/IndexPageButtonsModal";
import { addOrderApi } from "../lib/api/sdk";
import { deleteCartItemApi, editCartItemApi, listCartItemApi } from "../lib/api/sdk/carts";
import { isLoggedIn } from "../lib/app/common/authService";
import { INDEX_PAGE, LIST_ORDER, LOGIN } from "../lib/app/common/routeConstants";
import { Camelize } from "../lib/app/utils";
import { GuestUser } from "../lib/storage";

interface IIngredientData {
    name: string;
    category: string;
    type: string;
}

interface IPriceData {
    amount: number;
}

interface ICartItemData {
    id: string;
    cartId: string;
    ingredientId: string;
    priceId: string;
    quantity: number;
    ingredient: IIngredientData
    price: IPriceData
}

interface ICartState {
    cartItems: ICartItemData[];
}

const Cart = () => {
    let totalPrice = 0;
    const router = useRouter();
    const toast = useToast();
    const queryClient = useQueryClient();
    const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
    const [showOrderContent, setShowOrderContent] = useState<boolean>(false);
    const [showCustomisationContent, setShowCustomisationContent] = useState<boolean>(false);
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
    const [state, setState] = useState<ICartState>({ cartItems: [] });
    const { cartItems } = state;
    const { data, isError, isLoading } = useQuery(["listCartItem"], listCartItemApi, { enabled: _.has(GuestUser.getGuestUserDetails(), 'cartItems') || isLoggedIn() });

    useEffect(() => {
        if ((data && !data.status) || isError) {
            toast({
                title: "Something went wrong",
                position: "top-right",
                isClosable: true,
                status: "error",
            });
        }
    }, [data && isError])

    useEffect(() => {
        if (data && data.status && data.data) {
            const cartItems = data.data?.cartItems || [];
            const amount = data.data?.amount || 0;
            setState(prevState => ({ ...prevState, cartItems: _.uniqBy([...cartItems], "id"), amount }))
        }
    }, [data]);

    const { mutate: EditMutate, isLoading: isUpdateLoading } = useMutation(editCartItemApi, {
        onMutate: async (updatedData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['listCartItem']);
            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(['listCartItem']);
            let cartItemIndex = cartItems.findIndex((obj: any) => updatedData.cartItemId === obj.id)
            cartItems[cartItemIndex].quantity = updatedData.newQuantity;
            let amount = cartItems[cartItemIndex].quantity * cartItems[cartItemIndex].price.amount;
            let totalItems = cartItems.reduce((x, p) => x + p.quantity, 0)
            queryClient.setQueryData(['listCartItem'], (old: any) => ({ ...old, data: { cartItems, amount: amount, totalItems: totalItems } }));
            // Return a context object with the snapshotted value
            return { previousTodos }
        },
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (!data.status) {
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

    const handleQuantityOnChange = (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => {
        const { value } = event.target;
        let index = cartItems.findIndex((data) => data.id === cartItemId);
        cartItems[index].quantity = +value;
        setState(prevState => ({ ...prevState, cartItems }));
    }
    const handleQuantityOnBlur = (event: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => {
        let index = cartItems.findIndex((data) => data.id === cartItemId);
        if (cartItems[index].quantity < 1 || !cartItems[index].quantity) {
            cartItems[index].quantity = 1;
        } else if (cartItems[index].quantity > 10) {
            cartItems[index].quantity = 10;
        }
        setState(prevState => ({ ...prevState, cartItems }));
        EditMutate({ cartItemId, newQuantity: cartItems[index].quantity });
    }
    const handleQuantityDecrement = (event: React.MouseEvent<HTMLLIElement>, cartItemId: string) => {
        event.preventDefault();
        let index = cartItems.findIndex((data) => data.id === cartItemId);
        cartItems[index].quantity--;
        setState(prevState => ({ ...prevState, cartItems }));
        EditMutate({ cartItemId, newQuantity: cartItems[index].quantity-- });
    }
    const handleQuantityIncrement = (event: React.MouseEvent<HTMLLIElement>, cartItemId: string) => {
        event.preventDefault();
        let index = cartItems.findIndex((data) => data.id === cartItemId);
        cartItems[index].quantity++;
        setState(prevState => ({ ...prevState, cartItems }));
        EditMutate({ cartItemId, newQuantity: cartItems[index].quantity++ });
    }
    const { mutate: DeleteMutate, isLoading: isDeleteLoading } = useMutation(deleteCartItemApi, {
        onMutate: async (deletedCartItemID) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['listCartItem']);
            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(['listCartItem']);
            let index = cartItems.findIndex((data) => data.id === deletedCartItemID);
            queryClient.setQueryData(['listCartItem'], (old: any) => ({ ...old, data: { cartItems: old.data.cartItems.filter((obj: any) => deletedCartItemID !== obj.id), totalItems: old.data.totalItems - cartItems[index].quantity } }));
            // Return a context object with the snapshotted value
            return { previousTodos }
        },
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "success",
                });
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
    const handleDeleteCartItem = (event: React.MouseEvent<HTMLImageElement>, cartItemId: string) => {
        event.preventDefault();
        DeleteMutate(cartItemId);
    }

    const { mutate: AddOrderMutate, isLoading: isOrderAdding } = useMutation(addOrderApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                router.push(data.data.checkoutUrl)
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

    const handleCheckoutOnClick = () => {
        if (!isLoggedIn()) {
            router.push({
                pathname: LOGIN,
                query: { redirect: router.pathname },
            })
        } else {
            setShowCheckoutModal(!showCheckoutModal)
        }
    }

    const handleTermsOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setTermsAndConditions(checked)
    }

    const handleModalTertiaryButtonFn = () => {
        AddOrderMutate({ hasAcceptedTerms: termsAndConditions });
    }

    const handleOnCloseModal = () => {
        setShowCheckoutModal(!showCheckoutModal);
        setShowOrderContent(false);
        setShowCustomisationContent(false);
        setTermsAndConditions(false);
    }

    if (isLoading) {
        return <Loader loading={isLoading} />
    }

    return (
        <Box>
            <Breadcrumb spacing='8px' py="5px" separator={<FiChevronRight color='gray.500' />}>
                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                    <Link href={isLoggedIn() ? LIST_ORDER : INDEX_PAGE}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#' color={"#5E8E22"}>Cart</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box bg={"#fff"} borderRadius="8px" p={"20px 35px"} mt="45px">
                <Box borderBottom={"2px solid #E4EEEE"} >
                    <Heading mb="18px" fontSize={"24px"} lineHeight="26px" fontWeight={"800"} color="#020202">Cart</Heading>
                </Box>
                {
                    cartItems.length > 0 ? cartItems.map((data: ICartItemData, index: number) => {
                        totalPrice += data.price.amount * data.quantity
                        return (
                            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} key={index} alignItems="center" justifyContent={{ base: "space-between", md: "space-between" }} p={5} borderBottom={"2px solid #E4EEEE"}>
                                <Box display={"flex"} justifyContent={{ base: "flex-start" }}>
                                    <Text fontSize={"20px"} lineHeight="22px" fontWeight={"400"} color="#000000" mr="10px">{index + 1}.</Text>
                                    <Box>
                                        <Text fontSize={"18px"} lineHeight="22px" fontWeight={"400"} color="#000000">{Camelize(data.ingredient.name || "")}</Text>
                                        <Text fontSize={"14px"} lineHeight="22px" fontWeight={"700"} color={"#7EB013"}>{Camelize(data.ingredient.category || "")}</Text>
                                    </Box>
                                </Box>
                                <Box>
                                    <List display={"flex"} justifyContent={{ base: "flex-end" }}>
                                        <ListItem bg="#767F88" border={"none"} color="white" borderRadius="20px 0 0 20px" borderTop="1px solid #767F88" borderBottom="1px solid #767F88" borderLeft="1px solid #767F88" onClick={(event: React.MouseEvent<HTMLLIElement>) => handleQuantityDecrement(event, data.id)} cursor={isUpdateLoading ? "none" : "pointer"}><Button disabled={data.quantity <= 1} bg="transparent" h={"32px !important"} fontSize={"26px"} fontWeight="light" _hover={{ bg: "transparent", color: "#fff" }} _active={{ bg: "transparent", color: "#fff" }}>-</Button></ListItem>
                                        <ListItem border="2px solid #767F88">
                                            <FormControl id='quant'>
                                                <Input
                                                    id={`${index}`}
                                                    name="quantity"
                                                    type={"number"}
                                                    borderRadius={"0 !important"}
                                                    w="45px"
                                                    height={"34px !important"}
                                                    minHeight="34px !important"
                                                    outline={"0 !important"}
                                                    borderColor="transparent !important"
                                                    boxShadow={"none !important"}
                                                    p="0 12px"
                                                    value={data.quantity}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityOnChange(event, data.id)}
                                                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityOnBlur(event, data.id)}
                                                />
                                            </FormControl>
                                        </ListItem>
                                        <ListItem bg="#767F88" border={"none"} color="white" borderRadius="0 20px 20px 0" borderTop="1px solid #767F88" borderBottom="1px solid #767F88" borderRight="1px solid #767F88" onClick={(event: React.MouseEvent<HTMLLIElement>) => handleQuantityIncrement(event, data.id)} cursor={isUpdateLoading ? "none" : "pointer"}><Button disabled={data.quantity >= 10} bg="transparent" h={"32px !important"} fontSize={"26px"} fontWeight="light" _hover={{ bg: "transparent", color: "#fff" }} _active={{ bg: "transparent", color: "#fff" }}>+</Button></ListItem>
                                    </List>
                                </Box>
                                <Box display={"flex"} justifyContent={{ base: "flex-start", md: "flex-end" }} mt={{ base: "25px", md: "inherit" }}>
                                    {
                                        !isDeleteLoading ?
                                            <Image src={'/images/deleteActiveIcon.svg'} cursor="pointer" alt="del" onClick={(event: React.MouseEvent<HTMLImageElement>) => handleDeleteCartItem(event, data.id)} />
                                            :
                                            <Image src={'/images/deleteInActiveIcon.svg'} cursor="pointer" alt="del" onClick={(event: React.MouseEvent<HTMLImageElement>) => handleDeleteCartItem(event, data.id)} />

                                    }
                                </Box>
                                <Box display={"flex"} justifyContent={{ base: "flex-end" }} alignItems={{ base: "flex-end", md: "inherit" }} mt={{ base: "25px", md: "inherit" }}>
                                    <Text fontSize={"18px"} lineHeight="22px" fontWeight={"400"} color="#545D69">{"$" + data.price.amount * data.quantity}</Text>
                                </Box>
                            </Grid>
                        )
                    })
                        :
                        <Box textAlign={"center"} p={"20px 35px"}>
                            <Heading fontSize={"24px"} lineHeight="26px" fontWeight={"500"} color="#020202">Your Cart is empty</Heading>
                        </Box>
                }
                <Box p="28px" textAlign={"end"}>
                    <Heading fontSize={"24px"} lineHeight="22px" fontWeight={"700"} color="#545D69">{"$" + totalPrice}</Heading>
                </Box>
                <Box textAlign={"end"} pr="24px" pt="10px">
                    <Button bg={"#5E8E22"} p="16px 24px" color="#fff" _hover={{ bg: "#5E8E22", color: "#fff" }} _active={{ bg: "#5E8E22", color: "#fff" }} disabled={cartItems.length === 0} onClick={handleCheckoutOnClick}>CHECKOUT</Button>
                </Box>
            </Box>
            {showCheckoutModal && <IndexPageModal isLoading={isOrderAdding} isOpen={showCheckoutModal} showOrderContent={showOrderContent} onClose={handleOnCloseModal} modalPrimaryButtonText="Continue with order" modalTitle={showOrderContent ? "Confirmation" : ""} modalPrimaryButtonFn={() => setShowOrderContent(!showOrderContent)} modalSecondaryButtonText="Require customization" showCustomisationContent={showCustomisationContent} customisationText={`please contact our team <a href="mailto:support@thelivegreenco.com"><strong>support@thelivegreenco.com</strong></a> for further assistance`} modalSecondaryButtonFn={() => setShowCustomisationContent(!showCustomisationContent)} termsAndConditions={termsAndConditions} handleTermsOnChange={handleTermsOnChange} modalTertiaryButtonText={"Proceed with checkout"} modalTertiaryButtonFn={handleModalTertiaryButtonFn} modalQuaternaryButtonText="OK" closeOnOverlayClick={false} />}
        </Box>
    );
}

export default Cart;