import React, { useEffect, useState } from 'react'
import style from './Menu.module.scss'
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { reqGetFile } from '../../utils/api/sendApiRequest';

function Menu(props) {
    const [burgerToggle, setBurgerToggle] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const location = useLocation();
    const { i18n, t } = useTranslation();
    useEffect(() => {
        if (['courier'].includes(location.pathname)) {
            const getImage = async () => {
                const image = await reqGetFile(`couriers`, `юзерпик_Носок.jpeg`);
                if (image) {
                    setImageUrl(URL.createObjectURL(image));
                }
            }
            getImage();
        }
    }, []);

    const selectMainLanguage = async () => {
        if (i18n.language === 'ru') {
            await i18n.changeLanguage('en');
        } else {
            await i18n.changeLanguage('ru');
        }
    };

    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.body}>
                    <ul className={window.screen.width < 768 ? (burgerToggle ? `${style.menu} ${style.menu__active}` : style.menu) : style.menu} >
                        {window.screen.width > 768 && <li><Link to='/' className={style.logo}><img className={style.logo__svg} src='/media/svg/delivery-logo.svg' /><h1>{t('company_name')}</h1></Link></li>}
                        {imageUrl && <img className={style.userpic} src={imageUrl} />}
                        {location.pathname.includes('courier') && (
                            <div className={style.text}>
                                <p className={style.name}>{props.name}/{t('components.Menu.customer')}</p>
                                <li><Link to='/courier' className={style.link}>{t('components.Menu.courier_orders')}</Link ></li>
                                <li><Link to='/courier/order/work' className={style.link}>{t('components.Menu.courier_his_orders')}</Link ></li>
                                <li><Link to='/greeting' className={style.link}>{t('components.Menu.help')}</Link ></li>
                                <li><Link to='/account' className={style.link}>{t('components.Menu.account')}</Link ></li>
                                {window.screen.width < 768
                                    && (<div className={style.block_btn}>
                                        <button className={style.language__btn} onClick={selectMainLanguage}><p className={style.language__text}>{t('button.Menu.language')}</p></button>
                                        <Link to='/' className={style.telegram}>{t('components.Menu.telegram')}</Link >
                                    </div>)}
                            </div>
                        )}
                        {location.pathname.includes('customer') && (
                            <div className={style.text}>
                                <p className={style.name}>{props.name}/{t('components.Menu.customer')}</p>
                                <li><Link to='/customer' className={style.link}> {t('components.Menu.orders')}</Link ></li>
                                <li><Link to='/greeting' className={style.link}>{t('components.Menu.help')}</Link ></li>
                                <li><Link to='/account' className={style.link}>{t('components.Menu.account')}</Link ></li>
                                {window.screen.width < 768 && (<div className={style.block_btn}>
                                    <button className={style.language__btn} onClick={selectMainLanguage}><p className={style.language__text}>{t('button.Menu.language')}</p></button>
                                    <Link to='/' className={style.telegram}>{t('components.Menu.telegram')}</Link >
                                </div>)}
                            </div>
                        )}
                    </ul>
                    {window.screen.width > 768 && (<div className={style.block_btn}>
                        <button className={style.language__btn} onClick={selectMainLanguage}><p className={style.language__text}>{t('button.Menu.language')}</p></button>
                        <Link to='/' className={style.telegram}>{t('components.Menu.telegram')}</Link >
                    </div>)}
                    {window.screen.width < 768 && <Link to='/' className={style.logo}><img className={style.logo__svg} src='/media/svg/delivery-logo.svg' />{t('company_name')}</Link>}
                    <div className={burgerToggle ? `${style.burger} ${style.burger__active}` : `${style.burger} ${style.burge__revers}`} onClick={() => setBurgerToggle(!burgerToggle)}><span></span></div>
                </div>
            </div >
        </header >
    )
}

export default Menu;