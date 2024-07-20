import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setLoading(false);
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            try {
                const res = await fetch('https://localhost:3003/api/token/verify', {
                    headers: headers,
                    method: 'GET'
                });

                const data = await res.json();
                setAuth(data);
            } catch (error) {
                console.error('Ошибка при проверке токена', error);
            }
            setLoading(false);
        };

        // verifyToken();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        setAuth({ authorization: true, name: 'Иван', role: 'courier' });
    }, []);

    return loading ? <div>Загрузка</div> : auth.authorization && auth.role === location.pathname.replace('/', '') ? <Outlet /> : <Navigate to='login' />
}

export default PrivateRoute;

// const verifyToken = async () => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//         setLoading(false);
//         return;
//     }

//     const headers = {
//         'Authorization': `Bearer ${token}`
//     };

//     try {
//         const res = await fetch('https://localhost:3003/api/token/verify', {
//             headers: headers,
//             method: 'GET'
//         });

//         const data = await res.json();
//         setAuth(data); // Устанавливаем данные аутентификации
//     } catch (error) {
//         console.error('Ошибка при проверке токена', error);
//     }
//     setLoading(false);
// };
