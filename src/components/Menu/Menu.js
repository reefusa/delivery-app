import React, { useState } from 'react'
import style from './Menu.module.scss'
import { Link } from "react-router-dom"

function Menu() {
    const [burgerToggle, setBurgerToggle] = useState(false);

    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.body}>
                    <ul className={window.screen.width < 768 ? (burgerToggle ? `${style.menu} ${style.menu__active}` : style.menu) : style.menu} >
                        {window.screen.width > 768 && <li><Link to='/' className={style.logo}><img className={style.logo__svg} src='/media/svg/delivery-logo.svg' /><h1>TransAtlantic Express</h1></Link></li>}
                        <li><Link to='/' className={style.link}>Главная</Link ></li>
                        <li><Link to='/orders' className={style.link}>Заказы</Link ></li>
                        <li><Link to='/greeting' className={style.link}>Как это работает</Link ></li>
                        <li><Link to='/account' className={style.link}>Аккаунт</Link ></li>
                        {window.screen.width < 768 && <Link to='/' className={style.telegram}>Перейти в Telegram</Link >}
                    </ul>
                    {window.screen.width > 768 && <Link to='/' className={style.telegram}>Перейти в Telegram</Link >}
                    {window.screen.width < 768 && <Link to='/' className={style.logo}><img className={style.logo__svg} src='/media/svg/delivery-logo.svg' />Ligth</Link>}
                    <div className={burgerToggle ? `${style.burger} ${style.burger__active}` : `${style.burger} ${style.burge__revers}`} onClick={() => setBurgerToggle(!burgerToggle)}><span></span></div>
                </div>
            </div >
        </header >
    )
}

export default Menu;