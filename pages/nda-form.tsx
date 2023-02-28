import React, { useState, ChangeEvent, MouseEvent, FocusEvent, useEffect } from "react";
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
  Box
} from "@chakra-ui/react";
import { responseMessage } from "../lib/app/utils";
import router from "next/router";
import { INDEX_PAGE } from "../lib/app/common/routeConstants";
import { getSignupUserDetails } from "../lib/storage/user";
import Link from "next/link";
import NdaFormConfirmModal from '../components/modal/Modal';

interface INDAFormState {
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  email: string;
  emailError: string;
  companyName: string;
  companyNameError: string;
  companyRegistrationId: string;
  companyRegistrationIdError: string;
  address: string;
  addressError: string;
  signatoryName: string;
  signatoryNameError: string;
}

const formInitialState: INDAFormState = {
  firstName: "",
  firstNameError: "",
  lastName: "",
  lastNameError: "",
  email: "",
  emailError: "",
  companyName: "",
  companyNameError: "",
  companyRegistrationId: "",
  companyRegistrationIdError: "",
  address: "",
  addressError: "",
  signatoryName: "",
  signatoryNameError: ""
}

export default function NDAForm() {
  const toast = useToast();
  const [state, setState] = useState<INDAFormState>(formInitialState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    email,
    emailError,
    companyName,
    companyNameError,
    companyRegistrationId,
    companyRegistrationIdError,
    address,
    addressError,
    signatoryName,
    signatoryNameError
  } = state;

  useEffect(() => {
    if (getSignupUserDetails()) {
      setState({
        firstName: getSignupUserDetails().firstName,
        firstNameError: "",
        lastName: getSignupUserDetails().lastName,
        lastNameError: "",
        email: getSignupUserDetails().email,
        emailError: "",
        companyName: getSignupUserDetails().companyName,
        companyNameError: "",
        companyRegistrationId: getSignupUserDetails().companyRegistrationId,
        companyRegistrationIdError: "",
        address: getSignupUserDetails().address,
        addressError: "",
        signatoryName: getSignupUserDetails().signatoryName,
        signatoryNameError: ""
      })
    }
  }, [])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const checkValidation = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length === 0) {
      setState((prevState) => ({
        ...prevState,
        [`${name}Error`]: responseMessage(`${name}.required`),
      }));
    }
  };

  const validate = () => {
    let error = false;
    if (companyName.length === 0) {
      setState((prevState) => ({
        ...prevState,
        companyNameError: responseMessage("companyName.required"),
      }));
      error = true;
    }
    if (companyRegistrationId.length === 0) {
      setState((prevState) => ({
        ...prevState,
        companyRegistrationIdError: responseMessage(
          "companyRegistrationId.required"
        ),
      }));
      error = true;
    }
    if (address.length === 0) {
      setState((prevState) => ({
        ...prevState,
        addressError: responseMessage("address.required"),
      }));
      error = true;
    }
    if (signatoryName.length === 0) {
      setState((prevState) => ({
        ...prevState,
        signatoryNameError: responseMessage("signatoryName.required"),
      }));
      error = true;
    }
    return !error;
  };

  const resetErrorMessage = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setState((prevState) => ({ ...prevState, [`${name}Error`]: "" }));
  };

  const handleOnSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const body: {
      firstName: string;
      lastName: string;
      email: string;
      companyName: string;
      companyRegistrationId: string;
      address: string;
      signatoryName: string;
    } = { firstName, lastName, email, companyName, companyRegistrationId, address, signatoryName };
    if (validate()) {
      setShowModal(!showModal)
    }
  };

  const isFormValid = () => {
    return (
      !emailError &&
      !companyNameError &&
      !companyRegistrationIdError &&
      !signatoryNameError &&
      [email, companyName, companyRegistrationId, signatoryName].every(
        Boolean
      )
    );
  };

  return (
    <Flex flex={1} flexDirection={{ base: "column", md: "row" }}>
      <Flex className="form_left" flex={1} bg="#d4d4d4ab">
        <Box className="" w="100%" p={{ base: "0", md: "20px" }} mb={{ base: "34px", md: 0 }} color="white">
          <Text className="form_content" fontSize={{ base: "16px", md: "25px" }} fontWeight={{ base: "bold" }} lineHeight={{ base: "21px", md: "30px" }} mb={{ base: "10px", md: "20px" }} textAlign="center" color="black">
            TLGG Non-Disclosure Agreement Form Preview
          </Text>
          <embed width="100%" height="90%" src="/docs/NdaFormBasic.pdf"></embed>
        </Box>
      </Flex>

      <Flex className="form_right" flex={1} align={"center"} justify={"center"}>
        <Stack className="Form_Outer" spacing={4} w={{ base: "100%", md: "60%" }} background="#fff" p="24px" borderRadius="8px" boxShadow="10px 4px 50px 0px rgb(0 0 0 / 15%)">
          <Heading color={"rgba(15, 43, 22)"} fontSize={{ base: "35px", md: "45px" }} mb={{ base: "5px", md: "10px" }}>Glance Details</Heading>
            <FormControl id="email" isInvalid={!emailError ? false : true}>
              <FormLabel>Email</FormLabel>
              <Input
              disabled
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
          <FormControl
            id="companyName"
            isInvalid={!companyNameError ? false : true}
          >
            <FormLabel>Company Name</FormLabel>
            <Input
              disabled
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={handleOnChange}
              onFocus={resetErrorMessage}
              onBlur={checkValidation}
            />
            {companyNameError && (
              <FormErrorMessage>{companyNameError}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="companyRegistrationId"
            isInvalid={!companyRegistrationIdError ? false : true}
          >
            <FormLabel>Company Registration Id</FormLabel>
            <Input
              disabled
              type="text"
              id="companyRegistrationId"
              name="companyRegistrationId"
              value={companyRegistrationId}
              onChange={handleOnChange}
              onFocus={resetErrorMessage}
              onBlur={checkValidation}
            />
            {companyRegistrationIdError && (
              <FormErrorMessage>{companyRegistrationIdError}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="signatoryName"
            isInvalid={!signatoryNameError ? false : true}
          >
            <FormLabel>Signatory Name</FormLabel>
            <Input
              disabled
              type="text"
              id="signatoryName"
              name="signatoryName"
              value={signatoryName}
              onChange={handleOnChange}
              onFocus={resetErrorMessage}
              onBlur={checkValidation}
            />
            {signatoryNameError && (
              <FormErrorMessage>{signatoryNameError}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            w={"full"}
            colorScheme={"green"}
            bg={"rgb(84 122 26)"}
            _hover={{ bg: "rgb(84 122 26)" }}
            _active={{ bg: "rgb(84 122 26)" }}
            variant={"solid"}
            onClick={handleOnSubmit}
            disabled={!isFormValid()}
          >
            Ok
          </Button>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"center"}
            justify={"center"}
          >
            <Text className="for_acnt">
              Want to Cancel? {" "}
              <Link href={INDEX_PAGE}>Click Here</Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
      {showModal && <NdaFormConfirmModal isCentered={true} size={'lg'} isOpen={showModal} onClose={() => setShowModal(!showModal)} modalTitle={"Registration Completed"} modalBody="Thank you for the registration. You can now browse the site as a guest untill our team will verify your profile and send you a document link, after that you can login by the credentials received in your mail." showPrimaryButton={false} showSecondaryButton={true} modalSecondaryButtonText={"Browse as Guest"} modalSecondaryButtonFn={() => router.push(INDEX_PAGE)} />}
    </Flex>
  );
}
