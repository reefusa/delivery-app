import { useEffect, useState } from 'react';
import { Button } from '../../ui/Button';
import style from './CreateOrder.module.scss';
import { sendGetRequest, sendPostRequest, sendPostRequestForm, sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import { useNavigate, useOutletContext } from 'react-router';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import Footer from '../../components/Footer/Footer';
import { Input, Textarea } from '../../ui/Input';
import { Trans, useTranslation } from 'react-i18next';
import { BASE_URL } from '../../utils/api/URL';

function CreateOrder() {
    const initialFormData = { name: '', origin: '', destination: '', description: '', category: '' };
    const { auth } = useOutletContext();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [formValid, setFormValid] = useState(Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {}));
    const [activeArrow, setActiveArrow] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({ item: 'choice' });
    const [cost, setCost] = useState(false);
    const [minSum, setMinSum] = useState(null);
    const [imageItem, setImageItem] = useState({});

    useEffect(() => {
        const getCategories = async () => {
            const data = await sendVerificationTokenRequest(BASE_URL + `/categories/get?lng=${i18n.language}`);
            if (data && data.categories) {
                setCategories(data.categories);
            }
        }
        getCategories();
        const urlParams = new URLSearchParams(window.location.search);
        const pay = urlParams.get('pay');
        if (pay) {
            alert(t('page.CreateOrder.alert.pay_failed'));
        }
    }, []);

    useEffect(() => {
        setCost(false);
    }, [currentCategory]);

    const handleArrow = (e) => {
        e.preventDefault();
        if (activeArrow == null) {
            return setActiveArrow(true);
        }
        setActiveArrow(!activeArrow);
    }

    const choosingCategory = (e, category) => {
        e.preventDefault();
        setCurrentCategory(category);
        setActiveArrow(false);
        category.min_sum === '' ? setMinSum(false) : setMinSum(category.min_sum);

        let updatedFormData = { ...initialFormData, category: category.id };

        switch (category.calc_delivery) {
            case 'kg':
                updatedFormData = category.calc_cost.includes('%')
                    ? { ...updatedFormData, weight: '', cost: '' }
                    : { ...updatedFormData, weight: '' };
                break;
            case 'item':
                updatedFormData = category.calc_cost.includes('%')
                    ? { ...updatedFormData, quantity: '', cost: '' }
                    : { ...updatedFormData, quantity: '' };
                break;
            default:
                updatedFormData = initialFormData;
        }
        setFormData(updatedFormData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        handleValidateForm(name, value);
    }

    const handleValidateForm = (name, value) => {
        let nameVerification = false;

        if (name.match(/^name/)) {
            const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }


        if (name.match(/^cost/)) {
            const regex = /^[1-9]\d*$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (name.match(/^weight/)) {
            const regex = /^(0|[1-9]\d{0,2}|[1-9]\d{0,})(\.\d{1,2})?$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (name.match(/^quantity/)) {
            const regex = /^(0\.\d{1,2}|[1-9]\d{0,2}(\.\d{1,2})?|1000(\.0{1,2})?)$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }
        }

        if (name.match(/^origin/)) {
            const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;
            if (regex.test(String(value))) {
                nameVerification = true;
            }

        } if (name.match(/^destination/)) {
            const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;
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

    const handleFileUploads = (e) => {
        e.preventDefault();
        setImageItem({});
        const { files } = e.target;

        if (files && files.length !== 0) {
            if (!['image/png', 'image/webp', 'image/jpg', 'image/jpeg'].includes(files[0].type)) {
                alert(t('page.CreateOrder.alert.file_too_big'));
                e.target.value = '';
                return setImageItem({});
            } if (files[0].size > 2 * 1024 * 1024) {
                alert(t('page.CreateOrder.alert.file_too_big'));
                e.target.value = '';
                return setImageItem({});
            }

            const imageUrl = URL.createObjectURL(files[0]);
            setImageItem({ file: files[0], url: imageUrl });
        }
    }

    const сostСalculation = async (e) => {
        e.preventDefault();
        let isError = false;

        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '' && key !== 'description' && !isError) {
                alert(t('page.CreateOrder.alert.empty_lines'));
                isError = true;
            }
        });

        Object.entries(formValid).forEach(([key, value]) => {
            if (value === false && key !== 'description' && !isError) {
                alert(t('page.CreateOrder.alert.incorrectly_filled'));
                isError = true;
            }
        });

        if (!isError) {
            const token = localStorage.getItem('accessToken');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const data = await sendPostRequest(URL + `/order/calc?lng=${i18n.language}`, 'POST', headers, formData);
            if (data) {
                setCost(data.cost);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isError = false;

        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '' && key !== 'description' && !isError) {
                alert(t('page.CreateOrder.alert.empty_lines'));
                isError = true;
            }
        });

        Object.entries(formValid).forEach(([key, value]) => {
            if (value === false && key !== 'description' && !isError) {
                alert(t('page.CreateOrder.alert.incorrectly_filled'));
                isError = true;
            }
        });

        if (Object.keys(imageItem).length === 0 && !isError) {
            alert(t('page.CreateOrder.alert.file_too_big'));
            isError = true;
        }

        if (!isError) {
            const newFormData = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                newFormData.append(key, value);
            });

            if (imageItem) {
                newFormData.append('imageItem', imageItem.file)
            }

            // newFormData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });

            try {
                const res = await sendVerificationTokenRequest(BASE_URL + `/money/pay?lng=${i18n.language}`);
                const session = await res;

                if (session.url) {
                    window.location.href = session.url;
                } else {
                    console.error('Session URL not found.');
                }
            } catch (error) {
                console.error('Error creating checkout session:', error);
            }

            if (true) {
                const token = localStorage.getItem('accessToken');
                const URL = BASE_URL + `/order/create?lng=${i18n.language}`;
                const headers = {
                    'Authorization': `Bearer ${token}`
                }
                const data = await sendPostRequestForm(URL, 'POST', newFormData, headers);
                if (data && data.add) {
                    navigate(data.url);
                }
            }
        }
    }

    return (
        <div className={style.wrapper}>
            <NavigationMenu page={t('components.NavigationMenu.CreateOrder')} to={`/${auth.role}`} />
            <main className={style.create__order}>
                <div className={style.container}>
                    <div className={style.category}>
                        <p className={style.item}>{t(`page.CreateOrder.category.${currentCategory.item}`)}</p>
                        <button className={style.arrow} onClick={handleArrow}><img className={activeArrow !== null ? (activeArrow ? style.rotation_up : style.rotation_down) : ''} src='/media/svg/arrow-down.svg' /></button>
                        {activeArrow
                            ? (<ul className={style.list}>
                                {categories.map(el => (
                                    <li key={el.id} onClick={(e) => choosingCategory(e, el)} className={style.name__item}>{t(`page.CreateOrder.category.${el.item}`)}</li>
                                ))}
                            </ul>) : ''}
                    </div>
                    <form className={style.form}>
                        <Input formValid={formValid.name} styles={{
                            width: '100%', margin: '10px 0 0'
                        }} name={'name'} placeholder={t('components.input.name_item')} onChange={handleChange} value={formData.name} />

                        {currentCategory.calc_delivery === 'kg' && currentCategory.calc_cost.includes('%')
                            ? (<>
                                <Input formValid={formValid.weight} styles={{
                                    width: '100%', margin: '20px 0 0'
                                }} name={'weight'} type={'number'} placeholder={t('components.input.weight_item')} onChange={handleChange} value={formData.weight} />
                                <Input formValid={formValid.cost} styles={{
                                    width: '100%', margin: '20px 0 0'
                                }} name={'cost'} type={'number'} placeholder={t('components.input.cost_item')} onChange={handleChange} value={formData.cost} />
                            </>)
                            : currentCategory.calc_delivery === 'kg'
                                ? (<Input formValid={formValid.weight} styles={{
                                    width: '100%', margin: '20px 0 0'
                                }} name={'weight'} type={'number'} placeholder={t('components.input.weight_item')} onChange={handleChange} value={formData.weight} />)
                                : ''}
                        {currentCategory.calc_delivery === 'item' && currentCategory.calc_cost.includes('%')
                            ? (<>
                                <Input formValid={formValid.quantity} styles={{
                                    width: '100%', margin: '20px 0 0'
                                }} name={'quantity'} type={'number'} placeholder={t('components.input.quantity_item')} onChange={handleChange} value={formData.quantity} />
                                <Input formValid={formValid.cost} styles={{
                                    width: '100%', margin: '20px 0 0'
                                }} name={'cost'} type={'number'} placeholder={t('components.input.cost_item')} onChange={handleChange} value={formData.cost} />
                            </>)
                            : currentCategory.calc_delivery === 'item'
                                ? (<Input formValid={formValid.quantity} styles={{
                                    width: '100%', margin: '20px 0 0'
                                }} name={'quantity'} type={'number'} placeholder={t('components.input.quantity_item')} onChange={handleChange} value={formData.quantity} />)
                                : ''}

                        <Input formValid={formValid.origin} styles={{
                            width: '100%', margin: '20px 0 0'
                        }} name={'origin'} placeholder={t('components.input.origin_item')} onChange={handleChange} value={formData.origin} />
                        <Input formValid={formValid.destination} styles={{
                            width: '100%', margin: '20px 0 0'
                        }} name={'destination'} placeholder={t('components.input.destination_item')} onChange={handleChange} value={formData.destination} />
                        <Textarea styles={{
                            width: '100%', margin: '20px 0 0'
                        }} name={'description'} onChange={handleChange} value={formData.description} placeholder={t('components.input.description_item')} />
                        <div className={style.block__input__file}>
                            <div className={style.body__input__file}>
                                <input className={style.input__file} type='file' name='file_item' onChange={handleFileUploads} accept='.png, .jpg, .webp' />
                                <Button text={t('button.CreateOrder.file_item')} />
                            </div>
                            {Object.keys(imageItem).length > 0 && <img className={style.file} src={imageItem.url} alt='Uploaded' />}
                        </div>
                        {cost ? (<>
                            <p className={style.text__cost}>
                                <Trans
                                    i18nKey={'page.CreateOrder.cost'}
                                    components={{
                                        accent: <span className={style.accent} />
                                    }}
                                    values={{ cost: cost }}
                                />
                            </p>
                            <Button styles={{
                                display: 'block', margin: '35px auto 0', width: '250px'
                            }} onClick={handleSubmit} text={t('button.CreateOrder.payment')} />
                        </>) : minSum !== null && minSum
                            ? (<>
                                <p className={style.min__sum}>
                                    <Trans
                                        i18nKey={'page.CreateOrder.min_sum'}
                                        components={{
                                            accent: <span className={style.accent} />
                                        }}
                                        values={{ minSum: minSum }}
                                    />
                                </p>
                                <Button styles={{
                                    display: 'block', margin: '35px auto 0', width: '250px'
                                }} onClick={сostСalculation} text={t('button.CreateOrder.calc')} />
                            </>) : minSum !== null && !minSum
                                ? <Button styles={{
                                    display: 'block', margin: '35px auto 0', width: '250px'
                                }} onClick={сostСalculation} text={t('button.CreateOrder.calc')} /> : ''}
                    </form>
                </div>
            </main >
            <Footer />
        </div >
    )
}

export default CreateOrder;







