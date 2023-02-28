import React from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";

interface SidebarProps extends BoxProps {
    onClose: () => void;
    isPrivate: boolean;
    show: boolean;
}

interface LinkItemProps {
    name: string;
    icon: string;
    itemPath: string;
}
const LinkItems: Array<LinkItemProps> = [
    {
        name: "Order History",
        icon: "/images/orderIcon.svg",
        itemPath: "/orders",
    },
    {
        name: "Ingredients",
        icon: "/images/ingredientIcon.svg",
        itemPath: "/ingredients?type=Ingredient",
    },
    {
        name: "White Label",
        icon: "/images/labelIcon.svg",
        itemPath: "/ingredients?type=Whitelabel",
    },
    {
        name: "Pre-mix",
        icon: "/images/preMixIcon.svg",
        itemPath: "/ingredients?type=Premix",
    },
    {
        name: "Support",
        icon: "/images/supportIcon.svg",
        itemPath: "/support",
    },
];

const Sidebar = ({ show, isPrivate, onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            className="custom_nav"
            transition="0.3s ease-in-out 0s"
            bg={"#2E302E"}
            w={show ? { base: "240px", md: "349px" } : { base: "0", md: "0" }}
            minHeight={{ base: "100vh", md: "calc(100vh - 261px)" }}
            overflow={"auto"}
            position={{ base: "fixed", md: "inherit" }}
            zIndex={99}
            {...rest}
        >
            <Text m="8" color="#767F88">
                MENU
            </Text>
            {LinkItems.filter((val) =>
                isPrivate ? val : !["Order History"].includes(val.name)
            ).map((link) => (
                <Navbar key={link.name} link={link.itemPath} icon={link.icon}>
                    {link.name}
                </Navbar>
            ))}
        </Box>
    );
};
export default Sidebar;