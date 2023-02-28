import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../../components/loader/Loader";
import { getOrderBySessionIdApi } from "../../lib/api/sdk";
import { VIEW_ORDER } from "../../lib/app/common/routeConstants";

const Payment = () => {
    const toast = useToast();
    const router = useRouter();
    const sessionId = typeof router.query?.sessionId === "string" ? router.query.sessionId : "";
    const success = typeof router.query?.success === "string" ? router.query.success : "";
    const cancel = typeof router.query?.cancel === "string" ? router.query.cancel : "";

    const { data, isError, isLoading } = useQuery(['getOrderBySessionId', sessionId], () => getOrderBySessionIdApi(sessionId), { enabled: !!sessionId });

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

    if (isLoading) {
        return <Loader loading={isLoading} />
    }

    return (
        <Flex height={"100%"} alignItems={"center"} justifyContent="center" flexDirection={{ base: "column" }}>
            {
                success
                    ?
                    <Text display={{ xl: "flex" }} fontSize="20px" lineHeight="25px" mx="5px">{"Your order with orderId "}
                        <Text as="b" mx="5px">{`#${(sessionId && data && data.status && data.data && data.data.id) || ""}`}</Text>
                        {"has been placed successfully, please"}
                        <Text as="b" mx={"5px"} textDecoration={"underline"} cursor="pointer"><Link href={`${VIEW_ORDER}${(sessionId && data && data.status && data.data && data.data.id)}`}>{" click here "}</Link></Text>
                        {" to view the complete order"}
                    </Text>

                    :
                    cancel
                        ?
                        <Text display={{ xl: "flex" }} fontSize="20px" lineHeight="25px" mx="5px">{"Your order with orderId "}
                            <Text as="b" mx="5px">{`#${(sessionId && data && data.status && data.data && data.data.id) || ""}`}</Text>
                            {"has been cancelled, please"}
                            <Text as="b" mx={"5px"} textDecoration={"underline"} cursor="pointer"><Link href={`${VIEW_ORDER}${(sessionId && data && data.status && data.data && data.data.id)}`} >{" click here "}</Link></Text>
                            {" to view the complete order"}
                        </Text>
                        :
                        ""
            }
        </Flex >
    )
}

export default Payment;