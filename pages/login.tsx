import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  useToast,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { responseMessage, validateEmail, validateField } from "../lib/app/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import router, { useRouter } from "next/router";
import { GuestUser, Tokens, User } from "../lib/storage";
import { loginApi, mergeGuestUserCartItemApi } from "../lib/api/sdk";
import { FORGOT_PASSWORD, INDEX_PAGE, INGREDIENTS, REGISTER } from '../lib/app/common/routeConstants'
import _ from "lodash";

interface ILoginState {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  showPassword: boolean;
  rememberMe: boolean;
}

interface ILoginResponseData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  userProfile: {
    avatar: string;
    phone: string;
    address: string;
  }
}

const Login = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const redirectPath: string = typeof router.query?.redirect === "string" ? router.query.redirect : "";
  const [state, setState] = useState<ILoginState>({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    showPassword: false,
    rememberMe: false,
  });
  const toast = useToast();
  const {
    email,
    emailError,
    password,
    passwordError,
    showPassword,
  } = state;

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
    } else if (name === "email" && !validateEmail(trimValue)) {
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

  const { mutate: mergeGuestUserCartMutate } = useMutation(mergeGuestUserCartItemApi, {
    onSuccess: (): void | Promise<unknown> => {
      queryClient.invalidateQueries(['listCartItem']);
    }
  })

  const { mutate, isLoading } = useMutation(loginApi, {
    onSuccess: (data): void | Promise<unknown> => {
      // Invalidate and refetch
      if (data.status) {
        if (_.has(GuestUser.getGuestUserDetails(), 'id') && _.has(GuestUser.getGuestUserDetails(), 'cartItems')) {
          mergeGuestUserCartMutate(GuestUser.getGuestUserDetails().id)
        }
        const getLoginData: ILoginResponseData = data.data;
        Tokens.setToken(data.data.token);
        let userData = {
          email: getLoginData && getLoginData.email ? getLoginData.email : "",
          id: getLoginData && getLoginData.id ? getLoginData.id : "",
          firstName: getLoginData && getLoginData.firstName ? getLoginData.firstName : "",
          lastName: getLoginData && getLoginData.lastName ? getLoginData.lastName : "",
          avatar: getLoginData && getLoginData.userProfile && getLoginData.userProfile?.avatar ? getLoginData.userProfile?.avatar : "",
          address: getLoginData && getLoginData.userProfile && getLoginData.userProfile?.address ? getLoginData.userProfile?.address : "",
          phone: getLoginData && getLoginData.userProfile && getLoginData.userProfile?.phone ? getLoginData.userProfile?.phone : "",
        };
        User.setUserDetails(userData);
        if (redirectPath) {
          router.replace(redirectPath)
        } else {
          router.replace(INGREDIENTS)
        }
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
    return (!emailError && !passwordError && [email, password].every(Boolean));
  };

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: { email: string; password: string } = { email, password };
    if (isFormValid()) {
      mutate(body);
    }
  };

  return (
    <Flex flex={1} flexDirection={{ base: "column", md: "row" }}>
      <Flex className="form_left" flex={1}>
        <Box className="inner_left" w="100%" p={{ base: "100px", md: "30px 70px" }} color="white">
          <Link href={INDEX_PAGE}><Image cursor={"pointer"} alt={"Login Image"} objectFit={"cover"} src={"logo.svg"} /></Link>
          <Text mt={{ base: "20px", md: "50px" }} textShadow="0px 4px 3px rgb(0 0 0 / 15%)" fontSize="28px" fontWeight="700" lineHeight="40px">
            What is stopping your company from reaching its full potential?{" "}
            <br />
            <br />
            Harness the power of sustainable and cost-effective plant-only
            solutions with our proprietary,
            <br />
            <br />
            machine-learning platform, Charaka<sup>TM</sup>.
          </Text>
        </Box>
      </Flex>

      <Flex className="form_right" flex={1} align={"center"} justify={"center"}>
        <Stack className="Form_Outer" spacing={4} w={{ base: "100%", md: "60%" }} background="#fff" p="24px" borderRadius="8px" boxShadow="10px 4px 50px 0px rgb(0 0 0 / 15%)">
          <Heading color={"rgba(15, 43, 22)"} fontSize={{ base: "35px", md: "45px" }} mb={{ base: "5px", md: "10px" }}>Log In</Heading>
          <FormControl id="email" isInvalid={!emailError ? false : true}>
            <FormLabel>Email Address</FormLabel>
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
                pt="6px"
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
          <Stack className="rem_wrap" spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Text color={"rgb(84 122 26)"}><Link href={FORGOT_PASSWORD}>Forgot password?</Link></Text>
            </Stack>
            <Button
              w={"full"}
              colorScheme={"green"}
              bg={"rgb(84 122 26)"}
              _hover={{ bg: "rgb(84 122 26)" }}
              _active={{ bg: "rgb(84 122 26)" }}
              variant={"solid"}
              isLoading={isLoading}
              loadingText={"Logging in"}
              onClick={handleOnSubmit}
              disabled={!isFormValid() || isLoading}
            >
              Login
            </Button>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"center"}
            >
              <Text className="for_acnt">
                Don't have an account?{" "}
                <Link href={REGISTER}>Create an account</Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;
