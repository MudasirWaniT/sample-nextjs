import router from 'next/router';
import { deleteCartApi, logoutApi } from '../../api/sdk';
import { GuestUser, Tokens, User } from '../../storage/index';
import { INDEX_PAGE } from './routeConstants';

export const onLogout = async () => {
    await logoutApi();
    Tokens.removeLocalData();
    User.removeSignupUserDetails();
    GuestUser.removeGuestUserDetails();
    router.push(INDEX_PAGE);
    return true;
};

export const getToken = () => Tokens.getToken();
export const getUserDetails = () => User.getUserDetails();


export const isLoggedIn = () => {
    if (getToken() && getUserDetails()) {
        return true;
    } else {
        Tokens.removeLocalData();
        return false
    }
};