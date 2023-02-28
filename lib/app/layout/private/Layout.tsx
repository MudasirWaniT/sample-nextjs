import { Container, Flex } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { getUserDetails } from "../../common/authService";
import Header from "./Header";
import Footer from "./Footer";

const PrivateLayout = ({ children }: PropsWithChildren) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => {
        setShow(!show);
    };
    return (
        <Container maxW="100%" bg="#F9FAFC" p={0}>
            <Box minH="100vh" bg={"#F9FAFC"}>
                <Header isPrivate={true} handleClose={handleClose} />
                <Flex minHeight={"calc(100vh - 261px)"} flexDirection={{ base: "column", md: "inherit" }}>
                    <Sidebar show={show} isPrivate={true} onClose={handleClose} />
                    <Box
                        transition="0.3s ease-in-out 0s"
                        padding={{ base: "20px 35px", sm: "20px 50px", md: "20px 60px" }}
                        flex="1"
                        minHeight={"calc(100vh - 261px)"}
                        backgroundImage={"/images/dashboard_bg.png"}
                        backgroundRepeat="no-repeat"
                        backgroundSize="100% auto"
                    >
                    {children}
                </Box>
                </Flex>
                <Footer />
            </Box>
        </Container>
    );
};

export default PrivateLayout;