import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import { Button } from "../../ui/button/Button";
import style from './Customer.module.scss';
import { sendApiRequest } from "../../utils/api/sendApiRequest";

function Customer() {
    const [formData, setFormData] = useState({ name_courier: 'Коноплев Ростислав Русланович', email_courier: 'email', tel_rus_courier: '89144257678', tel_use_courier: '89144257678', zelle_courier: '678678676', card_withdrawal_courier: '7878789787', has_made_deposit_courier: 'true' });
    const [formValid, setFormValid] = useState(true);

    const handleSubmit = async (e) => {
        const data = await sendApiRequest('http://localhost:3003/registration/courier', 'POST', 'application/json', formData, formValid, e);
        console.log('Полученные данные:', data);
    }

    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.customer}>
                <div className={style.container}>
                    <div className={style.body}>
                        Добро пожаловать на страницу формирования заказа
                        <form className={style.form}>
                            <Button styles={{ display: 'block', margin: '15px auto 0' }}
                                text={'Сформировать заказ'} onClick={handleSubmit} />
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Customer;