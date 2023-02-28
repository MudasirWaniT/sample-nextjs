import {
    Box,
    Button,
    FormControl,
    Heading,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import List from "../../components/ingredients/List";
import Loader from "../../components/loader/Loader";
import { listIngredientApi } from "../../lib/api/sdk";
import { Camelize } from "../../lib/app/utils";

export enum IIngredientMediaTypeData {
    Image = "Image",
    Video = "Video"
}

export interface IIngredientMediaData {
    id: string;
    ingredientId: string;
    type: IIngredientMediaTypeData;
    path: string;
    status: number;
}

export interface IIngredientData {
    id: string;
    IngredientMedia: any[];
    category: string;
    type: string;
    name: string;
    prices: IPriceData[];

}

export interface INutritionParamsData {
    id: string;
    ingredientId: string;
    name: string;
    type: string;
    dv: number;
    weightInMg: number;
}

export interface IPriceData {
    id: string;
    name: string;
    currency: IPricesCurrency;
    amount: number;
    ingredientId: string;
}

export interface IPricesCurrency {
    USD: string;
    INR: string;
    SGD: string;
}

export interface ITypeOptions {
    label: string;
    value: string;
}

interface IListIngredientsState {
    search: string;
    category: string;
    type: string;
    typeOptions: ITypeOptions[];
    limit: number;
    toRecords: number;
    totalRecords: number;
    fromRecords: number;
}
interface IListIngredientQueryState {
    page: number;
    limit: number;
    keyword: string | null;
    category: string | null;
    type: string | null;
}

const ListIngredients = () => {
    const queryInitialState: IListIngredientQueryState = {
        page: 1,
        limit: 10,
        keyword: null,
        category: null,
        type: null
    }
    const initialState: IListIngredientsState = {
        search: "",
        category: "",
        type: "",
        typeOptions: [
            { label: "Ingredient", value: "Ingredient" },
            { label: "Whitelabel", value: "Whitelabel" },
            { label: "Premix", value: "Premix" },
        ],
        limit: 10,
        toRecords: 0,
        totalRecords: 0,
        fromRecords: 0
    }
    const toast = useToast();
    const router = useRouter();
    const typeFilter = typeof router.query?.type === "string" ? router.query.type : "";
    const [ingredientsData, setIngredientsData] = useState<IIngredientData[]>([]);
    const [query, setQuery] = useState<IListIngredientQueryState>(queryInitialState);
    const [state, setState] = useState<IListIngredientsState>(initialState)
    const { search, category, type, typeOptions, limit, toRecords, totalRecords, fromRecords } = state;

    const { data, isError, isLoading } = useQuery(["listIngredient", query],
        () =>
            listIngredientApi(query),
        {
            keepPreviousData: true
        }
    );

    useEffect(() => {
        if (typeFilter) {
            setState(prevState => ({ ...prevState, type: typeFilter }));
            setQuery(prevState => ({ ...prevState, page: 1, type: typeFilter }));
        } else {
            setState(initialState);
            setQuery(queryInitialState);
        }
    }, [typeFilter])

    useEffect(() => {
        if (data && data.status && data.data) {
            if (data.data.data.length > 0) {
                if (query.page > 1) {
                    setIngredientsData(_.uniqBy([...ingredientsData, ...data.data.data], "id"));
                } else {
                    setIngredientsData(_.uniqBy([...data.data.data], "id"));
                }
            } else {
                setIngredientsData([]);
            }
            setState(prevState => ({ ...prevState, totalRecords: data.data.total, fromRecords: data.data.total === 0 ? 0 : 1, toRecords: data.data.total > query.page * limit ? query.page * limit : data.data.total }));
        }
    }, [data])

    useEffect(() => {
        if ((data && !data.status) && isError) {
            toast({
                title: `${data.message || 'Something went Wrong!'}`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
            })
        }
    }, [isError]);

    const handleCategoryOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { value } = event.target;
        setState(prevState => ({ ...prevState, category: value }));
        if (value.length === 0) {
            setQuery(prevState => ({ ...prevState, page: 1, category: null }));
        }
    }

    const handleTypeOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setState(prevState => ({ ...prevState, type: value }));
        if (value.length === 0) {
            setQuery(prevState => ({ ...prevState, page: 1, type: null }));
        }
    }

    const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setState(prevState => ({ ...prevState, search: value }));
        if (value.length === 0) {
            setQuery(prevState => ({ ...prevState, page: 1, keyword: null }));
        }
    }

    const setCurrentPage = (currentPage: number) => {
        setQuery(prevState => ({ ...prevState, page: currentPage }));
    }

    const handleSearchOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setQuery(prevState => ({
            ...prevState,
            page: 1, keyword: search, category: category, type: type
        }));
    }
    if (isLoading) {
        return <Loader loading={isLoading} />
    }

    return (
        <Box>
            <Box>
                <Heading mb={{ base: "22px", md: "33px" }}>
                    Ingredients
                </Heading>
                <Text color={"#6F6F6F"} fontWeight="400" fontSize={"14px"}
                    lineHeight="22.4px">{data && data.status && `Showing ${fromRecords} - ${toRecords} of ${totalRecords} products`}</Text>
            </Box>
            <Stack spacing={{ base: 3, sm: 3, md: 6 }} direction={{ base: "column", lg: "row" }}>
                <FormControl bg={"white"} borderRadius="8px" w="100%">
                    <InputGroup>
                        <Input
                            name="search"
                            placeholder="Search product by name"
                            value={search}
                            onChange={handleSearchOnChange}
                        />
                        <InputRightElement p="7px 10px 0 0">
                            <Image src="/images/searchIcon.svg" alt="search" />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl bg={"white"} borderRadius="8px">
                    <Select placeholder="Select Category" color="#6F6F6F" name="category" fontSize={"16px"} value={category}
                        _placeholder={{ color: "#6F6F6F" }} size='lg' onChange={handleCategoryOnChange}>
                        {
                            data && data.status && ingredientsData.filter((filterVal: IIngredientData, key: number) => (ingredientsData.map(obj => obj.category.toLowerCase())).indexOf(filterVal.category.toLowerCase()) === key).map((val: IIngredientData, index: number) => {
                                return (
                                    <option key={index} value={val.category}>
                                        {Camelize(val.category)}
                                    </option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl bg={"white"} borderRadius="8px">
                    <Select placeholder="Select Type" color="#6F6F6F" fontSize={"16px"} value={type}
                        _placeholder={{ color: "#6F6F6F" }} size='lg' name="type" onChange={handleTypeOnChange}>
                        {
                            typeOptions && typeOptions.map((filterType: ITypeOptions, index: number) => {
                                return (
                                    <option key={index} value={filterType.value} style={{ textTransform: "capitalize" }}>
                                        {Camelize(filterType.label)}
                                    </option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Box textAlign={{ base: 'left', md: 'left' }}>
                    <Button
                        p={"24px 45px"}
                        colorScheme="#7EB013"
                        color="white"
                        bg="#7EB013"
                        _active={{ bg: "#7EB013", color: "white" }}
                        variant="solid"
                        onClick={handleSearchOnClick}
                        disabled={(!search && !category && !type) || totalRecords === 0}
                    >Search</Button>
                </Box>
            </Stack>
            <Box p="20px 0">
                    <List
                        isLoading={isLoading}
                        ingredientsData={ingredientsData}
                />
                {(totalRecords > (query.limit * query.page)) &&
                    <Box textAlign={"center"} mt="25px">
                        <Button
                            p={"24px 25px"}
                            borderRadius="30px"
                            colorScheme="#7EB013"
                            color="#7EB013"
                            bg="white"
                            _hover={{ bg: "#7EB013", color: "white" }}
                            variant="outline"
                            onClick={() => setCurrentPage(query.page + 1)}>
                            Load More
                        </Button>
                    </Box>}
            </Box>
        </Box>
    );
}

export default ListIngredients;