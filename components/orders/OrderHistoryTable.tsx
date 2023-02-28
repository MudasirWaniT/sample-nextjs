import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
} from "@chakra-ui/react";
import _ from "lodash";
import { Camelize } from "../../lib/app/utils";
import { IOrderResponseData } from "../../pages/orders";
import moment from 'moment';
import Link from "next/link";
import { VIEW_ORDER } from "../../lib/app/common/routeConstants";

interface IOrderHistoryTableProps {
    data: IOrderResponseData[];
}

const OrderHistoryTable = ({ data }: IOrderHistoryTableProps) => {
    return (
        <TableContainer>
            <Table>
                <Thead bg={"#DBDBDB"}>
                    <Tr>
                        <Th>Order ID</Th>
                        <Th>Amount</Th>
                        <Th>Payment Status</Th>
                        <Th textAlign={"center"}>Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.length > 0 ? (
                            _.map(data, (val: IOrderResponseData, index: number) => {
                                return (
                                    <Tr key={index}>
                                        <Td><Link href={VIEW_ORDER + val.id}>{`Order: #${val.id}`}</Link></Td>
                                        <Td>{`$${val.amount}`}</Td>
                                        <Td ><Box as="span" bg={val.status === "paid" ? "#C6F6D5" : val.status === "pending" ? "#E9D8FD" : "#FED7D7"} p="5px 25px" borderRadius={"5px"} color={val.status === "paid" ? "#22543D" : val.status === "pending" ? "#46397F" : "#83343A"}>{Camelize(val.status)}</Box></Td>
                                        <Td textAlign={"center"}>{moment(val.createdAt).format('ll')}</Td>
                                    </Tr>
                                );
                            })
                        ) : (
                            <Tr>
                                <Td colSpan={4} textAlign="center" fontSize="xl">
                                    {"Place an order to see Order History!"}
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default OrderHistoryTable;