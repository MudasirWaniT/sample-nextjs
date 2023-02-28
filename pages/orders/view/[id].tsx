import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useToast
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import Loader from "../../../components/loader/Loader";
import OrderDetail from "../../../components/orders/OrderDetail";
import { getOrderByIdApi, makeOrderPaymentApi } from "../../../lib/api/sdk";
import { LIST_ORDER } from "../../../lib/app/common/routeConstants";

const ViewOrder = () => {
    const toast = useToast();
    const router = useRouter();
    const orderId = typeof router.query?.id === "string" ? router.query.id : "";
    const { data, isError, isLoading } = useQuery(['getOrderDetail', orderId], () => getOrderByIdApi(orderId), { enabled: !!orderId });

    useEffect(() => {
        if ((data && !data.status) || isError) {
            toast({
                title: "Something went wrong",
                position: "top-right",
                isClosable: true,
                status: "error",
            });
        }
    }, [data && isError]);

    const { mutate, isLoading: isMakingPayment } = useMutation(makeOrderPaymentApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                if (data.data) {
                    router.push(data.data.checkoutUrl)
                }
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

    const makeOrderPayment = () => {
        if (orderId)
            mutate(orderId)
    }

    if (isLoading) {
        return <Loader loading={isLoading} />
    }
    return (
        <>
        <Box>
            <Breadcrumb spacing='8px' py="5px" separator={<FiChevronRight color='gray.500' />}>
                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                    <Link href={LIST_ORDER}>Order History</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#' color={"#5E8E22"}>Order Detail</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box>
                    <OrderDetail data={orderId && data && data.status && data.data} makeOrderPayment={makeOrderPayment} isLoading={isMakingPayment} />
            </Box>
        </Box>
            {isMakingPayment && <Loader loading={isMakingPayment} />}
        </>
    );
}

export default ViewOrder;