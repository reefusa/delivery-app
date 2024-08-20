import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BASE_URL } from "../api/URL";

const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const location = useLocation();


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(BASE_URL + '/token/verification', {
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'GET'
                });

                if (res.status === 403) {
                    const refreshedData = await refreshAccessToken(refreshToken);
                    if (refreshedData) {
                        localStorage.setItem('accessToken', refreshedData.accessToken);
                        setAuth(jwtDecode(refreshedData.accessToken));
                    }
                } else {
                    const data = await res.json();
                    setAuth(data.user);
                }
            } catch (error) {
                console.log('При отправке токена произошла ошибка ' + error);
            } finally {
                setLoading(false);
            }
        };

        const refreshAccessToken = async (refreshToken) => {
            try {
                const res = await fetch(BASE_URL + '/token/update', {
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'body': JSON.stringify({ 'token': refreshToken }),
                    'method': 'POST'
                });

                if (!res.ok) {
                    throw new Error('Failed to refresh token');
                }

                return await res.json();
            } catch (error) {
                console.log('Ошибка при обновлении токена: ' + error);
                return null;
            }
        };

        const autoRenewalToken = setInterval(async () => {
            const refreshedData = await refreshAccessToken(refreshToken);
            if (refreshedData) {
                localStorage.setItem('accessToken', refreshedData.accessToken);
                setAuth(jwtDecode(refreshedData.accessToken));
                console.log('Обновился');
            }
        }, 10 * 60 * 1000);

        verifyToken();
        return () => clearInterval(autoRenewalToken);
    }, []);

    let accessSpecificRole;

    if (location.pathname === '/customer' || location.pathname === '/courier') {
        accessSpecificRole = location.pathname.replace('/', '');
    }

    const courierOrderRegex = /^\/courier\/order\/\d+$/;
    const customerOrderRegex = /^\/customer\/order\/\d+$/;
    if (courierOrderRegex.test(location.pathname) || customerOrderRegex.test(location.pathname)) {
        const role = location.pathname.split('/');
        accessSpecificRole = role[1];
    }
    if (location.pathname === '/customer/order/create') {
        const role = location.pathname.split('/');
        accessSpecificRole = role[1];
    }
    if (location.pathname === '/account') {
        accessSpecificRole = auth.role;
    } if (location.pathname === '/courier/order/work') {
        accessSpecificRole = auth.role;
    } if (location.pathname === '/admin') {
        accessSpecificRole = auth.role;
    } if (location.pathname === '/admin/dispute') {
        const role = location.pathname.split('/');
        accessSpecificRole = role[1];
    }

    return loading ? <div>Загрузка</div> : auth && auth.id && auth.role === accessSpecificRole ? <Outlet context={{ auth }} /> : <Navigate to='login' />
}

export default PrivateRoute;