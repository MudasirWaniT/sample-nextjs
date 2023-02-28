import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    FormErrorMessage,
    InputRightElement,
    InputGroup,
    useToast,
    Box,
    Text
} from "@chakra-ui/react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import React, { ChangeEvent, useEffect, useState } from "react";
import { responseMessage, validateField } from "../../lib/app/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { resetPasswordApi } from "../../lib/api/sdk";
import { LOGIN } from "../../lib/app/common/routeConstants";
import { verifyTokenApi } from "../../lib/api/sdk/auth";

interface IResetPasswordState {
    password: string;
    passwordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
}

const resetPassword = () => {
    const router = useRouter();
    const token = typeof router.query?.resetToken === "string" ? router.query.resetToken : "";
    const [state, setState] = useState<IResetPasswordState>({
        password: "",
        passwordError: "",
        confirmPassword: "",
        confirmPasswordError: "",
        showPassword: false,
        showConfirmPassword: false
    });
    const toast = useToast();
    const {
        password,
        passwordError,
        confirmPassword,
        confirmPasswordError,
        showPassword,
        showConfirmPassword,
    } = state;

    const { data, isError } = useQuery(['verifyResetToken', token], () => verifyTokenApi({ token }),
        {
            enabled: token.length > 0
        });

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.trim();
        setState({ ...state, [name]: trimValue });
    };

    const checkValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.trim();
        if (trimValue.length === 0) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.required`),
            }));
        } else if (name === "password" && !validateField("password", trimValue)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if (name === "confirmPassword" && !validateField("password", trimValue)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setState((prevState) => ({
                    ...prevState,
                    confirmPasswordError: responseMessage("password.matched"),
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    confirmPasswordError: responseMessage(""),
                }));
            }
        }
    };

    const resetErrorMessage = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setState((prevState) => ({ ...prevState, [`${name}Error`]: "" }));
    };

    const { mutate, isLoading } = useMutation(resetPasswordApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "success",
                });
                router.push(LOGIN);
            } else {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                });
            }
        },
        onError: () => {
            toast({
                title: "Something went wrong",
                position: "top-right",
                isClosable: true,
                status: "error",
            });
        },
    });

    const isFormValid = () => {
        return (!passwordError && !confirmPasswordError && [password, confirmPassword].every(Boolean));
    };

    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            mutate({ newPassword: password, token })
        }
    };

    return (
        <>
            {
                (data && !data.status) || isError ?
                    <Flex margin="25% auto 0">
                        <Text flexGrow="1" fontSize="3xl">{data.message}</Text>
                    </Flex>
                    :
                    <Flex flex={1} align={"center"} justify={"center"}>
                        <Flex className="form_right" flex={1} align={"center"} justify={"center"}>
                            <Stack className="Form_Outer" spacing={3} w={{ base: "100%", md: "25%" }} background="#fff" p="24px" borderRadius="8px" boxShadow="10px 4px 50px 0px rgb(0 0 0 / 15%)">
                                <Heading color={"rgba(15, 43, 22)"} fontSize={{ base: "35px", md: "45px" }} mb={{ base: "5px", md: "10px" }}>Reset Password</Heading>
                                <FormControl id="password" isInvalid={!passwordError ? false : true}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={handleOnChange}
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                        />
                                        <InputRightElement
                                            width="2.5rem"
                                            cursor={"pointer"}
                                            onClick={() => {
                                                setState({ ...state, showPassword: !state.showPassword });
                                            }}
                                        >
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </InputRightElement>
                                    </InputGroup>
                                    {passwordError && (
                                        <FormErrorMessage>{passwordError}</FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl id="confirmPassword" isInvalid={!confirmPasswordError ? false : true}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleOnChange}
                                            onFocus={resetErrorMessage}
                                            onBlur={checkValidation}
                                        />
                                        <InputRightElement
                                            width="2.5rem"
                                            cursor={"pointer"}
                                            onClick={() => {
                                                setState({ ...state, showConfirmPassword: !state.showConfirmPassword });
                                            }}
                                        >
                                            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </InputRightElement>
                                    </InputGroup>
                                    {confirmPasswordError && (
                                        <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
                                    )}
                                </FormControl>
                                <Stack className="rem_wrap" spacing={3}>
                                    <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        align={"start"}
                                        justify={"space-between"}
                                    >
                                    </Stack>
                                    <Button
                                        bg="#5E8E22"
                                        color="#fff"
                                        _hover={{ bg: "#5E8E22", color: "#fff" }}
                                        _active={{ bg: "#5E8E22", color: "#fff" }}
                                        isLoading={isLoading}
                                        loadingText={"Resetting"}
                                        variant={"solid"}
                                        onClick={handleOnSubmit}
                                        disabled={!isFormValid() || isLoading}
                                    >
                                        Reset Password
                                    </Button>
                                    <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        align={"start"}
                                        justify={"center"}
                                    >
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Flex>
                    </Flex>
            }
        </>
    );
};

export default resetPassword;
