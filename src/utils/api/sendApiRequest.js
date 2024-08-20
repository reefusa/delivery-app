import { BASE_URL } from "./URL";

export const sendApiRequest = async (URL, method, headers, body, check, e) => {
    e.preventDefault();

    if (check) {
        try {
            const res = await fetch(URL, {
                'method': `${method}`,
                headers: {
                    'Content-Type': `${headers}`
                },
                'body': JSON.stringify(body)
            });

            return await res.json();
        } catch (error) {
            console.error('Ошибка при проверке токена', error);
        }
    }
}

export const sendVerificationTokenRequest = async (URL) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        try {
            const res = await fetch(URL, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return await res.json();
        } catch (error) {
            console.error('Ошибка при отправке запроса ', error);
        }
    }
}

export const sendGetRequest = async (URL, method, headers) => {
    try {
        const res = await fetch(URL, {
            method: method,
            ...(headers && { headers })
        });
        return await res.json();
    } catch (error) {
        console.error('Ошибка при отправке запроса ', error);
    }
}

export const sendPostRequest = async (URL, method, headers, body) => {
    try {
        const res = await fetch(URL, {
            'method': method,
            'headers': headers,
            'body': JSON.stringify(body)
        });

        return await res.json();
    } catch (error) {
        console.error('Ошибка при отправке запроса ', error);
    }
}

export const sendPostRequestForm = async (URL, method, body, headers) => {
    try {
        const res = await fetch(URL, {
            'method': method,
            'body': body,
            ...(headers && { headers })
        });

        return await res.json();
    } catch (error) {
        console.error('Ошибка при отправке запроса ', error);
    }
}

export const reqGetFile = async (type, fileName) => {
    const URL = BASE_URL + `/account/uploads/${type}/${fileName}`;
    try {
        const res = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        if (!res.ok) throw new Error('Ошибка при получении файла');
        const blob = await res.blob();
        return blob;
    } catch (error) {
        console.error('Ошибка: ', error);
    }
};