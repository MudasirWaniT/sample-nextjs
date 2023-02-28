import { request } from '../request';
import { LOGIN, LOGOUT, FORGOT_PASSWORD, RESET_PASSWORD, VERIFY_TOKEN, EDIT_PROFILE, EDIT_PROFILE_IMAGE, CHANGE_PASSWORD, GET_PROFILE } from '../routing/route';
import { ILoginApiReq, IForgotPasswordApiReq, IVerifyTokenApiReq, IResetPasswordApiReq, IEditProfileApiReq, IChangePasswordReq } from '../interfaces';

export const loginApi = async (loginData: ILoginApiReq) => {
    try {
        const { data: response } = await request.post(LOGIN, loginData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const logoutApi = async () => {
    try {
        const { data: response } = await request.delete(LOGOUT);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const forgotPasswordApi = async (bodyData: IForgotPasswordApiReq) => {
    try {
        const { data: response } = await request.post(FORGOT_PASSWORD, bodyData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const verifyTokenApi = async (bodyData: IVerifyTokenApiReq) => {
    try {
        const { data: response } = await request.post(VERIFY_TOKEN, bodyData);
        return response;
    } catch (error) {
        return error;
    }
}

export const resetPasswordApi = async (bodyData: IResetPasswordApiReq) => {
    try {
        const { data: response } = await request.post(RESET_PASSWORD, bodyData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const editProfileApi = async (bodyData: IEditProfileApiReq) => {
    try {
        const { data: response } = await request.put(EDIT_PROFILE, bodyData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const editProfileImageApi = async (bodyData: FormData) => {
    try {
        const { data: response } = await request.put(EDIT_PROFILE_IMAGE, bodyData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const changePasswordApi = async (bodyData: IChangePasswordReq) => {
    try {
        const { data: response } = await request.put(CHANGE_PASSWORD, bodyData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const getUserProfileApi = async () => {
    try {
        const { data: response } = await request.get(GET_PROFILE);
        return response;
    } catch (error: any) {
        return error;
    }
}