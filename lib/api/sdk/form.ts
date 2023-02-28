import { INDAFormRegisterReq } from '../interfaces';
import { request } from '../request';
import { SIGNUP_NDA_FORM, DELETE_NDA_FORM, GET_NDA_PROFILE } from '../routing/route';

export const ndaFormRegisterApi = async (ndaData: INDAFormRegisterReq) => {
    try {
        const { data: response } = await request.post(SIGNUP_NDA_FORM, ndaData);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const ndaFormDeleteApi = async (id: string) => {
    try {
        const { data: response } = await request.delete(`${DELETE_NDA_FORM}/${id}`);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const getNdaProfileApi = async () => {
    try {
        const { data: response } = await request.get(GET_NDA_PROFILE);
        return response;
    } catch (error: any) {
        return error;
    }
}
