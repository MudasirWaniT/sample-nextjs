import {
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    FlexProps,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image,
    Button,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { isLoggedIn, onLogout } from "../../common/authService";
import { CART, INDEX_PAGE, LIST_ORDER, LOGIN, PROFILE } from "../../common/routeConstants";
import { useRouter } from "next/router";
import { listCartItemApi } from "../../../api/sdk/carts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GuestUser } from "../../../storage";
import _ from "lodash";
import { useEffect, useState } from "react";
import { getNdaProfileApi } from "../../../api/sdk";

interface HeaderProps extends FlexProps {
    isPrivate: boolean;
    handleClose: () => void;
}
interface IState {
    id: string;
    name: string;
    avatar: string;
    role: string;
}

export const useUserProfileDetails = () => useQuery(["getUserDetail"], getNdaProfileApi, { enabled: isLoggedIn() });

const Header = ({ isPrivate, handleClose, ...rest }: HeaderProps) => {
    const initialState = {
        id: "",
        name: "",
        avatar: "",
        role: ""
    }
    const queryClient = useQueryClient();
    const router = useRouter();
    const [state, setState] = useState<IState>(initialState);
    const { id, name, avatar, role } = state;
    const { data } = useQuery(["listCartItem"], listCartItemApi, { enabled: _.has(GuestUser.getGuestUserDetails(), 'id') || isLoggedIn() });
    const { data: UserDetail } = useUserProfileDetails();
    const totalItems = data && data.status && data.data?.totalItems || 0;
    const handleSignout = () => {
        onLogout();
        queryClient.removeQueries(['listCartItem'])
    }

    useEffect(() => {
        if (UserDetail && UserDetail.status && UserDetail.data) {
            const user = UserDetail.data;
            setState({
                ...state,
                name: user.firstName + " " + user.lastName || "Hello",
                id: user.id || "",
                avatar: user && user.avatar ?
                    `${process.env.NEXT_PUBLIC_S3_BASE_URL}/users/image/${user.id}/${user.avatar}`
                    : "/images/profile_image.jpg",
                role: user && user.role ? user.role : "Customer"
            })
        }
    }, [UserDetail])

    return (
        <Flex
            px={4}
            height="20"
            alignItems="center"
            bg={"white"}
            position={{ base: "sticky", md: "relative" }}
            justifyContent={{ base: "space-between" }}
            top={{ base: 0, md: "inherit" }}
            zIndex={99}
            {...rest}
        >
            <HStack>
                <Image
                    onClick={handleClose}
                    src={"/images/elipsisMenu.svg"}
                    alt="img"
                    cursor="pointer"
                    width="24px"
                />
                <Link href={isLoggedIn() ? LIST_ORDER : INDEX_PAGE} style={{ textDecoration: "none" }}>
                    <Image
                        cursor="pointer"
                        src={"/logo.svg"}
                        alt="logo"
                        width="70px"
                        align="center"
                        ml={"35px !important"}
                    />
                </Link>
            </HStack>
            {isPrivate ? (
                <HStack spacing={{ base: "6", md: "6" }}>
                    <Box position={"relative"}>
                        <Box
                            position={"absolute"}
                            width="15px"
                            height="15px"
                            top="-6px"
                            right="-5px"
                            borderRadius="7px"
                            textAlign="center"
                            fontSize="10px"
                            bg="#5C8C20"
                            color="white"
                        >
                            {totalItems > 9 ? "9+" : totalItems}
                        </Box>
                        <Link href={CART}>
                            <Image
                                src={"/images/cartLogo.svg"}
                                alt="img"
                                cursor="pointer"
                                width="24px"
                            />
                        </Link>
                    </Box>
                    <Flex alignItems={"center"}>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
                            >
                                <HStack>
                                    <Avatar
                                        size={"sm"}
                                        src={avatar}
                                    />
                                    <VStack
                                        display={{ base: "none", md: "flex" }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="sm">{name}</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            {role}
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: "none", md: "flex" }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList bg={"white"} borderColor={"#7EB013"}>
                                <MenuItem
                                    _focus={{ bg: "#7EB013", color: "white" }}
                                    _hover={{ bg: "#7EB013", color: "white" }}
                                    onClick={() => router.push(PROFILE)}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    _focus={{ bg: "#7EB013", color: "white" }}
                                    _hover={{ bg: "#7EB013", color: "white" }}
                                    onClick={handleSignout}
                                >
                                    Sign out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            ) : (
                <HStack spacing={{ base: "8", md: "8" }}>
                    <Box position={"relative"}>
                        <Box
                            position={"absolute"}
                            width="15px"
                            height="15px"
                            top="-6px"
                            right="-5px"
                            borderRadius="7px"
                            textAlign="center"
                            fontSize="10px"
                            bg="#5C8C20"
                            color="white"
                        >
                                {totalItems > 9 ? "9+" : totalItems}
                        </Box>
                        <Link href={CART}>
                            <Image
                                src={"/images/cartLogo.svg"}
                                alt="img"
                                cursor="pointer"
                                width="24px"
                            />
                        </Link>
                    </Box>
                    <Box mr={{ base: 8, md: 8 }}>
                        <Button
                            w="100%"
                            p={"16px 35px"}
                            colorScheme="#5E8E22"
                            color="white"
                            bg="#5E8E22"
                            _active={{ bg: "#5E8E22", color: "white" }}
                            variant="solid"
                            onClick={() => router.push(LOGIN)}
                        >
                            LOG IN
                        </Button>
                    </Box>
                </HStack>
            )}
        </Flex>
    );
};

export default Header;