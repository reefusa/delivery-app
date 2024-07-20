import { useState } from 'react';
import { Button } from '../../ui/button/Button';
import style from './CreateOrder.module.scss';
import { sendApiRequest } from '../../utils/api/sendApiRequest';

function CreateOrder() {
    const initialFormData = { name: 'Кроссвоки', weigth: '4,5кг', cost: '50$', origin: 'Москва', destination: 'Америка', description: 'Новые кроссовки', img: 'o.webp', id_courier: null, id_customer: null, delivery_status: 'Создан', order_completed: false };
    const initialFormValid = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e) => {
        const data = await sendApiRequest('http://localhost:3003/order/create', 'POST', 'application/json', formData, true, e);
        console.log('Ответ от сервера: ' + data);
    }

    return (
        <div className={style.create_order}>
            <form className={style.form}>
                <Button styles={{
                    display: 'block', margin: '15px auto 0'
                }} onClick={handleSubmit} text={'Добавить новый заказ'} />
            </form>
        </div>
    )
}

export default CreateOrder;







