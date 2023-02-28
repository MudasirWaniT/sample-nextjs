export interface INDAFormRegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyRegistrationId: string;
    address: string;
    signatoryName: string;
}

export interface INDAFormRegisterReq {
    userData: INDAFormRegisterUserData;
    hasAcceptedTerms: boolean;
}