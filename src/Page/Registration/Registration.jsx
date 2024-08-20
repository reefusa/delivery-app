import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import style from './Registration.module.scss';
import { Button } from '../../ui/Button';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import { useTranslation } from 'react-i18next';

function Registration() {
    const { t } = useTranslation();

    return (
        <div className={style.wrapper}>
            <NavigationMenu to={'/'} page={t('components.NavigationMenu.Registration')} />
            <main className={style.main}>
                <section className={style.options}>
                    <p className={style.title}>{t('page.Registration.title')}</p>
                    <div className={style.categories}>
                        <Link to='/registration/courier'>
                            <Button styles={{
                                display: 'block', margin: '15px 0 0', width: '250px', color: '#2DB34A', background: '#fff', border: ' #2DB34A 2px solid'
                            }} text={t('button.Registration.courier')} />
                        </Link>
                        <Link to='/registration/customer'>
                            <Button styles={{
                                display: 'block', margin: '25px 0 0', width: '250px'
                            }} text={t('button.Registration.customer')} />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Registration;