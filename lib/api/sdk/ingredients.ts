import { IListIngredientApiReq } from '../interfaces';
import { request } from '../request';
import { LIST_INGREDIENT, VIEW_INGREDIENT } from '../routing/route';

export const listIngredientApi = async (listIngredientQueryParams: IListIngredientApiReq) => {
    try {
        const { keyword, page, limit, category, type } = listIngredientQueryParams
        const { data: response } = await request.get(`${LIST_INGREDIENT}/?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ""}${category ? `&category=${category}` : ""}${type ? `&type=${type}` : ""}`);
        return response;
    } catch (error: any) {
        return error;
    }
}

export const getIngredientDetailApi = async (id: string) => {
    try {
        const { data: response } = await request.get(`${VIEW_INGREDIENT}/${id}`);
        return response;
    } catch (error: any) {
        return error;
    }
}