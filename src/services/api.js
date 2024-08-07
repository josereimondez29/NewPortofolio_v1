import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/posts/';

export const getPosts = async () => {
    return await axios.get(API_URL);
};

export const getPost = async (id) => {
    return await axios.get(`${API_URL}${id}/`);
};

export const createPost = async (post) => {
    return await axios.post(API_URL, post);
};

export const updatePost = async (id, post) => {
    return await axios.put(`${API_URL}${id}/`, post);
};

export const deletePost = async (id) => {
    return await axios.delete(`${API_URL}${id}/`);
};
