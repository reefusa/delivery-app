import React, { useEffect, useState } from 'react'
import style from './Dispute.module.scss'
import Footer from '../../components/Footer/Footer'
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import { useTranslation } from 'react-i18next';
import { sendVerificationTokenRequest } from '../../utils/api/sendApiRequest';
import { useOutletContext } from 'react-router';
import { BASE_URL } from '../../utils/api/URL';

export default function Dispute() {
    const { t } = useTranslation();
    const { auth } = useOutletContext();

    const [message, setMessage] = useState([]);

    useEffect(() => {
        const getDispute = async () => {
            const url = BASE_URL + `/dispute/view/`;
            const data = await sendVerificationTokenRequest(url);
            if (data && data.view) {
                const groupedMessages = data.userInfo.reduce((acc, message) => {
                    if (!acc[message.chat_id]) {
                        acc[message.chat_id] = [];
                    }
                    acc[message.chat_id].push(message);
                    return acc;
                }, {});
                setMessage(groupedMessages);
            }
        }
        getDispute();
    }, []);

    return (
        <div className={style.wrapper}>
            <NavigationMenu to={`/${auth.role}`} page={t('components.NavigationMenu.Dispute')} />
            <main className={style.dispute}>
                <div className={style.container}>
                    {Object.keys(message).length !== 0 && Object.entries(message).map(([chat_id, chatMessage]) => {
                        const userIds = new Set();
                        const userNames = new Set();

                        chatMessage.forEach(el => {
                            userIds.add(el.sender_id);
                            userNames.add(el.sender_name);
                        });

                        const [userIdFirst, userIdSecond] = [...userIds];
                        const [userNameFirst, userNameSecond] = [...userNames];

                        return (
                            <div key={chat_id} className={style.chat}>
                                <div className={style.user}>
                                    <p>{userNameFirst}</p>
                                    {userNameSecond && <p>{userNameSecond}</p>}
                                </div>
                                {chatMessage.map((el, index) => {
                                    const isFirstUserMessage = el.sender_id === userIdFirst;
                                    return (
                                        <div key={index} className={`${style.message} ${isFirstUserMessage ? style.first_user : style.second_user}`}>
                                            {el.content}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    )
}
