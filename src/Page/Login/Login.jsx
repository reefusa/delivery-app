import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from './Login.module.scss';
import { Link } from "react-router-dom";
import { sendApiRequest } from "../../utils/api/sendApiRequest";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../utils/api/URL";


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
    const { t } = useTranslation();

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

        let isError = false;

        // Object.entries(formData).forEach(([key, value]) => {
        //     if (value.trim() === '' && !isError) {
        //         alert(t('page.RegistrationForm.alert.empty_lines'));
        //         isError = true;
        //     }
        // });

        // Object.keys(formValid).forEach((el) => {
        //     if (formValid[el] === false && !isError) {
        //         alert(t('page.RegistrationForm.alert.incorrectly_filled'));
        //         isError = true;
        //     }
        // });
        // console.log(BASE_URL + `/login`);

        if (!isError) {
            const data = await sendApiRequest(BASE_URL + `/login`, 'POST', 'application/json', formData, formValid, e);
            if (data) {
                setToken(data);
            }
        }
    }

    useEffect(() => {
        if (token && token.auth) {
            const decoded = jwtDecode(token.accessToken);
            localStorage.setItem('accessToken', token.accessToken);
            localStorage.setItem('refreshToken', token.refreshToken);
            navigate(`/${decoded.role}`, { replace: true });
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