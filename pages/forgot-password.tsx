import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    FormErrorMessage,
    useToast,
    Text,
    Link
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { responseMessage, validateEmail } from "../lib/app/utils";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../lib/api/sdk";
import { LOGIN } from '../lib/app/common/routeConstants';

interface IForgotPasswordState {
    email: string;
    emailError: string;
}

const forgotPassword = () => {
    const [state, setState] = useState<IForgotPasswordState>({
        email: "",
        emailError: ""
    });
    const toast = useToast();
    const {
        email,
        emailError
    } = state;

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.trim();
        setState({ ...state, [name]: trimValue });
    };

    const checkValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (value.length === 0) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.required`),
            }));
        } else if (name === "email" && !validateEmail(value)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        }
    };

    const resetErrorMessage = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setState((prevState) => ({ ...prevState, [`${name}Error`]: "" }));
    };

    const { mutate, isLoading } = useMutation(forgotPasswordApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "success",
                });
            } else {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                });
            }
        },
    });

    const isFormValid = () => {
        return (!emailError && [email].every(Boolean));
    };

    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            mutate({ email });
        }
    };


    return (
        <Flex className="form_right" flex={1} align={"center"} justify={"center"}>
            <Stack className="Form_Outer" spacing={4} w={{ base: "100%", md: "25%" }} background="#fff" p="24px" borderRadius="8px" boxShadow="10px 4px 50px 0px rgb(0 0 0 / 15%)">
                <Heading color={"rgba(15, 43, 22)"} fontSize={{ base: "35px", md: "45px" }} mb={{ base: "5px", md: "10px" }}>Forgot Password</Heading>
                    <FormControl id="email" isInvalid={!emailError ? false : true}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            onFocus={resetErrorMessage}
                            onBlur={checkValidation}
                        />
                        {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
                    </FormControl>
                    <Stack className="rem_wrap" spacing={6}>
                       
                        <Button
                        bg="#5E8E22"
                        color="#fff"
                        _hover={{ bg: "#5E8E22", color: "#fff" }}
                        _active={{ bg: "#5E8E22", color: "#fff" }}
                            isLoading={isLoading}
                            loadingText={"sending email"}
                            variant={"solid"}
                            onClick={handleOnSubmit}
                            disabled={!isFormValid() || isLoading}                           
                        >
                        Forgot Password
                        </Button>
                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                        >
                            <Text className="for_acnt">
                                Back to {" "}
                                <Link href={LOGIN}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
        </Flex>
    );
};

export default forgotPassword;
