import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Grid, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface IChangePasswordProps {
    isLoading: boolean;
    state: any;
    handleShowCurrentPassword: () => void;
    handleShowNewPassword: () => void;
    handleShowConfirmPassword: () => void;
    isFormValid: () => {};
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleOnBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleOnCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleOnUpdate: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChangePassword = ({ isLoading, state, handleShowCurrentPassword, handleShowNewPassword, handleShowConfirmPassword, isFormValid, handleOnChange, handleOnFocus, handleOnBlur, handleOnCancel, handleOnUpdate }: IChangePasswordProps) => {
    return (
        <Box bg="white" p="30px">
            <Container maxW={"40%"} gap={8}>
                <FormControl isInvalid={state.currentPasswordError ? true : false}>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            type={state.showCurrentPassword ? "text" : "password"}
                            id="currentPassword"
                            name="currentPassword"
                            value={state.currentPassword}
                            onChange={handleOnChange}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                        />
                        <InputRightElement
                            pt="6px"
                            cursor={"pointer"}
                            onClick={handleShowCurrentPassword}
                        >
                            {state.showCurrentPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </InputRightElement>
                    </InputGroup>
                    {state.currentPasswordError && <FormErrorMessage fontSize={"12px"}>{state.currentPasswordError}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={state.newPasswordError ? true : false} mt="20px">
                    <FormLabel>New Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            type={state.showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={state.newPassword}
                            onChange={handleOnChange}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                        />
                        <InputRightElement
                            pt="6px"
                            cursor={"pointer"}
                            onClick={handleShowNewPassword}
                        >
                            {state.showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </InputRightElement>
                    </InputGroup>
                    {state.newPasswordError && <FormErrorMessage fontSize={"12px"}>{state.newPasswordError}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={state.confirmPasswordError ? true : false} my="20px">
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            type={state.showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={state.confirmPassword}
                            onChange={handleOnChange}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                        />
                        <InputRightElement
                            pt="6px"
                            cursor={"pointer"}
                            onClick={handleShowConfirmPassword}
                        >
                            {state.showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </InputRightElement>
                    </InputGroup>
                    {state.confirmPasswordError && <FormErrorMessage fontSize={"12px"}>{state.confirmPasswordError}</FormErrorMessage>}
                </FormControl>
            </Container>
            <Box mt={"15px"} display={"flex"} justifyContent="flex-end">
                <Box mr={"30px"}>
                    <Button variant="outline" colorScheme={"#5E8E22"} p="16px 24px" color="#eeeee" _hover={{ bg: "#5E8E22", color: "#fff" }} _active={{ bg: "#5E8E22", color: "#fff" }} disabled={isLoading} onClick={handleOnCancel}>{"Cancel"}</Button>
                </Box>
                <Box>
                    <Button bg={"#5E8E22"} p="16px 24px" color="#fff" _hover={{ bg: "#5E8E22", color: "#fff" }} _active={{ bg: "#5E8E22", color: "#fff" }} disabled={!isFormValid() || isLoading} isLoading={isLoading} onClick={handleOnUpdate}>{"Update Password"}</Button>
                </Box>
            </Box>
        </Box >
    );
}

export default ChangePassword;