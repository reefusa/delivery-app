import React from 'react'
import style from './NavigationMenu.module.scss';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import { t } from 'i18next';

export default function NavigationMenu(props) {
    const selectMainLanguage = async () => {
        if (i18n.language === 'ru') {
            await i18n.changeLanguage('en');
        } else {
            await i18n.changeLanguage('ru');
        }
        console.log(t('welcome'));
    };

    return (
        <div className={style.menu}>
            <div className={style.container}>
                <div className={style.body}>
                    {props.to && (<Link to={props.to} className={style.link}><img className={style.svg__arrow} src='/media/svg/back.svg' /></Link>)}
                    <h1 className={style.title}>{props.page}</h1>
                    <button><img className={style.svg__translate} onClick={selectMainLanguage} src='/media/svg/language.svg' /></button>
                </div>
            </div>
        </div>
    )
}
