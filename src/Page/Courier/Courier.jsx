import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import Application from "../../components/Application/Application";
import style from './Courier.module.scss';
import { useEffect, useState } from 'react';
import { sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import { useOutletContext } from 'react-router';
import { BASE_URL } from '../../utils/api/URL';

function Courier() {
    const { auth } = useOutletContext();
    const [aplication, setAplication] = useState([]);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        const getGoods = async () => {
            const data = await sendVerificationTokenRequest(BASE_URL + '/order/loading');
            if (data && data.goods) {
                setAplication(data.goods);
            }
        }
        getGoods();
    }, []);

    return (
        <div className={style.wrapper}>
            <Menu name={auth.name} />
            <main className={style.customer}>
                <div className={style.container}>
                    <div className={style.body}>
                        <p>Добро пожаловать {auth.name}</p>
                        <div className={style.applications}>
                            {aplication && aplication.length > 0 ? aplication.map(el => {
                                return (<Application key={el.id} id={el.id} role={auth.role} name={el.name} totalCost={el.price_with_commission} img={el.img} weigth={el.weigth_item} cost={el.cost_item} quantity={el.quantity_item} origin={el.origin} destination={el.destination} description={el.description} />)
                            })
                                : <div className={style.notification}>{notification}</div>}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Courier;