import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import style from './Customer.module.scss';
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import { Button } from "../../ui/Button";
import { sendVerificationTokenRequest } from "../../utils/api/sendApiRequest";
import Application from "../../components/Application/Application";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../utils/api/URL";

function Customer() {
    const { auth } = useOutletContext();
    const [goods, setGoods] = useState([]);
    const [notification, setNotification] = useState(false);
    const { t } = useTranslation();

    useState(() => {
        const loadingGoods = async () => {
            const data = await sendVerificationTokenRequest(BASE_URL + '/order/loading');
            if (data && data.goods) {
                setGoods(data.goods);
                console.log(data.goods);
            } else if (data && !data.goods) {
                setNotification(t('page.Customer.notification.empty'));
            } else if (data && data.error) {
                setNotification(t('page.Customer.notification.error'));
            }
        }
        loadingGoods();
    }, []);

    return (
        <div className={style.wrapper}>
            <Menu name={auth.name} />
            <main className={style.customer}>
                <div className={style.container}>
                    <p>{t('page.Customer.title', { name: auth.name })}</p>
                    <div className={style.body}>
                        {goods && goods.length > 0 ? goods.map(el => {
                            return (<Application key={el.id} id={el.id} role={auth.role} name={el.name} totalCost={el.price_with_commission} img={el.img} weigth={el.weigth_item} cost={el.cost_item} quantity={el.quantity_item} origin={el.origin} destination={el.destination} description={el.description} />)
                        })
                            : <div className={style.notification}>{notification}</div>}
                        <Link to='/customer/order/create'>
                            <Button styles={{
                                display: 'block', margin: '30px auto 0'
                            }} text={t('button.Customer.addGoods')} />
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Customer;