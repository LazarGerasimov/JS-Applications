import * as request from './requester.js';


// /data/albums?sortBy=_createdOn%20desc&distinct=name

const baseURL = `http://localhost:3030/data/albums`;

export const getAll = () => request.get(`${baseURL}?sortBy=_createdOn%20desc&distinct=name`);

export const getOne = (albumId) => request.get(`${baseURL}/${albumId}`);

export const create = (albumData) => request.post(baseURL, albumData); 

export const edit = (albumId, albumData) => request.put(`${baseURL}/${albumId}`, albumData);

export const remove = (albumId) => request.del(`${baseURL}/${albumId}`);


export const search = (searchText) => {

    const query = encodeURIComponent(`name LIKE "${searchText}"`)

    return request.get(`${baseURL}?where=${query}`);
}