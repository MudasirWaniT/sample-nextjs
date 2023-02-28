const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = (uri: string) => `${BASE_URL}${uri}`;
/***** Auth Api Routes *******/
export const LOGIN = URL('/auth/login');
export const CASE_STUDIES = URL('/auth/case-studies');
export const LOGOUT = URL('/auth/logout');
export const FORGOT_PASSWORD = URL('/auth/forgot-password');
export const VERIFY_TOKEN = URL('/auth/verify-token');
export const RESET_PASSWORD = URL('/auth/reset-password');
export const EDIT_PROFILE = URL('/auth/profile');
export const EDIT_PROFILE_IMAGE = URL('/auth/profile-image');
export const CHANGE_PASSWORD = URL('/auth/change-password');
export const GET_PROFILE = URL('/auth/get-user');

/***** Form Api Routes *****/
export const SIGNUP_NDA_FORM = URL('/forms/nda-details/add');
export const DELETE_NDA_FORM = URL('/forms/nda-details/delete');
export const GET_NDA_PROFILE = URL('/forms/nda/profile')

/***** Ingredient Api Routes *******/
export const LIST_INGREDIENT = URL('/ingredients/list');
export const VIEW_INGREDIENT = URL('/ingredients/detail');

/******* Cart Api Routes *******/
export const ADD_CART_ITEM = URL('/carts/add');
export const LIST_CART_ITEM = URL('/carts/list');
export const EDIT_CART_ITEM = URL('/carts/edit');
export const DELETE_CART_ITEM = URL('/carts/delete');
export const MERGE_GUEST_USER_CART = URL('/carts/merge');

/***** Order Api Routes ******/
export const ADD_ORDER = URL('/orders/add');
export const LIST_ORDER = URL('/orders/list');
export const VIEW_ORDER = URL('/orders/view');
export const GET_ORDER_BY_SESSION_ID = URL('/orders/details');
export const MAKE_ORDER_PAYMENT = URL('/orders/make-payment');