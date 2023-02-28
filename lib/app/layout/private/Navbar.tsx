import { Flex, FlexProps, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavItemProps extends FlexProps {
    link: string;
    icon: string;
    children: string;
}
const Navbar = ({ link, icon, children, ...rest }: NavItemProps) => {
    const { asPath } = useRouter();
    return (
        <Link href={link} style={{ textDecoration: "none" }}>
            <Flex
                className={asPath === link ? "active" : ""}
                align="center"
                p="4"
                mx="6"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color="white"
                bg="#545654"
                _hover={{
                    bg: "#7EB013",
                    color: "white",
                }}
                mt="15px"
                {...rest}
            >
                {icon && <Image src={icon} mr="3" fontSize="16" maxW={link === "/ingredients?type=Premix" ? "28px" : ""} alt="icon"/>}
                {children}
            </Flex>
        </Link>
    );
};

export default Navbar;