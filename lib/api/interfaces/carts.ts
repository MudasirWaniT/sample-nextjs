export interface ICartItemData {
    ingredientId: string;
    priceId: string;
    quantity: number;
}
export interface IAddCartItemReq {
    cartItem: ICartItemData;
}
export interface IEditCartItemReq {
    cartItemId: string;
    newQuantity: number;
}