const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.TElEGRAM_BOT_TOKEN);
let userId = process.env.TELEGRAM_CHAT_ID_ALEX;

bot.command('start', async (ctx) => {
    await ctx.reply('Привет, я бот Alnapa');
    userId = ctx.from.id
});

bot.action(/req_update_passport_api:(.+):(.+):(.+)/, async (ctx) => {
    const id = ctx.match[1];
    const role = ctx.match[2];
    const name = ctx.match[3];
    try {
        await ctx.answerCbQuery('Запрос выполняется ...');

        const URL = process.env.URL + `/account/update/verificatoin/passport?id=${id}&role=${role}&name=${name}`;
        const res = await fetch(URL, { method: 'GET' });
        const data = await res.json();

        if (res.ok && data.update) {
            await ctx.reply(`База данных обновлена, пользователь *${data.name}* пользователь прошел верификацию`, {
                parse_mode: 'Markdown'
            });
        } else if (!data.update) {
            await ctx.reply(`У пользователя *${data.name}* уже обновлены паспортные данные, он прошел верификацию`, {
                parse_mode: 'Markdown'
            });
        } else {
            await ctx.reply(`Произошла ошибка при обновлении базы данных для пользователя *${data.name}*.`, {
                parse_mode: 'Markdown'
            });
        }
    } catch (error) {
        console.log(`Какая-то ошибка: ${error}`);
    }
});

const sendMessageTg = async (message) => {
    if (userId) {
        try {
            await bot.telegram.sendMessage(userId, message);
        } catch (error) {
            console.log(`Какая-то ошибка ${error}`);
        }
    }
}

const sendButtonTg = async (message, textButton) => {
    if (userId) {
        try {
            await bot.telegram.sendMessage(userId, message,
                Markup.inlineKeyboard([
                    Markup.button.url(textButton, 'https://yandex.ru/')
                ])
            )
        } catch (error) {
            console.log(error);
        }
    }
}

const sendPhotoForVerification = async (file) => {
    if (userId) {
        try {
            await bot.telegram.sendPhoto(userId, { source: file });
            console.log('Отправлен Фото');

        } catch (error) {
            console.log(`Какая-то ошибка ${error}`);
        }
    }
}

const sendDocumentForVerification = async (file) => {
    if (userId) {
        try {
            await bot.telegram.sendDocument(userId, { source: file });
            console.log('Отправлен файл');

        } catch (error) {
            console.log(`Какая-то ошибка ${error}`);
        }
    }
}

const sendMediaGroupForVerification = async (user, files, id, role) => {
    const { imageFace, imagePassport } = files;
    let name;
    let last_name;

    if (Object.keys(user).some(key => key.includes('courier'))) {
        name = user.name_courier;
        last_name = user.last_name_courier;
    }

    let mediaGroup = [];

    if (imageFace[0]) {
        mediaGroup.push({
            type: 'photo',
            media: { source: imageFace[0].path },
            caption: `Юзерпик_${last_name}_${name}`
        })
    }

    if (imagePassport) {
        for (i = 0; i < imagePassport.length; i++) {
            const file = imagePassport[i];
            mediaGroup.push({
                type: 'photo',
                media: { source: file.path },
                caption: `Паспорт_${last_name}_${name}`
            })
        }
    }

    if (mediaGroup.length > 0) {
        try {
            await bot.telegram.sendMessage(userId, `Требуется проверить паспортныые данные пользователя: ${name}`), {
                parse_mode: 'Markdown'
            };
            await bot.telegram.sendMediaGroup(userId, mediaGroup);
            await bot.telegram.sendMessage(userId,
                `Нажмите на кнопку чтобы подтвердить верификацию пользователя: ${name}`,
                Markup.inlineKeyboard([
                    Markup.button.callback('Подтвердить', `req_update_passport_api:${id}:${role}:${name}`)
                ])
            )
        } catch (error) {
            console.error('Какая-то ошибка в медии: ', error);
        }
    }
}

module.exports = { sendMessageTg, sendButtonTg, sendDocumentForVerification, sendPhotoForVerification, sendMediaGroupForVerification };

bot.launch();