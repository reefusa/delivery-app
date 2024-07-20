import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import style from './RegistrationForm.module.scss';
import { sendApiRequest } from "../../utils/api/sendApiRequest";

function RegistrationForm() {
    const location = useLocation();

    const initialFormData = location.pathname === '/registration/courier' ?
        { name_courier: '', email_courier: '', tel_rus_courier: '', tel_use_courier: '', zelle_courier: '', card_withdrawal_courier: '', has_made_deposit_courier: '' } :
        location.pathname === '/registration/customer' ?
            { name_customer: '', email_customer: '', tel_rus_customer: '', tel_use_customer: '' } :
            {};

    const initialFormValid = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    const [formValid, setFormValid] = useState(initialFormValid);
    const [imagePassport, setImagePassport] = useState([]);
    const [imageFace, setImageFace] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleValidateForm(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const handleValidateForm = (name, value) => {
        let nameVerification = false;

        if (name.match(/^name/)) {
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
        }

        if (nameVerification) {
            setFormValid({ ...formValid, [name]: true });
        } else {
            setFormValid({ ...formValid, [name]: false });
        }
    }

    const handleFileUpload = (e, action) => {
        const files = e.target.files;

        if (files && action === 'passport') {
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
                setImagePassport(prevImages => [...prevImages, { type: file.type, url: imageUrl }]);
            });
        }
        if (files && action === 'face') {
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
            setImageFace(imageUrl);
        }
    }

    const handleConfirmation = (e, action) => {
        e.preventDefault();
        if (action === 'email' && formData.email_courier.trim() !== '' && formValid.email_courier) {
            fetch('http://localhost:3003/verification/courier/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: formData.email_courier
            })
                .then(response => response.text())
                .then(data => {
                    if (data === 'true') {
                        setFormValid({ ...formValid, email_courier: true });
                    } else {
                        setFormValid({ ...formValid, email_courier: false });
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            setFormValid({ ...formValid, email_courier: false });
        }
        if (action === 'tel_rus' && formData.tel_rus_courier.trim() !== '' && formValid.tel_rus_courier) {
            fetch('http://localhost:3003/verification/courier/tel_rus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: formData.tel_rus_courier
            })
                .then(response => response.text())
                .then(data => {
                    if (data === 'true') {
                        setFormValid({ ...formValid, tel_rus_courier: true });
                    } else {
                        setFormValid({ ...formValid, tel_rus_courier: false });
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            setFormValid({ ...formValid, email_courier: false });
        }
        if (action === 'tel_use' && formData.tel_use_courier.trim() !== '' && formValid.tel_use_courier) {
            fetch('http://localhost:3003/verification/courier/tel_use', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: formData.tel_use_courier
            })
                .then(response => response.text())
                .then(data => {
                    if (data === 'true') {
                        setFormValid({ ...formValid, tel_use_courier: true });
                    } else {
                        setFormValid({ ...formValid, tel_use_courier: false });
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            setFormValid({ ...formValid, email_courier: false });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await sendApiRequest('http://localhost:3003/registration/courier', 'POST', 'application/json', formData, formValid, e);
        console.log('Ответ от сервера: ' + data);
    };

    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.registration__form}>
                <div className={style.container}>
                    <form className={style.form}>
                        {location.pathname === '/registration/courier' && (
                            <>
                                <div className={formValid.name_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='name_courier' value={formData.name_courier} onChange={handleChange} placeholder='ФИО' />
                                </div>
                                <div className={formValid.email_courier ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='email_courier' value={formData.email_courier} onChange={handleChange} placeholder='e-mail' />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'email')}>Подтвердить</button>
                                </div>
                                <div className={formValid.tel_rus_courier ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_rus_courier' value={formData.tel_rus_courier} onChange={handleChange} placeholder='тел rus' />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_rus')}>Подтвердить</button>
                                </div>
                                <div className={formValid.tel_use_courier ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_use_courier' value={formData.tel_use_courier} onChange={handleChange} placeholder='тел usa' />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_use')}>Подтвердить</button>
                                </div>
                                <div className={style.block__input__file}>
                                    <div className={style.body__input__file}>
                                        <input className={style.input__file} accept='.jpg, .png' type="file" name='passport_courier' onChange={(e) => handleFileUpload(e, 'face')} />
                                        <button className={style.btn__file}>Загрузить фото лица</button>
                                    </div>
                                    {imageFace && <img className={`${style.file} ${style.file__passport}`} src={imageFace} alt='Uploaded' />}
                                </div>
                                <div className={style.block__input__file}>
                                    <div className={style.body__input__file}>
                                        <input className={style.input__file} accept='.jpg, .png, .pdf' multiple type="file" name='passport_courier' onChange={(e) => handleFileUpload(e, 'passport')} />
                                        <button className={style.btn__file}>Загрузить ID / паспорт</button>
                                    </div>
                                    {imagePassport.length > 0 && imagePassport.map((image) =>
                                        (<img className={image.type === 'application/pdf' ? `${style.file} ${style.file__pdf}` : `${style.file} ${style.file__passport}`} src={image.type === 'application/pdf' ? '/media/svg/pdf.svg' : image.url} alt='Uploaded' key={image.url} />)
                                    )}
                                </div>
                                <div className={formValid.zelle_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='zelle_courier' value={formData.zelle_courier} onChange={handleChange} placeholder='zelle' />
                                </div>
                                <div className={formValid.card_withdrawal_courier ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='card_withdrawal_courier' value={formData.card_withdrawal_courier} onChange={handleChange} placeholder='карта для вывода' />
                                </div>
                                {/* Доделать логику депозита */}
                                <button className={style.btn__deposit}>Внести депозит</button>
                                <div className={style.block__input}>
                                    <input name='card_number' placeholder='ХХХХ ХХХХ ХХХХ ХХХХ' />
                                </div>
                                <div className={style.block__input}>
                                    <input name='card_date' placeholder='expiration date XX/XXXX' />
                                </div>
                                <div className={style.block__input}>
                                    <input name='card_zip' placeholder='если карта usa, то доп поле ZIP' />
                                </div>
                                <div className={style.block__input}>
                                    <input name='card_cvv' placeholder='CVV' />
                                </div>
                                <p className={style.user__agreement}>Нажимая «Зарегистрироваться, вы подтверждаете, что ознакомлены и полностью согласны с условиями пользовательского соглашения</p>
                                <button className={style.btn__submit} onClick={handleSubmit}>Зарегестрироваться</button>
                            </>
                        )}
                        {location.pathname === '/registration/customer' && (
                            <>
                                <div className={formValid.name_customer ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='name_customer' value={formData.name_courier} onChange={handleChange} placeholder='ФИО' />
                                </div>
                                <div className={formValid.email_customer ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='email_customer' value={formData.email_courier} onChange={handleChange} placeholder='e-mail' />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'email')}>Подтвердить</button>
                                </div>
                                <div className={formValid.tel_rus_customer ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_rus_customer' value={formData.tel_rus_courier} onChange={handleChange} placeholder='тел rus' />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_rus')}>Подтвердить</button>
                                </div>
                                <div className={formValid.tel_use_customer ? `${style.block__input} ${style.block__confirmation}` : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='tel' name='tel_use_customer' value={formData.tel_use_courier} onChange={handleChange} placeholder='тел usa' />
                                    <button className={style.btn__confirmation} onClick={(e) => handleConfirmation(e, 'tel_use')}>Подтвердить</button>
                                </div>
                                <p className={style.user__agreement}>Нажимая «Зарегистрироваться, вы подтверждаете, что ознакомлены и полностью согласны с условиями пользовательского соглашения</p>
                                <button className={style.btn__submit} onClick={handleSubmit}>Зарегестрироваться</button>
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