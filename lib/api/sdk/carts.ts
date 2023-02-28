import { IAddCartItemReq, IEditCartItemReq } from '../interfaces';
import { request } from '../request';
import { ADD_CART_ITEM, DELETE_CART_ITEM, EDIT_CART_ITEM, LIST_CART_ITEM, MERGE_GUEST_USER_CART } from '../routing/route';

export const addCartItemApi = async (addCartItemReq: IAddCartItemReq) => {
    try {
        const { data: response } = await request.post(ADD_CART_ITEM, addCartItemReq);
        return response;
    } catch (error: any) {
        return error;
    }
}
export const listCartItemApi = async () => {
    try {
        const { data: response } = await request.get(LIST_CART_ITEM);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const editCartItemApi = async (editCartItemReq: IEditCartItemReq) => {
    try {
        const { cartItemId, newQuantity } = editCartItemReq;
        const { data: response } = await request.put(`${EDIT_CART_ITEM}/${cartItemId}`, { newQuantity });
        return response;
    } catch (error: any) {
        return error;
    }
}

export const deleteCartItemApi = async (cartItemId: string) => {
    try {
        const { data: response } = await request.delete(`${DELETE_CART_ITEM}/${cartItemId}`);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const mergeGuestUserCartItemApi = async (guId: string) => {
    try {
        const { data: response } = await request.post(`${MERGE_GUEST_USER_CART}/${guId}`);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const deleteCartApi = async () => {
    try {
        const { data: response } = await request.delete(DELETE_CART_ITEM);
        return response;
    } catch (error: any) {
        return error;
    }
}