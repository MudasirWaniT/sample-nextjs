export interface IListIngredientApiReq {
    keyword: string | null;
    page: number;
    limit: number;
    category: string | null;
    type: string | null;
}