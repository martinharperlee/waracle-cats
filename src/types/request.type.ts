export type RequestMethod = 'DELETE' | 'GET' | 'POST';

export interface RequestParams {
    resource: string;
    method: RequestMethod;
    body?: RequestInit['body'];
    headers?: RequestInit['headers'];
}
