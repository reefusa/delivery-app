import React, { useEffect, useState } from 'react'
import style from './OrderCourierWork.module.scss';
import { useOutletContext } from 'react-router';
import { sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import Application from '../../components/Application/Application';
import Footer from '../../components/Footer/Footer';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../utils/api/URL';

export default function OrderCourierWork() {
    const { auth } = useOutletContext();
    const [aplication, setAplication] = useState([]);
    const { t } = useTranslation();

    const [notification, setNotification] = useState(false);

    useEffect(() => {
        const getGoods = async () => {
            const data = await sendVerificationTokenRequest(BASE_URL + '/order/loading/courier/work');
            if (data) {
                setAplication(data.item);
            }
        }
        getGoods();
    }, []);
    return (
        <div className={style.wrapper}>
            <NavigationMenu page={t('components.NavigationMenu.OrderCourierWork')} to={`/${auth.role}`} />
            <main className={style.order__work}>
                <div className={style.container}>
                    {aplication && aplication.length > 0 ? aplication.map(el => {
                        return (<Application key={el.id} id={el.id} role={auth.role} name={el.name} totalCost={el.price_with_commission} img={el.img} weigth={el.weigth_item} cost={el.cost_item} quantity={el.quantity_item} origin={el.origin} destination={el.destination} description={el.description} />)
                    })
                        : <div className={style.notification}>{notification}</div>}
                </div>
            </main>
            <Footer />
        </div>
    )
}
