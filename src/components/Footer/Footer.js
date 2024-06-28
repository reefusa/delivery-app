import React from "react";
import style from './Footer.module.scss';

function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.body}>
                    <h6 className={style.logo}>&copy;Все права защищены</h6>
                    {/* <div className={style.info}>
                        <div className={style.networks}>
                            <a href="#"><img src="/image/svg/social-instagram-svgrepo-com.svg" /></a>
                            <a href="#"><img src="/image/svg/vk-svgrepo-com.svg" /></a>
                            <a href="#"><img src="/image/svg/odnoklassniki-svgrepo-com.svg" /></a>
                            <a href="#"><img src="/image/svg/whatsapp-svgrepo-com.svg" /></a>
                        </div>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer;