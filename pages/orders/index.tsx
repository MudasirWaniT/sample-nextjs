import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
    useToast
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import OrderHistoryTable from "../../components/orders/OrderHistoryTable";
import { listOrdersApi } from "../../lib/api/sdk";
import { IIngredientMediaData } from "../ingredients";

interface IOrderListIngredientData {
    name: string;
    category: string;
    type: string;
    IngredientMedia: IIngredientMediaData[];
}
interface IOrderListPriceData {
    amount: number;
}

export interface IOrderListData {
    id: string
    ingredient: IOrderListIngredientData
    ingredientId: string;
    orderId: string;
    price: IOrderListPriceData
    priceId: string;
    quantity: number;
}

export interface IOrderResponseData {
    amount: number;
    id: string;
    orderItems: IOrderListData[];
    sessionId: string;
    status: string;
    userId: string;
    createdAt: string;
    createdBy: boolean;
}

const Order = () => {
    const toast = useToast();
    const [orderListData, setOrderListData] = useState<IOrderResponseData[]>([]);
    const { data, isError } = useQuery(['listOrders'], listOrdersApi);
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
            if (data.data.length > 0) {
                setOrderListData(_.uniqBy([...orderListData, ...data.data], "id"))
            } else {
                setOrderListData([]);
            }
        }
    }, [data]);
    return (
        <Box>
            <Box bg={"#fff"} borderRadius="8px" p={"20px 35px"} mt="45px">
                <Box borderBottom={"2px solid #E4EEEE"} >
                    <Heading mb="18px" fontSize={"24px"} lineHeight="26px" fontWeight={"800"} color="#020202">Order History</Heading>
                </Box>
                <OrderHistoryTable data={orderListData} />
            </Box>
        </Box>
    );
}

export default Order;