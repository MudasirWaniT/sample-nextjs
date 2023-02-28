import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { isLoggedIn } from "../../lib/app/common/authService";
import { VIEW_INGREDIENT } from "../../lib/app/common/routeConstants";
import { Camelize } from "../../lib/app/utils";
import { IIngredientData, IIngredientMediaData, IIngredientMediaTypeData, IPriceData } from "../../pages/ingredients";
import S3Image from "../image/S3Image";
import Loader from "../loader/Loader";

interface IListProps {
    isLoading: boolean;
    ingredientsData: IIngredientData[];
}

const List = ({ isLoading, ingredientsData }: IListProps) => {
    return (
        <Grid
            templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
            }}
            gap={{ base: 3, md: 5 }}
            justifyContent={{ base: "start", md: "center" }}
            alignItems="center"
        >
            {!isLoading ? ingredientsData.length ? ingredientsData.map((val: IIngredientData, index: number) => {
                return (
                    <Box maxW="sm" overflow="hidden" key={index}>
                        <Link href={VIEW_INGREDIENT + val.id}>
                            <Box cursor={"pointer"} height="300px" w="100%" borderRadius={"8px"} overflow={"hidden"}>
                        {
                            val.IngredientMedia && val.IngredientMedia.length > 0 ? val.IngredientMedia.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Image).length > 0 ? val.IngredientMedia.filter((val: IIngredientMediaData) => val.type === IIngredientMediaTypeData.Image).slice(0, 1).map((image: IIngredientMediaData, i: number) => {
                                return <S3Image
                                    key={i}
                                    className="s3ImageCustomDesign"
                                    component="list"
                                    image={image}
                                    alt="img" />
                            }) :
                                    <Image className="s3ImageCustomDesign" src={'/images/notFoundIngredientImg.jpg'} alt="image" />
                                :
                                    <Image className="s3ImageCustomDesign" src={'/images/notFoundIngredientImg.jpg'} alt="image" />
                        }
                        </Box>
                        </Link>
                        <Box mt="16px">
                            <Link href={VIEW_INGREDIENT + val.id}>
                                <Text
                                    cursor={"pointer"}
                                    _hover={{ textDecoration: "underline", fontWeight: "600" }}
                                    fontSize={"16px"}
                                    fontWeight="400"
                                    lineHeight="22.4px"
                                    color={"#000000"}
                                >
                                    {Camelize(val.name)}
                                </Text>
                            </Link>
                            {isLoggedIn() &&
                                <>
                            <Text
                                color={"#989898"}
                                fontSize="14px"
                                fontWeight="400"
                                lineHeight="22.4px"
                            >
                                {Camelize(val.category)}
                            </Text>
                            <Text
                                color={"#989898"}
                                fontSize="14px"
                                fontWeight="400"
                                lineHeight="22.4px"
                            >
                                {Camelize(val.type)}
                            </Text>

                            {
                                val.prices && val.prices.length ? val.prices.map((price: IPriceData, id: number) => {
                                    return (

                                        <Text
                                            key={id}
                                            mt="7px"
                                            color={"#0D0D0B"}
                                            fontSize="18px"
                                            fontWeight="700"
                                            lineHeight="22.4px"
                                        >
                                            {"$" + price.amount}
                                        </Text>
                                    )
                                })
                                    :
                                    <Text
                                        mt="7px"
                                        color={"#0D0D0B"}
                                        fontSize="18px"
                                        fontWeight="700"
                                        lineHeight="22.4px"
                                    >
                                        {0}
                                    </Text>
                            }
                                </>
                            }
                        </Box>
                    </Box>
                );
            }) :
                <GridItem colSpan={4} textAlign={"center"}>
                    <Heading>No Data Found!</Heading>
                </GridItem>
                :
                <GridItem colSpan={4} textAlign={"center"}>
                    <Loader loading={isLoading} />
                </GridItem>
            }
        </Grid>
    );
};

export default List;