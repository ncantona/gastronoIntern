import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.178.22:8080/api/',
});

export const apiNoJWT = axios.create({
    baseURL: 'http://192.168.178.22:8080/api/',
});

export const apiAuth = axios.create({
    baseURL: 'http://192.168.178.22:8080/api/auth/',
});