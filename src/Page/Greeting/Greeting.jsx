import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import style from './Greeting.module.scss';
import { Button } from '../../ui/Button';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import { useEffect, useState } from 'react';
import { sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import { Trans, useTranslation } from 'react-i18next';
import { BASE_URL } from '../../utils/api/URL';

function Greeting() {
    const [auth, setAuth] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        localStorage.setItem('isFirstVisit', 'false');
        const getAccess = async () => {
            const data = await sendVerificationTokenRequest(BASE_URL + '/token/verification');
            if (data) {
                setAuth(data);
            }
        }
        getAccess();
    }, []);

    return (
        <div className={style.wrapper}>
            <NavigationMenu page={t('components.NavigationMenu.Greeting')} to={auth && auth.role ? `/${auth.role}` : '/'} />
            <main className={style.greeting}>
                <div className={style.conteiner}>
                    <p className={style.text}>
                        <Trans
                            i18nKey={'page.Greeting.description'}
                            components={{
                                accent: <span className={style.accent} />
                            }}
                            values={{ company_name: t('company_name') }}
                        />
                    </p>
                    <Link className={style.btn_link} to={auth && auth.role ? `/${auth.role}` : '/'}>
                        <Button styles={{
                            display: 'block', margin: '35px auto 0'
                        }} text={auth && auth.role
                            ? t('button.Greeting.return')
                            : t('button.Greeting.go')} />
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Greeting;