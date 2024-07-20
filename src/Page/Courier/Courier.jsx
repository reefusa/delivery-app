import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import Application from "../../components/Application/Application";
import style from './Courier.module.scss';
import { useState } from 'react';

function Courier() {
    const aplications = [
        { id: '0', title: 'Кроссвоки', img: 'o.webp', weight: '4,5кг', cost: '50$', destination: 'Москва/Америка', description: 'Новые кроссовки' },
        { id: '1', title: 'Кроссвоки', img: 'i.webp', weight: '1,5кг', cost: '40$', destination: 'Хабаровск/Лос', description: 'Дополнительно доставить с кроссвоками' }
    ];
    const [aplication, setAplication] = useState(aplications);

    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.customer}>
                <div className={style.container}>
                    <div className={style.body}>
                        Добро пожаловать Курьер
                        <div className={style.applications}>
                            {aplication.map(el =>
                            (<Application key={el.id} title={el.title} img={el.img} weight={el.weight}
                                cost={el.cost} destination={el.destination} description={el.description} />)
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Courier;