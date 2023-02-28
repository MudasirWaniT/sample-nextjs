export function setUserDetails(data: any) {
    localStorage.setItem('typeData', btoa(JSON.stringify(data)));
}

export const getUserDetails = () => {
    const typeData: any = localStorage.getItem('typeData');
    if (typeData === null) {
        return '';
    }
    try {
        const userData: any = JSON.parse(atob(typeData));
        return userData;
    } catch (e) {
        return
    }
}

export function setSignupUserDetails(data: any) {
    localStorage.setItem('glanceData', btoa(JSON.stringify(data)));
}

export const getSignupUserDetails = () => {
    const typeData: any = localStorage.getItem('glanceData');
    if (typeData === null) {
        return '';
    }
    try {
        const userData: any = JSON.parse(atob(typeData));
        return userData;
    } catch (e) {
        return
    }
}

export function removeSignupUserDetails() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('glanceData');
        return true;
    }
}