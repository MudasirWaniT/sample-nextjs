import { Box, Button, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Image, Input } from "@chakra-ui/react";
import React from "react";
import { IEditProfileState } from "../../pages/profile";
import { S3UserImage } from "../image/S3UserImage";

interface IEditProfileProps {
    userId: string;
    isLoading: boolean;
    state: IEditProfileState;
    isFormValid: () => {};
    handleUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleOnBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleOnCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleOnUpdate: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const EditProfile = ({ userId, isLoading, state, isFormValid, handleUploadImage, handleOnChange, handleOnFocus, handleOnBlur, handleOnCancel, handleOnUpdate }: IEditProfileProps) => {
    const dummyProfileImage = '/images/profile_image.jpg';
    return (
        <Box bg={"white"} p="30px">
            <Grid gridTemplateColumns={{ base: "01fr", md: "250px 1fr" }}>
                <GridItem>
                    {
                        state.image ?
                            <>
                                {
                                    (typeof (state.image) === "string") ?
                                        <>
                                            <S3UserImage
                                                borderRadius='full'
                                                boxSize='150px'
                                                alt='userImg'
                                                objectFit='cover'
                                                id={userId}
                                                image={state.image}
                                            />
                                        </>
                                        :
                                        <>
                                            <Image borderRadius='full'
                                                boxSize='150px'
                                                alt='userImg'
                                                objectFit='cover'
                                                src={state.image ? URL.createObjectURL(state.image) : ""} />
                                        </>
                                }
                            </>
                            :
                            <>
                                <Image
                                    borderRadius='full'
                                    boxSize='150px'
                                    alt='userImg'
                                    objectFit='cover'
                                    src={dummyProfileImage}
                                />
                            </>
                    }
                    <FormControl id="profileImg">
                        <Input id="uploadProfile" type={"file"} name="file" accept="image/*" display="none" onChange={handleUploadImage} />
                        <FormLabel color={"#5E8E22"} htmlFor="uploadProfile" m="25px" cursor={"pointer"} fontSize="18px" lineHeight={"24px"} fontWeight="500">Change Photo</FormLabel>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <Grid templateColumns={"repeat(2, 1fr)"} gap={8}>
                        <FormControl id="firstNameProfile" isInvalid={state.firstNameError ? true : false}>
                            <FormLabel htmlFor="firstNameProfile">First Name</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                disabled
                                id="firstNameProfile"
                                type={"text"}
                                name="firstName"
                                value={state.firstName}
                            />
                            {state.firstNameError && <FormErrorMessage>{state.firstNameError}</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="lastNameProfile" isInvalid={state.lastNameError ? true : false}>
                            <FormLabel htmlFor="lastNameProfile">Last Name</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                disabled
                                id="lastNameProfile"
                                type={"text"}
                                name="lastName"
                                value={state.lastName}
                            />
                            {state.lastNameError && <FormErrorMessage>{state.lastNameError}</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="emailProfile" isInvalid={state.emailError ? true : false}>
                            <FormLabel htmlFor="emailProfile">Email Address</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                id="emailProfile"
                                disabled
                                type={"email"}
                                name="email"
                                value={state.email}
                            />
                            {state.emailError && <FormErrorMessage>{state.emailError}</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="companyNameProfile">
                            <FormLabel htmlFor="companyNameProfile">Company Name</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                disabled
                                id="companyNameProfile"
                                type={"text"}
                                name="companyName"
                                value={state.companyName}
                            />
                        </FormControl>
                        <FormControl id="companyRegIdProfile">
                            <FormLabel htmlFor="companyRegIdProfile">Company Registration Id</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                disabled
                                id="companyRegIdProfile"
                                type={"text"}
                                name="companyRegistrationId"
                                value={state.companyRegistrationId}
                            />
                        </FormControl>
                        <FormControl id="signatoryNameProfile">
                            <FormLabel htmlFor="signatoryNameProfile">Signatory Name</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                disabled
                                id="signatoryNameProfile"
                                type={"text"}
                                name="signatoryName"
                                value={state.signatoryName}
                            />
                        </FormControl>
                        <FormControl id="addressProfile" isInvalid={state.addressError ? true : false}>
                            <FormLabel htmlFor="addressProfile">Address</FormLabel>
                            <Input
                                _disabled={{ color: "#eeeee" }}
                                disabled
                                id="addressProfile"
                                type={"text"}
                                name="address"
                                value={state.address}
                            />
                            {state.addressError && <FormErrorMessage>{state.addressError}</FormErrorMessage>}
                        </FormControl>
                    </Grid>
                </GridItem>
            </Grid>
            <Box mt={"15px"} display={"flex"} justifyContent="flex-end">
                <Box mr={"15px"}>
                    <Button variant="outline" colorScheme={"#5E8E22"} p="16px 24px" color="#eeeee" _hover={{ bg: "#5E8E22", color: "#fff" }} _active={{ bg: "#5E8E22", color: "#fff" }} disabled={isLoading} onClick={handleOnCancel}>{"Cancel"}</Button>
                </Box>
                <Box>
                    <Button bg={"#5E8E22"} p="16px 24px" color="#fff" _hover={{ bg: "#5E8E22", color: "#fff" }} _active={{ bg: "#5E8E22", color: "#fff" }} disabled={!isFormValid() || isLoading} isLoading={isLoading} onClick={handleOnUpdate}>{"Update"}</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default EditProfile;