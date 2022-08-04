import * as request from './requester.js'
import * as authService from './authService.js'


const baseURL = 'http://localhost:3030/users'


export const login = (email, password) => {

    return request.post(`${baseURL}/login`, { email, password })
        .then(user => {
            authService.saveUser(user);

            return user;
        })
} 

export const register = (email, password) => {

    return request.post(`${baseURL}/register`, { email, password })
        .then(user => {
            authService.saveUser(user);

            return user;
        })
}

export const logout = () => {
    
    return fetch(`${baseURL}/logout`, {headers: {'X-Authorization': authService.getToken()}})
        .then(() => {
            authService.deleteUser();
        })
}