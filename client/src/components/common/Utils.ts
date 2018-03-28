import { Config } from './Config';
import { ServerResponse } from './Interfaces';

export const isBrowser = !!((typeof window !== 'undefined' && window.document && window.document.createElement));

export function buildRouteUrl(route: string, ...params: string[]): string {
    return `${route}/:${params.reduce((res, param) => res = res + '/:' + param)}`;
}

export function getRequest(route: string, params?: any): Promise<ServerResponse> {
    let path = `${Config.hostUrl}/${route}`;

    if (params) {
        path += Object.keys(params)
                    .filter(key => params[key] !== '' && params[key] !== null)
                    .map((key, index) => {
                        const startWith = index === 0 ? '?' : '&';
                        return startWith + key + '=' + params[key];
                    }).join('');
    }

    const options: RequestInit = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(path, options).then(res => res.json());
}

export function postRequest(route: string, body: any): Promise<ServerResponse> {
    const path = `${Config.hostUrl}/${route}`;

    const options: RequestInit = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return fetch(path, options).then(res => res.json());
}

export function putRequest(route: string, id: string, body: any): Promise<ServerResponse> {
    const path = `${Config.hostUrl}/${route}/${id}`;

    const options: RequestInit = {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return fetch(path, options).then(res => res.json());
}

export function deleteRequest(route: string, id: string): Promise<ServerResponse> {
    const path = `${Config.hostUrl}/${route}`;

    const options: RequestInit = {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    };

    return fetch(path, options).then(res => res.json());
}

export function uploadRequest(route: string, data: any): Promise<ServerResponse> {
    const path = `${Config.hostUrl}/${route}`;

    let formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    const options: RequestInit = {
        credentials: 'include',
        method: 'POST',
        headers: {},
        body: formData
    };

    return fetch(path, options).then(res => res.json());
}
