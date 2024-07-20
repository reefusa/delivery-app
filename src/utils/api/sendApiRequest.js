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