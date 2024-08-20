import style from "./Order.module.scss";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import Chat from "../../components/Chat/Chat";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import { Trans, useTranslation } from "react-i18next";
import { reqGetFile, sendVerificationTokenRequest } from "../../utils/api/sendApiRequest";
import { BASE_URL } from "../../utils/api/URL";

function Order() {
    const { auth } = useOutletContext();
    const [aplication, setAplication] = useState([]);
    const [error, setError] = useState();
    const { id } = useParams();
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState(false);

    useEffect(() => {
        loadingOrder();
    }, []);

    const loadingOrder = async () => {
        const url = BASE_URL + `/order/load/${id}`;
        const data = await sendVerificationTokenRequest(url);
        if (data && data.item) {
            const image = await reqGetFile('item', data.item.img);
            if (image) {
                console.log(image);
                setImageUrl(URL.createObjectURL(image));
            }
            setAplication(data.item);
            console.log(data.item);
        } else if (data && !data.item) {
            navigate(`/${auth.role}`);
        }
    }

    const submitOrder = async () => {
        const url = BASE_URL + `/order/update/submit/${id}`;
        const data = await sendVerificationTokenRequest(url);
        if (data && data.update) {
            loadingOrder();
        }
    }

    const getOrderToWork = async (e) => {
        e.preventDefault();
        const url = BASE_URL + `/order/update/get/work/${id}`
        const data = await sendVerificationTokenRequest(url);
        if (data && data.update) {
            navigate(`/${auth.role}/order/work`);
        }
    }

    const acceptOrder = async (e) => {
        e.preventDefault();
        const url = BASE_URL + `/order/update/accept/customer/${id}`
        const data = await sendVerificationTokenRequest(url);
        if (data && data.update) {
            loadingOrder();
        }
    }

    const openDispute = async (e) => {
        e.preventDefault();
        const url = BASE_URL + `/dispute/open/${id}`;
        const data = await sendVerificationTokenRequest(url);
        if (data && data.open) {
            loadingOrder();
        }
    }

    return (
        <div className={style.wrapper}>
            <NavigationMenu page={t('components.NavigationMenu.Order')} to={`/${auth.role}`} />
            <main className={style.order}>
                {error ?
                    <p className={style.error}>{error}</p>
                    : (
                        <div className={style.container}>
                            <p className={style.common}>{aplication.name}</p>
                            <p className={style.common}>
                                <Trans
                                    i18nKey={
                                        (aplication.weigth_item && 'page.Order.weigth') ||
                                        (aplication.quantity_item && 'page.Order.quantity')
                                    }
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={(aplication.weigth_item && { weigth: aplication.weigth_item }) ||
                                        (aplication.quantity_item && { quantity: aplication.quantity_item })}
                                />
                            </p>
                            <p className={style.common}>
                                <Trans
                                    i18nKey={'page.Order.origin'}
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={{ origin: aplication.origin }}
                                />
                            </p>
                            <p className={style.common}>
                                <Trans
                                    i18nKey={'page.Order.destination'}
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={{ destination: aplication.destination }}
                                />
                            </p>
                            <p className={style.common}>
                                <Trans
                                    i18nKey={'page.Order.price'}
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={{ price: aplication.price }}
                                />
                            </p>
                            <p className={style.common}>
                                <Trans
                                    i18nKey={'page.Order.delivery_status'}
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={{ delivery_status: aplication.delivery_status }}
                                />
                            </p>
                            <p className={style.common}>
                                <Trans
                                    i18nKey={'page.Order.description'}
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={{ description: aplication.description }}
                                />
                            </p>
                            {imageUrl && <img className={style.img} src={imageUrl} />}
                            {aplication.courier_id && <Chat item_id={id} user_id={auth.id} />}
                            {/* Кнопки */}
                            {location.pathname === `/courier/order/${id}`
                                && (aplication.courier_id && aplication.order_completed === 0
                                    ? (<Button styles={{
                                        display: 'block', margin: '15px auto 0'
                                    }} onClick={submitOrder} text={t('button.Order.submit_order')} />)
                                    : aplication.order_completed === 0
                                        ? <Button styles={{
                                            display: 'block', margin: '15px auto 0'
                                        }} onClick={getOrderToWork} text={t('button.Order.get_order')} />
                                        : '')}
                            {location.pathname === `/customer/order/${id}`
                                && (aplication.courier_id && aplication.order_completed === 0
                                    ? (<>
                                        <Button styles={{
                                            display: 'block', margin: '15px auto 0'
                                        }} onClick={acceptOrder} text={t('button.Order.accept_order')} />
                                        <Button styles={{
                                            display: 'block', margin: '15px auto 0'
                                        }} onClick={openDispute} text={t('button.Order.open_dispute')} />
                                    </>)
                                    : aplication.order_completed === 1
                                        ? <Button styles={{
                                            display: 'block', margin: '15px auto 0'
                                        }} onClick={openDispute} text={t('button.Order.open_dispute')} />
                                        : '')}
                        </div>
                    )}
            </main>
            <Footer />
        </div>
    )
}

export default Order;