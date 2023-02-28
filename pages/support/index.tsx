import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Support = () => {
    return (
        <Box bg={"#fff"} borderRadius="8px">
            <Box borderBottom={"3px solid #ccc"} p={"20px 35px"} mt="45px">
                <Heading>Support</Heading>
            </Box>
            <Box p="60px 40px">
                <Grid templateColumns={"repeat(4, 1fr)"} gap={5}>
                    <Link href={"/support/EngagementTool"}>
                        <Box mb="20px" _hover={{ cursor: "pointer" }} boxShadow={"0 0 15px rgba(0,0,0,0.1)"} borderRadius="8px" bg={"#fff"} boxSize={"150px"} display="flex" justifyContent={"center"} alignItems="center" overflow="hidden">
                            <Text color={"#5E8E22"} fontWeight="600" px="20px" textAlign="center">{"Engagement Tool"}</Text>
                        </Box>
                    </Link>
                    <Link href={"/support/Customization"}>
                        <Box mb="20px" _hover={{ cursor: "pointer" }} boxShadow={"0 0 15px rgba(0,0,0,0.1)"} borderRadius="8px" bg={"#fff"} boxSize={"150px"} display="flex" justifyContent={"center"} alignItems="center" overflow="hidden">
                            <Text color={"#5E8E22"} fontWeight="600" px="20px" textAlign="center">{"R&D Customization"}</Text>
                        </Box>
                    </Link>
                    <Link href={"/support/ClaimsAndLabeling"}>
                        <Box mb="20px" _hover={{ cursor: "pointer" }} boxShadow={"0 0 15px rgba(0,0,0,0.1)"} borderRadius="8px" bg={"#fff"} boxSize={"150px"} display="flex" justifyContent={"center"} alignItems="center" overflow="hidden">
                            <Text color={"#5E8E22"} fontWeight="600" px="20px" textAlign="center">{"Claims & Labeling"}</Text>
                        </Box>
                    </Link>
                    <Link href={"/support/Certifications"}>
                        <Box mb="20px" _hover={{ cursor: "pointer" }} boxShadow={"0 0 15px rgba(0,0,0,0.1)"} borderRadius="8px" bg={"#fff"} boxSize={"150px"} display="flex" justifyContent={"center"} alignItems="center" overflow="hidden">
                            <Text color={"#5E8E22"} fontWeight="600" px="20px" textAlign="center">{"Certifications"}</Text>
                        </Box>
                    </Link>
                    <Link href={"/support/MarketResearch"}>
                        <Box mb="20px" _hover={{ cursor: "pointer" }} boxShadow={"0 0 15px rgba(0,0,0,0.1)"} borderRadius="8px" bg={"#fff"} boxSize={"150px"} display="flex" justifyContent={"center"} alignItems="center" overflow="hidden">
                            <Text color={"#5E8E22"} fontWeight="600" px="20px" textAlign="center">{"Market Research"}</Text>
                        </Box>
                    </Link>
                </Grid>
            </Box >
        </Box >
    );
}

export default Support;