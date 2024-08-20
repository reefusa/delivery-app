import React from 'react'
import style from './Admin.module.scss';
import Footer from '../../components/Footer/Footer';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../../ui/Button';
import { useNavigate, useOutletContext } from 'react-router';
import { sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/api/URL';

export default function Admin() {
    const { auth } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const buttonLogout = async (e) => {
        e.preventDefault()
        const data = await sendVerificationTokenRequest(BASE_URL + '/account/logout');
        if (data.logout) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate(data.url);
        }
    }

    return (
        <div className={style.wrapper}>
            <NavigationMenu page={t('components.NavigationMenu.Admin')} />
            <div className={style.admin}>
                <div className={style.container}>
                    <Trans
                        i18nKey={'page.Admin.greeting'}
                        values={{ name: auth.name }}
                    />
                    <Link to={'/admin/dispute'} >
                        <Button styles={{
                            display: 'block', 'width': '250px', margin: '30px auto 0'
                        }} text={t('button.Admin.viewing_applications')} />
                    </Link>
                    <Button styles={{
                        display: 'block', 'width': '250px', margin: '30px auto 0'
                    }} onClick={buttonLogout} text={t('button.Admin.logout')} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
