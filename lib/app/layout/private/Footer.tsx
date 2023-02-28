import {
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
    return (
        <Flex flex={1} bg="#161C16" p="30px 0 25px">
            <Container
                maxW="100%"
                width={"80%"}
                display="flex"
                justifyContent={"space-between"}
                flexDirection={{ base: "column", md: "row" }}
            >
                <Box>
                    <Box>
                        <Image src={"/logo.svg"} alt="img" width="70px" />
                    </Box>
                    <Text
                        color={"#A1A7B1"}
                        fontWeight="400"
                        lineHeight={"30px"}
                        fontSize="14px"
                        mt="26px"
                    >
                        © 2021-2025 The Live Green Group, Inc.
                    </Text>
                </Box>
                <Box display={"flex"} justifyContent="space-between" flexWrap={{ base: "wrap", md: "inherit" }} mt={{ base: "25px", md: 0 }}>
                    <Box
                        display={"flex"}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {/* <Box>
                            <Image src={"/logo.svg"} alt="img" width="52px" />
                        </Box> */}
                        {/* <Box mx="20px">
                            <Text color="#959595" p="2px">
                                Visit:
                            </Text>
                            <Text color="#fff" p="1px 2px">
                                The Live Green Co.
                            </Text>
                        </Box> */}
                    </Box>
                    <Stack direction="row" mr="50px" ml="30px" mt="15px" display={{ base: "none", md: "block" }}>
                        <Divider
                            orientation="vertical"
                            variant={"solid"}
                            size="1px"
                            color={"#3D3D3D"}
                        />
                    </Stack>
                    <Box
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"center"}
                        alignItems="flex-start"
                    >
                        <Heading
                            color={"#fff"}
                            fontSize="32px"
                            fontWeight="700"
                            lineHeight=""
                        >
                            Contact us
                        </Heading>
                        <Box
                            as="span"
                            display="flex"
                            alignItems="center"
                            justifyContent={"flex-start"}
                        >
                            <Image src={"/images/mailIcon.svg"} alt="email" />
                            <Link href={"mailto:info@TLGG.com"}>
                                <Text color="#fff" ml={"8px"} cursor="pointer">
                                    info@TLGG.com
                                </Text>
                            </Link>
                        </Box>
                        <Box
                            as="span"
                            display="flex"
                            alignItems="center"
                            justifyContent={"flex-start"}
                            mt="5px"
                        >
                            <Image src={"/images/locationIcon.svg"} alt="location" />
                            <Text color="#fff" ml={"8px"}>
                                Boston, Bangalore, Singapore, San Fernando
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Flex>
    );
};

export default Footer;