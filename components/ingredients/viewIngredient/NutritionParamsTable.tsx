import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import _ from "lodash";
import { Camelize } from "../../../lib/app/utils";
import { INutritionParamsData } from "../../../pages/ingredients";

interface INutritionParamsTableProps {
    data: INutritionParamsData[];
}

const NutritionParamsTable = ({ data }: INutritionParamsTableProps) => {
    return (
        <TableContainer maxWidth={{ base: "100%", md: "50%" }}>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th>Dv</Th>
                        <Th textAlign={"center"}>Weight In Mg</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.length > 0 ? (
                            _.map(data, (val: INutritionParamsData, index: number) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{Camelize(val.name)}</Td>
                                        <Td>{Camelize(val.type)}</Td>
                                        <Td>{val.dv}</Td>
                                        <Td textAlign={"center"}>{val.weightInMg}</Td>
                                    </Tr>
                                );
                            })
                        ) : (
                            <Tr>
                                <Td colSpan={4} textAlign="center" fontSize="xl">
                                    {"No nutrition to display!"}
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default NutritionParamsTable;