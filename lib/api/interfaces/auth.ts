export interface ILoginApiReq {
    email: string;
    password: string;
}

export interface IForgotPasswordApiReq {
    email: string;
}

export interface IVerifyTokenApiReq {
    token: string;
}

export interface IResetPasswordApiReq {
    token: string;
    newPassword: string;
}

export interface IEditProfileApiReq {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
}
export interface IChangePasswordReq {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}