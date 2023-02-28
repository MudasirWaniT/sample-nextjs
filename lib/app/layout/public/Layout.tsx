import { Box, Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import Footer from "../private/Footer";
import Header from "../private/Header";
import Sidebar from "../private/Sidebar";

const PublicLayout = ({ children }: PropsWithChildren) => {
    const { route } = useRouter();
    const [publicPaths] = useState<string[]>(["/ingredients", "/ingredients/view/[id]", "/cart", "/support",
        "/support/ClaimsAndCertifications", "/support/EngagementTool", "/support/Customization", "/support/NutritionalInfo", "/support/TripleImpact",
         "/support/GTM", "/support/Digitization","/termsAndConditions"]);
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => {
        setShow(!show);
    };
    return (
        <Container maxW="100%" bg="#F9FAFC" p={0}>
            {publicPaths.includes(route) ? (
                <Box minH="100vh">
                    <Header isPrivate={false} handleClose={handleClose} />
                    <Flex minHeight={"calc(100vh - 261px)"}>
                        <Sidebar show={show} isPrivate={false} onClose={handleClose} />
                        <Box
                            transition="0.3s ease-in-out 0s"
                            padding={{ base: "20px", md: "20px 60px" }}
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
            ) : (
                <Box minH={"100vh"} display="flex" flexDirection={"column"}>
                    <Box
                        className="form_wrap"
                        display="flex"
                        flexGrow="1"
                        backgroundImage={"/BgBanner.png"}
                            backgroundRepeat="no-repeat"
                            backgroundSize="100% auto"
                    >
                        {children}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default PublicLayout;