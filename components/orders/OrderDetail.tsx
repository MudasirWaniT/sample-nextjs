import {
    Box,
    Image,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import _ from "lodash";
import { Camelize } from "../../lib/app/utils";
import { IOrderListData, IOrderResponseData } from "../../pages/orders";
import S3Image from "../image/S3Image";
import { IIngredientMediaData, IIngredientMediaTypeData } from "../../pages/ingredients";
import moment from "moment";

interface IOrderDetailTableProps {
    data: IOrderResponseData;
    makeOrderPayment: () => void;
    isLoading: boolean;
}

const OrderDetail = ({ data, makeOrderPayment, isLoading }: IOrderDetailTableProps) => {
    const orderItems = data?.orderItems || [];
    const amount = data?.amount || 0;
    const createdBy = data?.createdBy ? "Admin" : "Self";
    const status = data?.status || "";

    return (
        <Box bg="white" p="30px">
            <Box p={{ base: "5px", md: "30px" }} gap={{ base: 5, md: 0 }} display={"flex"} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #ccc" flexWrap={"wrap"}>
                <Box>
                    <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Order Date</Text>
                    <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{moment(data.createdAt || "").format('ll') || "-"}</Text>
                </Box>
                <Box>
                    <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Order No</Text>
                    <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{`#${data.id}` || ""}</Text>
                </Box>
                <Box>
                    <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Created By</Text>
                    <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{`${createdBy}` || ""}</Text>
                </Box>
                <Box>
                    <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px" mb="4px">Payment Status</Text>
                    <Text fontSize="14px" fontWeight={"400"} lineHeight="20px" bg={status === "paid" ? "#C6F6D5" : status === "pending" ? "#E9D8FD" : "#FED7D7"} p="5px 25px" borderRadius={"5px"} color={status === "paid" ? "#22543D" : status === "pending" ? "#46397F" : "#83343A"}>{Camelize(status)}</Text>
                </Box>
            </Box>
            {orderItems.length > 0 && _.map(orderItems, (orderItem: IOrderListData, orderItemIndex: number) => {
                const ProductImage = orderItem?.ingredient?.IngredientMedia || [];
                return (
                    <Box key={orderItemIndex} p={{ base: "10px", md: "30px" }} display={"flex"} justifyContent={{ base: "space-between" }} borderBottom="1px solid #ccc" flexWrap={"wrap"}>
                        <Box display={"flex"} alignItems="start" justifyContent={"space-between"}>
                            {ProductImage.length > 0 ? ProductImage.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Image).length > 0 ? ProductImage.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Image).slice(0, 1).map((imageFile: IIngredientMediaData, imageIndex: number) => {
                                return (
                                    <S3Image
                                        boxSize={{ base: "75px", md: '150px' }}
                                        objectFit='cover'
                                        key={imageIndex}
                                        component="list"
                                        image={imageFile}
                                        alt="img" />
                                )
                            }) :
                                <Image src="/images/notFoundIngredientImg.jpg" boxSize='150px' objectFit='cover' />
                                :
                                <Image src="/images/notFoundIngredientImg.jpg" boxSize='150px' objectFit='cover' />
                            }
                            <Box ml={{ base: "30px" }}>
                                <Heading fontSize={{ base: "20px", md: "26px" }}>{Camelize(orderItem.ingredient.name) || ""}</Heading>
                                <Text fontSize={{ base: "14px", md: "16px" }}>{`Quantity: ${orderItem.quantity}` || ""}</Text>
                                <Text fontSize={{ base: "14px", md: "16px" }}>{`Price: $ ${orderItem.price.amount}` || ""}</Text>
                            </Box>
                        </Box>
                        <Box mt={{ base: "10px", md: 0 }} textAlign="end">
                            <Heading fontSize={{ base: "20px", md: "26px" }}>{`$ ${(orderItem.quantity * orderItem.price.amount)}`}</Heading>
                        </Box>
                    </Box>
                )
            })}
            <Box maxWidth={"300px"} display={"flex"} justifyContent={{ base: "flex-start", md: "flex-end" }} marginLeft={"auto"} p={{ base: "5px", md: "30px" }} pb="5px">
                <Box display={"flex"}>
                    <Box>
                        <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Subtotal</Text>
                        <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Shipping Fee</Text>
                        <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Tax Fee</Text>
                        <Text color={"#ccc"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Discount</Text>
                    </Box>
                    <Box ml="70px">
                        <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{`$ ${amount}`}</Text>
                        <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{"$ 0"}</Text>
                        <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{"$ 0"}</Text>
                        <Text color={"#eeeee"} fontSize="14px" fontWeight={"400"} lineHeight="20px">{"$ 0"}</Text>
                    </Box>
                </Box>
            </Box>
            <Box maxWidth={"300px"} display={"flex"} justifyContent={{ base: "flex-start", md: "flex-end" }} marginLeft={"auto"} pr={{ base: "5px", md: "30px" }} >
                <Box display={"flex"} justifyContent="flex-end" borderBottom="1px solid #ccc" borderTop="1px solid #ccc" py="5px">
                    <Box>
                        <Text color={"#eeeee"} fontSize="14px" fontWeight={"600"} lineHeight="20px">Total</Text>
                    </Box>
                    <Box ml="125px">
                        <Text color={"#eeeee"} fontSize="14px" fontWeight={"600"} lineHeight="20px">{`$ ${amount}`}</Text>
                    </Box>
                </Box>
            </Box>
            {
                status === "pending" && createdBy === "Self" &&
                <Box textAlign={{ base: "left", md: "right" }} pr={{ base: "5px", md: "30px" }} mt={{ base: "10px", md: "30px" }}>
                    <Button bg={"#5E8E22"} p="16px 30px" color="#fff" _hover={{ bg: "#5E8E22", color: "#fff" }} _active={{ bg: "#5E8E22", color: "#fff" }} onClick={makeOrderPayment} isLoading={isLoading}>Make Payment</Button>
                </Box>
            }
        </Box>
    );
}

export default OrderDetail;