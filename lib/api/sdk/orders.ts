import { IAddOrderReqBody } from '../interfaces';
import { request } from '../request';
import { ADD_ORDER, GET_ORDER_BY_SESSION_ID, LIST_ORDER, MAKE_ORDER_PAYMENT, VIEW_ORDER } from '../routing/route';

export const addOrderApi = async (addOrderReqBody: IAddOrderReqBody) => {
    try {
        const { data: response } = await request.post(ADD_ORDER, addOrderReqBody);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const listOrdersApi = async () => {
    try {
        const { data: response } = await request.get(LIST_ORDER);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const getOrderByIdApi = async (orderId: string) => {
    try {
        const { data: response } = await request.get(`${VIEW_ORDER}/${orderId}`);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const getOrderBySessionIdApi = async (sessionId: string) => {
    try {
        const { data: response } = await request.get(`${GET_ORDER_BY_SESSION_ID}/${sessionId}`);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const makeOrderPaymentApi = async (orderId: string) => {
    try {
        const { data: response } = await request.post(`${MAKE_ORDER_PAYMENT}/${orderId}`);
        return response;
    } catch (error: any) {
        return error;
    }
}
