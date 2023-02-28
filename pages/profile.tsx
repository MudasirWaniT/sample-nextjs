import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import ChangePassword from "../components/profile/ChangePassword";
import EditProfile from "../components/profile/EditProfile";
import { changePasswordApi, editProfileImageApi } from "../lib/api/sdk";
import { useUserProfileDetails } from "../lib/app/layout/private/Header";
import { responseMessage, validateEmail, validateField, validateFileFormat, validateFileSize } from "../lib/app/utils";

interface ILoggedInUserState {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IEditProfileState {
    image: File | string | null;
    imageError: string;
    firstName: string;
    firstNameError: string;
    lastName: string;
    lastNameError: string;
    email: string;
    emailError: string;
    phone: string;
    phoneError: string;
    address: string;
    addressError: string;
    companyName: string;
    companyRegistrationId: string;
    signatoryName: string;
}

export interface IChangePasswordState {
    showCurrentPassword: boolean;
    showNewPassword: boolean;
    showConfirmPassword: boolean;
    currentPassword: string;
    currentPasswordError: string;
    newPassword: string;
    newPasswordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
}

const Profile = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const loggedInUserInitialState: ILoggedInUserState = {
        id: "",
        avatar: "",
        firstName: "",
        lastName: "",
        email: "",
    }
    const editProfileInitialState: IEditProfileState = {
        image: null,
        imageError: "",
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        phone: "",
        phoneError: "",
        address: "",
        addressError: "",
        companyName: "",
        companyRegistrationId: "",
        signatoryName: ""
    }
    const changePasswordInitialState: IChangePasswordState = {
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        currentPassword: "",
        currentPasswordError: "",
        newPassword: "",
        newPasswordError: "",
        confirmPassword: "",
        confirmPasswordError: ""
    }
    const [loggedInUserState, setLoggedInUserState] = useState<ILoggedInUserState>(loggedInUserInitialState);
    const [editProfileState, setEditProfileState] = useState<IEditProfileState>(editProfileInitialState);
    const { image, imageError, firstName, firstNameError, lastName, lastNameError, email, emailError, phone, phoneError, address, addressError } = editProfileState;
    const [changePasswordState, setChangePasswordState] = useState<IChangePasswordState>(changePasswordInitialState);
    const { showCurrentPassword, showNewPassword, showConfirmPassword, currentPassword, currentPasswordError, newPassword, newPasswordError, confirmPassword, confirmPasswordError } = changePasswordState;
    const { data } = useUserProfileDetails();
    useEffect(() => {
        if (data && data.status && data.data) {
            const userData = data.data;
            setEditProfileState((prevState) => ({
                ...prevState,
                image: userData.avatar || "",
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                companyName: userData.companyName || "",
                companyRegistrationId: userData.companyRegistrationId || "",
                signatoryName: userData.signatoryName || "",
                address: userData.address || ""
            }));
            setLoggedInUserState({
                id: userData.id || "",
                avatar: userData.avatar || "",
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || ""
            })
        }
    }, [data])

    const handleEditProfileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.replace(/\s\s+/g, ' ');
        setEditProfileState((prevState) => ({ ...prevState, [name]: trimValue }));
    }

    const handleImageOnUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const file: File = files[0];
            const isImage: boolean = file ? file.type.includes("image") : false;
            if (files!.length === 1 && isImage) {
                const contentDataType: string = isImage ? "image" : "";
                const allowedImageExtensions = /(\.(jpg|jpeg|png|tif))$/i;
                if (
                    contentDataType === "image" &&
                    !validateFileFormat(file.name, allowedImageExtensions)
                ) {
                    return toast({
                        title: "File format is not supported. Please select jpg/jpeg/png/tif format.",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                    });
                }
                const isFileSizeValid: boolean = validateFileSize(file.size, 20);
                if (contentDataType === "image" && !isFileSizeValid) {
                    return toast({
                        title: "Your image exceeds the maximum limit of 20 MB.",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                    });
                } else {
                    setEditProfileState((prevState) => ({
                        ...prevState, image: file
                    }));
                }
            }
        }
        event.target.value = "";
    }

    const checkEditProfileValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.trim();
        if (name === "firstName" && trimValue.length === 0) {
            setEditProfileState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.required`),
            }));
        } else if (name === "email" && !validateEmail(trimValue)) {
            setEditProfileState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if ((name === "firstName" || name === "lastName") && !validateField("alphabetics", trimValue)) {
            setEditProfileState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if ((name === "address") && !validateField("string", trimValue)) {
            setEditProfileState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        }
    };

    const resetEditProfileErrorMessage = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setEditProfileState((prevState) => ({ ...prevState, [`${name}Error`]: "" }));
    };

    const isImageFormValid = () => {
        return (
            !imageError &&
            [
                image !== loggedInUserState.avatar,
            ].some(Boolean)
        );
    }

    const isEditProfileFormValid = () => {
        return (
            !imageError &&
            [
                image !== loggedInUserState.avatar,
            ].some(Boolean)
        );
    }
    const handleEditProfileOnCancel = () => {
        setEditProfileState(editProfileInitialState);
    }

    const { mutate: mutateFileUpload, isLoading: isUpdatingImage } = useMutation(editProfileImageApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
                queryClient.invalidateQueries(['getUserDetail']);
            } else {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    duration: 5000,
                    status: "error",
                });
            }
        },
        onError: () => {
            toast({
                title: "Something went wrong",
                position: "top-right",
                isClosable: true,
                duration: 5000,
                status: "error",
            });
        },
    })

    const handleEditProfileOnUpdate = () => {
        let formData = new FormData();
        if (isEditProfileFormValid() && isImageFormValid()) {
            if (editProfileState.image) {
                formData.append("profile_image", editProfileState.image);
                mutateFileUpload(formData);
            }
        }
    }

    const handleChangePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.replace(/\s\s+/g, ' ');
        setChangePasswordState((prevState) => ({ ...prevState, [name]: trimValue }));
    }

    const checkChangePasswordValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.trim();
        if (trimValue.length === 0) {
            setChangePasswordState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.required`),
            }));
        } else if (name === "newPassword" && !validateField("password", trimValue)) {
            setChangePasswordState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if (name === "confirmPassword" && !validateField("password", trimValue)) {
            setChangePasswordState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                setChangePasswordState((prevState) => ({
                    ...prevState,
                    confirmPasswordError: responseMessage("password.matched"),
                }));
            } else {
                setChangePasswordState((prevState) => ({
                    ...prevState,
                    confirmPasswordError: responseMessage(""),
                }));
            }
        }
    };

    const resetChangePasswordErrorMessage = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setChangePasswordState((prevState) => ({ ...prevState, [`${name}Error`]: "" }));
    };

    const isChangePasswordFormValid = () => {
        return (
            !currentPasswordError && !newPasswordError && !confirmPasswordError &&
            [currentPassword, newPassword, confirmPassword].every(
                Boolean
            )
        );
    }
    const handleShowCurrentPassword = () => {
        setChangePasswordState((prevState) => ({ ...prevState, showCurrentPassword: !showCurrentPassword }))
    }
    const handleShowNewPassword = () => {
        setChangePasswordState((prevState) => ({ ...prevState, showNewPassword: !showNewPassword }))
    }
    const handleShowConfirmPassword = () => {
        setChangePasswordState((prevState) => ({ ...prevState, showConfirmPassword: !showConfirmPassword }))
    }

    const handleChangePasswordOnCancel = () => {
        setChangePasswordState(changePasswordInitialState);
    }
    const { mutate: ChangePasswordMutate, isLoading: isUpdatingPassword } = useMutation(changePasswordApi, {
        onSuccess: (data): void | Promise<unknown> => {
            // Invalidate and refetch
            if (data.status) {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    duration: 3000,
                    status: "success",
                });
            } else {
                toast({
                    title: data.message,
                    position: "top-right",
                    isClosable: true,
                    duration: 3000,
                    status: "error",
                });
            }
        },
        onError: () => {
            toast({
                title: "Something went wrong",
                position: "top-right",
                isClosable: true,
                duration: 5000,
                status: "error",
            });
        },
    })
    const handleChangePasswordOnUpdate = () => {
        if (isChangePasswordFormValid()) {
            ChangePasswordMutate({ currentPassword, newPassword, confirmPassword });
        }
    }
    return (
        <>
            <Box>
                <Tabs
                    isFitted
                    colorScheme="green"
                >
                    <TabList mb="15px">
                        <Tab>Edit Profile</Tab>
                        <Tab>Change Password</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EditProfile
                                userId={loggedInUserState.id || ""}
                                isLoading={isUpdatingImage}
                                state={editProfileState}
                                isFormValid={isEditProfileFormValid}
                                handleUploadImage={handleImageOnUpload}
                                handleOnChange={handleEditProfileOnChange}
                                handleOnFocus={resetEditProfileErrorMessage}
                                handleOnBlur={checkEditProfileValidation}
                                handleOnCancel={handleEditProfileOnCancel}
                                handleOnUpdate={handleEditProfileOnUpdate}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ChangePassword
                                isLoading={isUpdatingPassword}
                                state={changePasswordState}
                                handleShowCurrentPassword={handleShowCurrentPassword}
                                handleShowNewPassword={handleShowNewPassword}
                                handleShowConfirmPassword={handleShowConfirmPassword}
                                isFormValid={isChangePasswordFormValid}
                                handleOnChange={handleChangePasswordOnChange}
                                handleOnBlur={checkChangePasswordValidation}
                                handleOnFocus={resetChangePasswordErrorMessage}
                                handleOnCancel={handleChangePasswordOnCancel}
                                handleOnUpdate={handleChangePasswordOnUpdate}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            {(isUpdatingImage || isUpdatingPassword) && <Loader loading={isUpdatingImage || isUpdatingPassword} />}
        </>
    );
}

export default Profile;