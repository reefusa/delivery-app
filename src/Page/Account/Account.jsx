import { useNavigate, useOutletContext } from "react-router";
import style from './Account.module.scss';
import { Button } from "../../ui/Button";
import { useEffect, useState } from "react";
import { reqGetFile, sendPostRequest, sendVerificationTokenRequest } from "../../utils/api/sendApiRequest";
import Footer from "../../components/Footer/Footer";
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../utils/api/URL";

export default function Account() {
    const { auth } = useOutletContext();
    const [user, setUser] = useState([]);
    const initialFormData = auth.role === 'courier'
        ? { email: '', tel_rus: '', tel_use: '', zelle: '', card_withdrawal: '' }
        : auth.role === 'customer'
            ? { email: '', tel_rus: '', tel_use: '' }
            : {};
    const initialFormValid = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});
    const [formData, setFormData] = useState(initialFormData);
    const [formValid, setFormValid] = useState(initialFormValid);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (auth) {
            const loadingUserInfo = async () => {
                const data = await sendVerificationTokenRequest(BASE_URL + '/account');
                if (data && data.user) {
                    setUser(data.user);
                    console.log(data.user);

                }
                if (auth.role === 'courier') {
                    const getImage = await reqGetFile(`${auth.role}s`, data.image);
                    if (getImage) {
                        setImageUrl(URL.createObjectURL(getImage));
                    }
                }
            }
            loadingUserInfo();
        } else {
            navigate('/login');
        }
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        handleValidateForm(name, value);
    }

    const handleValidateForm = (name, value) => {
        let nameVerification = false;

        if (name.match(/^email/)) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (name.match(/^tel_rus/)) {
            const regex = /^(\+?\d{1,3}?)?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (name.match(/^tel_use/)) {
            const regex = /^(\+?\d{1,3}?)?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }

        } if (name.match(/^zelle/)) {
            const regex = /^/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (name.match(/^card_withdrawal/)) {
            const regex = /^/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (nameVerification) {
            setFormValid({ ...formValid, [name]: true });
        } else {
            setFormValid({ ...formValid, [name]: false });
        }
    }

    const handleUpdate = async (e, key) => {
        e.preventDefault();
        let isError = false;

        if (formData[key].trim() === '' && !isError) {
            alert(t('page.Account.alert.empty_line'));
            isError = true;
        }

        if (formValid[key] === false) {
            alert(t('page.Account.alert.incorrectly_filled'));
            isError = true;
        }

        if (!isError) {
            const URL = BASE_URL + '/account/update';
            const token = localStorage.getItem('accessToken');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const data = await sendPostRequest(URL, 'POST', headers, { key: key, value: formData[key] });
            if (data && data.update) {
                setFormData({ ...formData, [key]: '' });
                const data = await sendVerificationTokenRequest(BASE_URL + '/account');
                setUser(data.user);
            }
        }
    }

    const handleButton = async (e, action) => {
        e.preventDefault();
        if (action === 'logout') {
            const data = await sendVerificationTokenRequest(BASE_URL + '/account/logout');
            if (data.logout) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate(data.url);
            }
        } if (action === 'delete') {
            const data = await sendVerificationTokenRequest(BASE_URL + '/account/delete');
            if (data && data.delete) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate(data.url);
            }
        } if (action === 'withdrawMoney') {
            const data = await sendVerificationTokenRequest(BASE_URL + '/money/withdraw');
        } if (action === 'deleteInfo') {
            const data = await sendVerificationTokenRequest(BASE_URL + `/account/delete/info/${user.last_name}/${user.name}`);
            if (data && data.update) {
                console.log(data);
            }
        }
    }

    return (
        <div className={style.wrapper}>
            <NavigationMenu page={`${t('components.NavigationMenu.Account')}/${auth.role === 'courier' ? t('components.NavigationMenu.Account.courier') : auth.role === 'customer' ? t('components.NavigationMenu.Account.customer') : ''}`} to={`/${auth.role}`} />
            <main className={style.account}>
                <div className={style.container}>
                    <div className={style.body}>
                        {imageUrl && <img className={style.userpic} src={imageUrl} />}
                        <p className={style.name}>{auth.name}</p>
                        {auth.role === 'courier'
                            ? (<form className={style.form}>
                                {Object.keys(initialFormData).map(key => {
                                    return (<div key={key} className={formValid[key] ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`} >
                                        <input type='text' name={key} value={formData[key]} onChange={handleChange} placeholder={key === 'zelle' ? t('components.input.zelle') : key === 'card_withdrawal' ? t('components.input.card_withdrawal_courier') : user[`${key}_${user.role}`]} />
                                        <button className={style.btn__confirmation} onClick={(e) => handleUpdate(e, key)}>{t('button.Account.change')}</button>
                                    </div>)
                                })}
                            </form>)
                            : auth.role === 'customer' && ((<div className={style.body}>
                                <form className={style.form}>
                                    {Object.keys(initialFormData).map(key => {
                                        return (<div key={key} className={formValid[key] ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                            <input type='text' name={key} value={formData[key]} onChange={handleChange} placeholder={user[`${key}_${user.role}`]} />
                                            <button className={style.btn__confirmation} onClick={(e) => handleUpdate(e, key)}>{t('button.Account.change')}</button>
                                        </div>)
                                    })}
                                </form>
                            </div>))}
                    </div>
                </div>
                {auth.role === 'courier' &&
                    (<>
                        <Button styles={{
                            display: 'block', margin: '40px auto 0', width: '250px'
                        }} text={t('button.Account.delete_info')} onClick={(e) => { handleButton(e, 'deleteInfo') }} />
                        <Button styles={{
                            display: 'block', margin: '20px auto 0', width: '250px'
                        }} text={t('button.Account.withdraw_Money')} onClick={(e) => { handleButton(e, 'withdrawMoney') }} />
                    </>)
                }
                <Button styles={{
                    display: 'block', margin: `${auth.role === 'customer' ? '40px auto 0' : '20px auto 0'}`, width: '250px'
                }} text={t('button.Account.logout')} onClick={(e) => { handleButton(e, 'logout') }} />
                <Button styles={{
                    display: 'block', margin: '20px auto 0', width: '250px'
                }} text={t('button.Account.delete')} onClick={(e) => { handleButton(e, 'delete') }} />
            </main >
            <Footer />
        </div >
    )
}
