import { RequestParams } from '../types/request.type';
import { RequestMethods } from '../enums/requestMethods';

const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL || '';
const apiKey: string = process.env.REACT_APP_API_KEY || '';
const jsonHeaders = { 'Content-Type': 'application/json' };

const baseFetchRequest = ({ resource, method, body, headers }: RequestParams) =>
    fetch(`${apiBaseUrl}/${resource}`, {
        method,
        headers: {
            'x-api-key': apiKey,
            ...headers,
        },
        body,
    }).then((response) => response.json());

export const getRequest = (resource: string) =>
    baseFetchRequest({ resource, method: RequestMethods.GET });

export const postRequest = (resource: string, body: string) =>
    baseFetchRequest({
        resource,
        body,
        method: RequestMethods.POST,
        headers: jsonHeaders,
    });

export const postDataRequest = (resource: string, body: FormData) =>
    baseFetchRequest({
        resource,
        body,
        method: RequestMethods.POST,
    });

export const deleteRequest = (resource: string) =>
    baseFetchRequest({
        resource,
        method: RequestMethods.DELETE,
    });
