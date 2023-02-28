export function setGuestUserDetails(data: any) {
    sessionStorage.setItem('guid', btoa(JSON.stringify(data)));
}

export const getGuestUserDetails = () => {
    const typeData: any = sessionStorage.getItem('guid');
    if (typeData === null) {
        return '';
    }
    try {
        const guestData: any = JSON.parse(atob(typeData));
        return guestData;
    } catch (e) {
        return
    }
}

export function removeGuestUserDetails() {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('guid');
        return true;
    }
}

// export function setGuestUserCartDetails(data: any) {
//     sessionStorage.setItem('gucart', btoa(JSON.stringify(data)));
// }

// export const getGuestUserCartDetails = () => {
//     const typeData: any = sessionStorage.getItem('gucart');
//     if (typeData === null) {
//         return '';
//     }
//     try {
//         const guestData: any = JSON.parse(atob(typeData));
//         return guestData;
//     } catch (e) {
//         return
//     }
// }

// export function removeGuestUserCartDetails() {
//     if (typeof window !== 'undefined') {
//         sessionStorage.removeItem('gucart');
//         return true;
//     }
// }