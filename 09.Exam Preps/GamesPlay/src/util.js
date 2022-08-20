export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    localStorage.removeItem('userData');
}

export function getAccessToken() {
    const user = getUserData();
    if (user) {
        return user.accessToken
    } else {
        return null;
    }
}

export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target))

        handler(ctx, formData, event);
    }
}

export function parseQuerystring(query = '') {                      
    return Object.fromEntries(query
        .split('&')
        .map(kvp => kvp.split('=')))
}