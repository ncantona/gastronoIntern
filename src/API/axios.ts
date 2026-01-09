import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export const apiAuth = axios.create({
    baseURL: 'http://localhost:8080/api/auth/',
});