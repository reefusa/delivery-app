import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import style from './RegistrationForm.module.scss';
import { sendPostRequestForm } from "../../utils/api/sendApiRequest";
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../utils/api/URL';

function RegistrationForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const initialFormData = location.pathname === '/registration/courier' ?
        { name_courier: '', last_name_courier: '', patronymic_coutier: '', email_courier: '', tel_rus_courier: '', tel_use_courier: '', zelle_courier: '', card_withdrawal_courier: '' } :
        location.pathname === '/registration/customer' ?
            { name_customer: '', last_name_customer: '', patronymic_customer: '', email_customer: '', tel_rus_customer: '', tel_use_customer: '' } :
            { login: '', password: '' };

    const initialFormValid = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    const [formValid, setFormValid] = useState(initialFormValid);
    const [imagePassport, setImagePassport] = useState([]);
    const [imageFace, setImageFace] = useState(null);
    const [verifyInfo, setVerifyInfo] = useState(() => {
        return Object.keys(initialFormData).reduce((acc, key) => {
            if (key.includes('tel') || key.includes('email')) {
                acc[key] = false;
            }
            return acc;
        }, {});
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleValidateForm(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const handleValidateForm = (name, value) => {
        let nameVerification = false;

        if (name.match(/name|patronymic/)) {
            const regex = /^[а-яА-ЯёЁa-zA-Z- ]+$/;
            if (value.trim !== '' && regex.test(value)) {
                nameVerification = true;
            }
        }
        if (name.match(/^email/)) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(String(value).toLowerCase())) {
                nameVerification = true;
            }
        }
        if (name.match(/^tel/)) {
            const regex = /^(\+?\d{1,3}?)?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }
        if (name.match(/^zelle/)) {
            const regex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }
        if (name.match(/^card_withdrawal_courier|card_number/)) {
            const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        } if (name.match(/^card_date/)) {
            const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        } if (name.match(/^card_zip/)) {
            const regex = /^\d{5}(-\d{4})?$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        } if (name.match(/^card_cvv/)) {
            const regex = /^[0-9]{3,4}$/;
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

    const handleFileUpload = (e, action) => {
        const files = e.target.files;

        if (files && files.length !== 0 && action === 'passport') {
            setImagePassport([]);
            Array.from(files).forEach((file) => {
                if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
                    alert('Разрешены только изображения и pdf для загрузки паспорта');
                    e.target.value = '';
                    setImagePassport(null);
                    return
                } if (file.size > 2 * 1024 * 1024) {
                    alert('Файл должен быть менее 2 МБ');
                    e.target.value = '';
                    setImagePassport(null);
                    return
                }
                const imageUrl = URL.createObjectURL(file);
                setImagePassport(prevImages => [...prevImages, { file: file, type: file.type, url: imageUrl }]);
            });
        }
        if (files && files.length !== 0 && action === 'face') {
            if (!['image/png', 'image/jpeg'].includes(files[0].type)) {
                alert('Разрешены только изображения и pdf для загрузки паспорта');
                e.target.value = '';
                setImageFace(null);
                return
            } if (files[0].size > 2 * 1024 * 1024) {
                alert('Файл должен быть менее 2 МБ');
                e.target.value = '';
                setImageFace(null);
                return
            }
            const imageUrl = URL.createObjectURL(files[0]);
            setImageFace({ file: files[0], url: imageUrl });
        }
    }

    const handleConfirmation = async (e, action) => {
        e.preventDefault();
        const locationKey = location.pathname.split('/')[2];

        if (action === 'email' && formData[`email_${locationKey}`].trim() !== '' && formValid[`email_${locationKey}`]) {
            const apiKey = 'private_d5d57fedaa88b4b429703a46828a0350';
            const email = formData[`email_${locationKey}`];

            fetch('https://api.neverbounce.com/v4/single/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    key: apiKey,
                    email: email,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response:', data);
                    setVerifyInfo(prev => ({ ...prev, [`email_${locationKey}`]: true }));
                })
                .catch(error => {
                    console.error('Error:', error);
                    setVerifyInfo(prev => ({ ...prev, [`email_${locationKey}`]: false }));
                });
        } else {
            setFormValid({ ...formValid, [`email_${locationKey}`]: false });
        }
        if (action === 'tel_rus' && formData[`tel_rus_${locationKey}`].trim() !== '' && formValid[`tel_rus_${locationKey}`]) {
            const apiKey = '25b0b6142f6fa96b609e8c4d66bb383e';
            const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${formData[`tel_rus_${locationKey}`]}&format=1`;

            try {
                const response = await fetch(apiUrl, { method: 'GET' });
                const data = await response.json();
                console.log(data);
                if (data.valid) {
                    setVerifyInfo(prev => ({ ...prev, [`tel_rus_${locationKey}`]: true }));
                } else {
                    alert(t('page.RegistrationForm.alert.number_invalid'));
                    setVerifyInfo(prev => ({ ...prev, [`tel_rus_${locationKey}`]: false }));
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            setFormValid({ ...formValid, [`tel_rus_${locationKey}`]: false });
        } if (action === 'tel_use' && formData[`tel_use_${locationKey}`].trim() !== '' && formValid[`tel_use_${locationKey}`]) {
            const apiKey = '25b0b6142f6fa96b609e8c4d66bb383e';
            const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${formData[`tel_use_${locationKey}`]}&format=1`;

            try {
                const response = await fetch(apiUrl, { method: 'GET' });
                const data = await response.json();
                if (data.valid) {
                    setVerifyInfo(prev => ({ ...prev, [`tel_use_${locationKey}`]: true }));
                } else {
                    alert(t('page.RegistrationForm.alert.number_invalid'));
                    setVerifyInfo(prev => ({ ...prev, [`tel_use_${locationKey}`]: false }));
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            setFormValid({ ...formValid, [`tel_use_${locationKey}`]: false });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = location.pathname.split('/');
        let isError = false;

        Object.entries(formData).forEach(([key, value]) => {
            if (value.trim() === '' && !isError) {
                alert(t('page.RegistrationForm.alert.empty_lines'));
                isError = true;
            }
        });

        Object.keys(formValid).forEach((el) => {
            if (formValid[el] === false && !isError) {
                alert(t('page.RegistrationForm.alert.incorrectly_filled'));
                isError = true;
            }
        });

        if ((!imageFace || imagePassport.length === 0) && !isError && role[2] === 'courier') {
            alert(t('page.RegistrationForm.alert.empty_files'));
            isError = true;
        }

        if (!isError) {
            const newFormData = new FormData();

            Object.keys(formData).forEach(key => {
                newFormData.append(key, formData[key]);
            });

            if (imageFace || (imagePassport && imagePassport.length > 0)) {
                imagePassport.forEach(files => {
                    newFormData.append('imagePassport', files.file);
                });
                newFormData.append('imageFace', imageFace.file);
            }

            newFormData.append('user_language', i18n.language)

            const URL = BASE_URL + `/registration/${role[2]}`;

            const data = await sendPostRequestForm(URL, 'POST', newFormData);
            console.log(data);
            if (data && data.auth === true) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate(data.url, { replace: data.replace });
            } else if (data && !data.auth) {
                alert(t('page.RegistrationForm.alert.user_exists'));
            } else {
                alert(t('page.RegistrationForm.alert.error'));
            }
        }
    };

    return (
        <div className={style.wrapper}>
            <NavigationMenu to={'/registration'} page={location.pathname === '/registration/courier' ? t('components.NavigationMenu.RegistrationForm.courier') : t('components.NavigationMenu.RegistrationForm.customer')} />
            <main className={style.registration__form}>
                <div className={style.container}>
                    <form className={style.form}>
                        {location.pathname === '/registration/courier' && (
                            <>
                                <div className={formValid.name_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='name_courier' value={formData.name_courier} onChange={handleChange} placeholder={t('components.input.name')} />
                                </div>
                                <div className={formValid.last_name_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='last_name_courier' value={formData.last_name_courier} onChange={handleChange} placeholder={t('components.input.last_name')} />
                                </div>
                                <div className={formValid.patronymic_coutier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='patronymic_coutier' value={formData.patronymic_coutier} onChange={handleChange} placeholder={t('components.input.patronymic')} />
                                </div>
                                <div className={formValid.email_courier ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='email_courier' disabled={verifyInfo[`email_${location.pathname.split('/')[2]}`]} value={formData.email_courier} onChange={handleChange} placeholder={t('components.input.email')} />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'email')}>{t('button.RegistrationForm.confirmation')}</button>
                                </div>
                                <div className={formValid.tel_rus_courier ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_rus_courier' disabled={verifyInfo[`tel_rus_${location.pathname.split('/')[2]}`]} value={formData.tel_rus_courier} onChange={handleChange} placeholder={t('components.input.tel_rus')} />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_rus')}>{t('button.RegistrationForm.confirmation')}</button>
                                </div>
                                <div className={formValid.tel_use_courier ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_use_courier' disabled={verifyInfo[`tel_use_${location.pathname.split('/')[2]}`]} value={formData.tel_use_courier} onChange={handleChange} placeholder={t('components.input.tel_use')} />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_use')}>{t('button.RegistrationForm.confirmation')}</button>
                                </div>
                                <div className={style.block__input__file}>
                                    <div className={style.body__input__file}>
                                        <input className={style.input__file} accept='.jpg, .png' type="file" name='passport_courier' onChange={(e) => handleFileUpload(e, 'face')} />
                                        <button className={style.btn__file}>{t('button.RegistrationForm.userpic')}</button>
                                    </div>
                                    {imageFace && <img className={`${style.file} ${style.file__passport}`} src={imageFace.url} alt='Uploaded' />}
                                </div>
                                <div className={style.block__input__file}>
                                    <div className={style.body__input__file}>
                                        <input className={style.input__file} accept='.jpg, .png, .pdf' multiple type="file" name='passport_courier' onChange={(e) => handleFileUpload(e, 'passport')} />
                                        <button className={style.btn__file}>{t('button.RegistrationForm.passport')}</button>
                                    </div>
                                    {imagePassport.length > 0 && imagePassport.map((image) =>
                                        (<img className={image.type === 'application/pdf' ? `${style.file} ${style.file__pdf}` : `${style.file} ${style.file__passport}`} src={image.type === 'application/pdf' ? '/media/svg/pdf.svg' : image.url} alt='Uploaded' key={image.url} />)
                                    )}
                                </div>
                                <div className={formValid.zelle_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='zelle_courier' value={formData.zelle_courier} onChange={handleChange} placeholder={t('components.input.zelle')} />
                                </div>
                                <div className={formValid.card_withdrawal_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='card_withdrawal_courier' value={formData.card_withdrawal_courier} onChange={handleChange} placeholder={t('components.input.card_withdrawal_courier')} />
                                </div>
                                {/* Доделать логику депозита */}
                                <button className={style.btn__deposit}>{t('button.RegistrationForm.deposit')}</button>
                                <div className={style.block__input}>
                                    <input name='card_number' placeholder={t('components.input.cart_number')} />
                                </div>
                                <div className={style.block__input}>
                                    <input name='card_date' placeholder={t('components.input.cart_date')} />
                                </div>
                                <div className={style.block__input}>
                                    <input name='card_zip' placeholder={t('components.input.cart_zip')} />
                                </div>
                                <div className={style.block__input}>
                                    <input name='card_cvv' placeholder={t('components.input.cart_cvv')} />
                                </div>
                                <p className={style.user__agreement}>{t('page.RegistrationForm.agreement')}</p>
                                {/* <Input /> */}
                                <button className={style.btn__submit} onClick={handleSubmit}>{t('button.RegistrationForm.registration')}</button>
                            </>
                        )}
                        {location.pathname === '/registration/customer' && (
                            <>
                                <div className={formValid.name_customer ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='name_customer' value={formData.name_customer} onChange={handleChange} placeholder={t('components.input.name')} />
                                </div>
                                <div className={formValid.last_name_customer ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='last_name_customer' value={formData.last_name_customer} onChange={handleChange} placeholder={t('components.input.last_name')} />
                                </div>
                                <div className={formValid.patronymic_customer ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='patronymic_customer' value={formData.patronymic_customer} onChange={handleChange} placeholder={t('components.input.patronymic')} />
                                </div>
                                <div className={formValid.email_customer ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='email_customer' value={formData.email_courier} onChange={handleChange} placeholder={t('components.input.email')} />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'email')}>{t('button.RegistrationForm.confirmation')}</button>
                                </div>
                                <div className={formValid.tel_rus_customer ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_rus_customer' value={formData.tel_rus_courier} onChange={handleChange} placeholder={t('components.input.tel_rus')} />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_rus')}>{t('button.RegistrationForm.confirmation')}</button>
                                </div>
                                <div className={formValid.tel_use_customer ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_use_customer' value={formData.tel_use_courier} onChange={handleChange} placeholder={t('components.input.tel_use')} />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_use')}>{t('button.RegistrationForm.confirmation')}</button>
                                </div>
                                <p className={style.user__agreement}>{t('page.RegistrationForm.agreement')}</p>
                                <button className={style.btn__submit} onClick={handleSubmit}>{t('button.RegistrationForm.registration')}</button>
                            </>
                        )}
                    </form>
                </div>
            </main >
            <Footer />
        </div >
    );
}

export default RegistrationForm;