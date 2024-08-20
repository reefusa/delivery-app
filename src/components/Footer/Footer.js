import React from "react";
import style from './Footer.module.scss';
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.body}>
                    <h6 className={style.logo}>{t('components.Footer')} </h6>
                </div>
            </div>
        </footer>
    )
}

export default Footer;