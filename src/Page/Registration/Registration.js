import { useLocation, Link, Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import style from './Registration.module.scss';

function Registration() {
    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.main}>
                <section className={style.options}>
                    <h2 className={style.title}>Регистрация</h2>
                    <div className={style.categories}>
                        <Link to='/registration/courier' className={style.link}>Курьер</Link>
                        <Link to='/registration/customer' className={style.link}>Заказчик</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Registration;