import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import style from './RegistrationForm.module.scss';

function RegistrationForm() {
    const location = useLocation();

    const initialFormData = location.pathname === '/registration/courier' ?
        { name_courier: '', email_courier: '', message_courier: '' } :
        location.pathname === '/registration/customer' ?
            { name_customer: '', email_customer: '', message_customer: '' } :
            {};

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Форма отправлена:', formData);
    };

    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.registration__form}>
                <div className={style.container}>
                    <form className={style.form} onSubmit={handleSubmit}>
                        {location.pathname === '/registration/courier' && (
                            <>
                                <input type='text' name='name_courier' value={formData.name_courier} onChange={handleChange} placeholder='ФИО' />
                                <input type='text' name='name_courier' value={formData.name_courier} onChange={handleChange} placeholder='e-mail' />
                                <input type='tel' name='name_courier' value={formData.name_courier} onChange={handleChange} placeholder='тел rus' />
                                <input type='tel' name='name_courier' value={formData.name_courier} onChange={handleChange} placeholder='тел usa' />
                                <button onClick={handleSubmit}>Зарегестрироваться</button>
                            </>
                        )}
                        {location.pathname === '/registration/customer' && (
                            <div className={style.input__block}>
                                <input type='text' name='name_customer' value={formData.name_customer} onChange={handleChange} placeholder='Привет' />
                            </div>
                        )}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default RegistrationForm;
