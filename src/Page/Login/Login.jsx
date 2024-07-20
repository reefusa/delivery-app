import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from './Login.module.scss';
import { Link } from "react-router-dom";
import { sendApiRequest } from "../../utils/api/sendApiRequest";


function Login() {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(false);
    const navigate = useNavigate();
    const initialFormData = { login: '', password: '' }
    const initialFormValid = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});
    const [formData, setFormData] = useState(initialFormData);
    const [formValid, setFormValid] = useState(initialFormValid);
    const URL = 'http://localhost:3003/login';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        handleValidateForm(name, value);
    }

    const handleValidateForm = (name, value) => {
        let nameVerification = false;
        let regex;
        if (name === 'login') {
            regex = /^[a-zA-Z0-9]+$/;
        } else if (name === 'password') {
            regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        }

        if (value.trim() !== '' && regex.test(value)) {
            nameVerification = true;
        } else {
            nameVerification = false;
        }

        if (nameVerification) {
            setFormValid({ ...formValid, [name]: true });
        } else {
            setFormValid({ ...formValid, [name]: false });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (formValid) {
        //     try {
        //         const res = await fetch(URL, {
        //             'method': 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             'body': JSON.stringify(formData)
        //         });

        //         const data = await res.json();
        //         console.log(data);
        //         setToken(data);
        //     } catch (error) {
        //         console.error('Ошибка при проверке токена', error);
        //     }
        // }

        const data = await sendApiRequest('http://localhost:3003/login', 'POST', 'application/json', formData, formValid, e);
        setToken(data);
        console.log(data);
    }

    useEffect(() => {
        if (token && token.auth) {
            navigate(`/${token.role}`, { replace: true });
        }
    }, [token]);

    return (
        <div className={`${style.wrapper} ${style.main__block}`}>
            <main className={style.login}>
                <div className={style.container}>
                    {loading
                        ? <div>Загрузка</div>
                        : (<div className={style.body}>
                            <h2 className={style.title}>Для входа введите логин и пароль</h2>
                            <form className={style.form}>
                                <div className={formValid.login ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='login' value={formData.login} onChange={handleChange} placeholder='Логин' />
                                </div>
                                <div className={formValid.password ? style.block__input : `${style.block__input} ${style.block__input__error}`}>
                                    <input type='text' name='password' value={formData.password} onChange={handleChange} placeholder='Пароль' />
                                </div>
                                <button className={style.btn} onClick={handleSubmit}>Войти</button>
                            </form>
                            <p className={style.registration}>Если ранее не пользовались сервисом, перейдите на страницу регистрации</p>
                            <Link to={'/registration'} className={style.link}>Зарегистрироваться</Link>
                        </div>)}
                </div>
            </main>
        </div>
    )
}

export default Login;