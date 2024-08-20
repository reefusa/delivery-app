import { Button } from '../../ui/Button';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import style from './Home.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import { BASE_URL } from '../../utils/api/URL';

function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (localStorage.getItem('isFirstVisit') == null) {
            navigate('greeting');
        }

        const getAccess = async () => {
            const data = await sendVerificationTokenRequest(BASE_URL + '/token/verification');
            if (data && data.verify) {
                navigate(`/${data.user.role}`)
            }
        }
        getAccess();
    }, []);

    return (
        <div className={style.wrapper}>
            <NavigationMenu page={t('components.NavigationMenu.Home')} />
            <main className={style.main}>
                <section className={style.options}>
                    <p className={style.title}>{t('page.Home.title')}</p>
                    <div className={style.categories}>
                        <Link to='login'>
                            <Button styles={{
                                display: 'block', margin: '15px 0 0', width: '250px', color: '#2DB34A', background: '#fff', border: ' #2DB34A 2px solid'
                            }} text={t('button.Home.login')} />
                        </Link>
                        <Link to='registration'>
                            <Button styles={{
                                display: 'block', margin: '25px 0 0', width: '250px'
                            }} text={t('button.Home.registered')} />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Home;