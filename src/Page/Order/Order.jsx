import style from "./Order.module.scss";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import { useState } from "react";
import { Button } from "../../ui/button/Button";

function Order() {
    const info = { name: 'Кроссвоки', weight: '4,5кг', cost: '50$', origin: 'Москва', destination: 'Америка', description: 'Новые кроссовки', img: 'o.webp', destination: 'Москва/Америка', id_courier: '', id_customer: '', delivery_status: '', order_completed: '' };
    const [aplication, SetAplication] = useState(info);

    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.order}>
                <div className={style.container}>
                    <p className={style.common}>{aplication.title}</p>
                    <p className={style.common}>Вес: {aplication.weight}</p>
                    <p className={style.common}>Стоимость: {aplication.cost}</p>
                    <p className={`${style.common} ${style.color}`}>Доставка: {aplication.destination}</p>
                    <p className={style.common}><span className={style.color}>Описание:</span> {aplication.description}</p>
                    <img className={style.img} src={`/media/orders/${aplication.img}`} />
                    <Button styles={{
                        display: 'block', margin: '15px auto 0'
                    }} text={'Новый заказ'} />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Order;