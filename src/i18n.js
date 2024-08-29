import i18n from 'i18next';
import { Component } from 'react';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "welcome": "Добро пожаловать",
            "description": "Это описание на русском языке.",
            "company_name": "Alnapa",
            // page  // page.Home
            "page.Home.title": "If you have an account, log in to your profile",
            // page.RegistrationForm
            "page.RegistrationForm.agreement": `By clicking "Register, you confirm that you have read and fully agree to the terms of the user agreement`,
            "page.RegistrationForm.alert.incorrectly_filled": "Fields are not filled in correctly",
            "page.RegistrationForm.alert.empty_lines": "Not all fields are filled in",
            "page.RegistrationForm.alert.empty_files": "Did not add files",
            "page.RegistrationForm.alert.user_exists": "Such a user exists",
            "page.RegistrationForm.alert.error": "Something went wrong",
            "page.RegistrationForm.alert.number_invalid": "The number is invalid",
            "page.RegistrationForm.alert.email_invalid": "The mail is invalid",
            // page.Registration
            "page.Registration.title": "To register, select the appropriate item",
            // page.Customer
            "page.Customer.title": `Welcome {{name}} to the page of created orders`,
            "page.Customer.notification.empty": "You haven't created any orders yet",
            "page.Customer.notification.error": "Some kind of error, please contact the site owner",
            // page.Order
            "page.Order.weigth": "Weight: <accent>{{weight}}</accent>",
            "page.Order.quantity": "Number of items: <accent>{{quantity}}</accent>",
            "page.Order.origin": "Delivery from: <accent>{{origin}}</accent>",
            "page.Order.destination": "Delivery to: <accent>{{destination}}</accent>",
            "page.Order.price": "Cost: <accent>{{price}}</accent>",
            "page.Order.delivery_status": "Product status: <accent>{{delivery_status}}</accent>",
            "page.Order.description": "Description: <accent>{{description}}</accent>",
            // page.CreateOrder
            "page.CreateOrder.category.choice": "Select a category",
            "page.CreateOrder.category.ordinary_clothes": "Ordinary clothes",
            "page.CreateOrder.category.luxury_clothes": "Luxury clothes",
            "page.CreateOrder.category.unboxed_shoes": "Unboxed shoes",
            "page.CreateOrder.category.boxed_shoes": "Boxed shoes",
            "page.CreateOrder.category.luxury_shoes": "Luxury shoes",
            "page.CreateOrder.category.unboxed_bag": "Unboxed bag",
            "page.CreateOrder.category.boxed_bag": "Boxed bag",
            "page.CreateOrder.category.luxury_bag": "Luxury bag",
            "page.CreateOrder.category.jewelry": "Jewelry",
            "page.CreateOrder.category.glasses": "Glasses",
            "page.CreateOrder.category.whatch": "Whatch",
            "page.CreateOrder.category.ring": "Ring",
            "page.CreateOrder.category.bracelet": "Bracelet",
            "page.CreateOrder.category.parfum": "Parfum, piece",
            "page.CreateOrder.category.cosmetics": "Cosmetics",
            "page.CreateOrder.category.technо_electronics": "Technо - electronics",
            "page.CreateOrder.category.laptop": "Laptop",
            "page.CreateOrder.category.computer": "Computer",
            "page.CreateOrder.category.iphone": "iphone 2yo and newer",
            "page.CreateOrder.category.ipad": "ipad  2yo and newer",
            "page.CreateOrder.category.samsung": "samsung  2yo and newer",
            "page.CreateOrder.category.pixel": "pixel  2yo and newer",
            "page.CreateOrder.category.display": "Display/TV",
            "page.CreateOrder.category.cell_phone": "Phone 2yo and older",
            "page.CreateOrder.category.key": "key/keys",
            "page.CreateOrder.category.spare_parts": "Spare parts",
            "page.CreateOrder.category.medicines": "Medicines, packaging",
            "page.CreateOrder.category.antibiotics": "Antibiotics, packaging",
            "page.CreateOrder.category.dietary_supplement": "Dietary supplements",
            "page.CreateOrder.category.tablet": "Small packages of tablets",
            "page.CreateOrder.category.food": "food",
            "page.CreateOrder.category.docs": "docs",
            "page.CreateOrder.category.driving_license": "Driving license",
            "page.CreateOrder.category.passport": "Passport",
            "page.CreateOrder.category.power_attorney": "Power of attorney",
            "page.CreateOrder.category.military_ID": "Military ID",
            "page.CreateOrder.category.two_docs_identical": "2 docs from one sender",
            "page.CreateOrder.category.three_docs_identical": "3 docs from one sender",
            "page.CreateOrder.category.four_docs_identical": "4 docs from one sender",
            "page.CreateOrder.category.two_docs_same_person": "2 docs for same person",
            "page.CreateOrder.category.tree_docs_same_person": "3 docs for same person",
            "page.CreateOrder.category.four_docs_same_person": "4 docs for same person",
            "page.CreateOrder.alert.file_too_big": "",
            "page.CreateOrder.alert.file_too_big": "",
            "page.CreateOrder.alert.pay_completed": "The payment has been completed :)",
            "page.CreateOrder.alert.pay_failed": "Payment failed",
            "page.CreateOrder.alert.empty_files": "Did not add files",
            "page.CreateOrder.alert.empty_lines": "Not all fields are filled in",
            "page.CreateOrder.alert.incorrectly_filled": "Fields are not filled in correctly",
            "page.CreateOrder.min_sum": "Minimum order amount: <accent>{{minSum}}</accent>",
            "page.CreateOrder.cost": "To be paid: <accent>{{cost}}</accent>",
            // page.Greeting
            "page.Greeting.description": `Welcome to <accent>{{company_name}}</accent> — your reliable partner in the world of international deliveries between Russia and the USA. We are proud that our service is based on strict compliance with international and national laws, ensuring the safety and legal purity of each transportation.
            Our services include:
            - Express delivery of documents and small parcels: Your shipments will reach the destination in the shortest possible time thanks to our optimized logistics network.
            - Transportation of bulky goods and specialized goods: We have everything necessary for the transportation of goods of any complexity, observing all requirements and regulations.
            - A full range of customs services: Our team of experts will help you with the preparation of all necessary documents, compliance with customs duties and taxes, as well as security issues when transporting goods across the border.`,
            // page.Account
            "page.Account.alert.empty_line": "Fill in the field before sending",
            "page.Account.alert.incorrectly_filled": "The data is filled in incorrectly",
            // page.Admin
            "page.Admin.greeting": "Welcome {{name}}",
            // components
            "components.Footer": "©All rights reserved",
            // components.Menu
            "components.Menu.account": "Account",
            "components.Menu.customer": "customer",
            "components.Menu.orders": " Orders",
            "components.Menu.help": "How does it work?",
            "components.Menu.telegram": "Go to Telegram",
            "components.Menu.courier": "Customer",
            "components.Menu.courier_orders": "Requests",
            "components.Menu.courier_his_orders": "Orders",
            // Application
            "components.Application.description": "Description: {{description}}",
            "components.Application.quantity": "Qty: {{values}}",
            "components.Application.weigth": "Weight: {{values}} g.",
            // NavigationMenu
            "components.NavigationMenu.Home": "Home Page",
            // NavigationMenu.Dispute
            "components.NavigationMenu.Dispute": "Dispute Page",
            // NavigationMenu.RegistrationForm
            "components.NavigationMenu.RegistrationForm.courier": "Courier Registration",
            "components.NavigationMenu.RegistrationForm.customer": "Customer Registration",
            "components.NavigationMenu.Registration": "Registration",
            "components.NavigationMenu.Greeting": "How does it work?",
            "components.NavigationMenu.Order": "Order Page",
            "components.NavigationMenu.CreateOrder": "Create Order",
            // NavigationMenu.Account
            "components.NavigationMenu.Account": "Account",
            "components.NavigationMenu.Account.courier": "courier",
            "components.NavigationMenu.Account.customer": "customer",
            // NavigationMenu.OrderCourierWork
            "components.NavigationMenu.OrderCourierWork": "Orders in Progress",
            // NavigationMenu.Admin
            "components.NavigationMenu.Admin": "Admin Page",
            // Input
            "components.input.name": "Name",
            "components.input.last_name": "Last Name",
            "components.input.patronymic": "Patronymic",
            "components.input.email": "Email",
            "components.input.tel_rus": "Phone number RUS",
            "components.input.tel_use": "Phone number USA",
            "components.input.zelle": "Zelle",
            "components.input.card_withdrawal_courier": "Card for Withdrawal",
            "components.input.cart_number": "Card Number",
            "components.input.cart_date": "Expiration Date",
            "components.input.cart_zip": "Card Data",
            "components.input.cart_cvv": "CVV",
            "components.input.name_item": "Enter Name",
            "components.input.cost_item": "Item Cost",
            "components.input.quantity_item": "Quantity of Items",
            "components.input.weight_item": "Specify Weight in Grams",
            "components.input.origin_item": "Shipping From",
            "components.input.destination_item": "Shipping To",
            "components.input.description_item": "Additional Information",
            // Button
            // button.Home
            "button.Home.login": "Login",
            "button.Home.registered": "Register",
            // button.RegistrationForm
            "button.RegistrationForm.confirmation": "Confirm",
            "button.RegistrationForm.userpic": "Upload Profile Picture",
            "button.RegistrationForm.passport": "Upload ID / Passport",
            "button.RegistrationForm.deposit": "Make a Deposit",
            "button.RegistrationForm.registration": "Register",
            // button.Greeting
            "button.Greeting.return": "Return to Home Page",
            "button.Greeting.go": "Got it, Go to Login and Registration Page",
            // button.Registration
            "button.Registration.courier": "Courier",
            "button.Registration.customer": "Customer",
            // button.Customer
            "button.Customer.addGoods": "Create New Order",
            // button.Order
            "button.Order.submit_order": "Submit Order",
            "button.Order.get_order": "Take Order",
            "button.Order.accept_order": "Accept Order",
            "button.Order.submit_order": "Submit Order",
            "button.Order.open_dispute": "Open Dispute",
            // button.CreateOrder
            "button.CreateOrder.file_item": "Add Item Photo",
            "button.CreateOrder.payment": "Pay and Place Order",
            "button.CreateOrder.calc": "Calculate Cost",
            // button.Account
            "button.Account.change": "Change",
            "button.Account.delete_info": "Delete ID/Passport",
            "button.Account.withdraw_Money": "Withdraw Money",
            "button.Account.logout": "Logout",
            "button.Account.delete": "Delete Account",
            "button.Chat.send_message": "Send",
            // button.Admin
            "button.Admin.viewing_applications": "View Applications",
            "button.Admin.logout": "Logout",
            // button.Menu
            "button.Menu.language": "Change Language"
        }
    },
    ru: {
        translation: {
            "welcome": "Добро пожаловать",
            "description": "Это описание на русском языке.",
            "company_name": "Alnapa",
            // page  // page.Home
            "page.Home.title": "Если у вас есть учетная запись, войдите в свой профиль",
            // page.RegistrationForm
            "page.RegistrationForm.agreement": "Нажимая «Зарегистрироваться, вы подтверждаете, что ознакомлены и полностью согласны с условиями пользовательского соглашения.",
            "page.RegistrationForm.alert.incorrectly_filled": "Не корректно заполнены поля",
            "page.RegistrationForm.alert.empty_lines": "Не все поля заполненны",
            "page.RegistrationForm.alert.empty_files": "Не добавили файлы",
            "page.RegistrationForm.alert.user_exists": "Такой пользователь существует",
            "page.RegistrationForm.alert.error": "Что-то пошло не так",
            "page.RegistrationForm.alert.number_invalid": "Номер недействителен",
            "page.RegistrationForm.alert.email_invalid": "Почта недействительна",
            // page.Registration
            "page.Registration.title": "Для регистрации выберите подходящий пункт",
            // page.Customer
            "page.Customer.title": `Добро пожаловать {{name}} на страницу созданных заказов`,
            "page.Customer.notification.empty": "Вы пока не создавали заказы",
            "page.Customer.notification.error": "Какая-то ошибка, обратитесь к владельцу сайта",
            // page.Order
            "page.Order.weigth": "Вес: <accent>{{weigth}}</accent>",
            "page.Order.quantity": "Кол. вещей: <accent>{{quantity}}</accent>",
            "page.Order.origin": "Доставка из: <accent>{{origin}}</accent>",
            "page.Order.destination": "Доставка в: <accent>{{destination}}</accent>",
            "page.Order.price": "Стоимость: <accent>{{price}}</accent>",
            "page.Order.delivery_status": "Статус товара: <accent>{{delivery_status}}</accent>",
            "page.Order.description": "Описание: <accent>{{description}}</accent>",
            // page.CreateOrder
            "page.CreateOrder.category.choice": "Выберите категорию",
            "page.CreateOrder.category.ordinary_clothes": "Одежда обычная",
            "page.CreateOrder.category.luxury_clothes": "Одежда брендовая",
            "page.CreateOrder.category.unboxed_shoes": "Обувь без коробки",
            "page.CreateOrder.category.boxed_shoes": "Обувь в коробке",
            "page.CreateOrder.category.luxury_shoes": "Обувь брендовая",
            "page.CreateOrder.category.unboxed_bag": "Сумка без коробки",
            "page.CreateOrder.category.boxed_bag": "Сумка в коробке",
            "page.CreateOrder.category.luxury_bag": "Сумка брендвая",
            "page.CreateOrder.category.jewelry": "Украшения",
            "page.CreateOrder.category.glasses": "Очки",
            "page.CreateOrder.category.whatch": "Часы",
            "page.CreateOrder.category.ring": "Kольцо",
            "page.CreateOrder.category.bracelet": "Браслет",
            "page.CreateOrder.category.parfum": "Парфюм,шт",
            "page.CreateOrder.category.cosmetics": "Косметика",
            "page.CreateOrder.category.technо_electronics": "Техника - электроника",
            "page.CreateOrder.category.laptop": "Ноутбук",
            "page.CreateOrder.category.computer": "Компьютер",
            "page.CreateOrder.category.iphone": "Iphone 2yo and newer",
            "page.CreateOrder.category.ipad": "Ipad  2yo and newer",
            "page.CreateOrder.category.samsung": "Samsung  2yo and newer",
            "page.CreateOrder.category.pixel": "Pixel  2yo and newer",
            "page.CreateOrder.category.display": "Монитор/телевизор",
            "page.CreateOrder.category.cell_phone": "Телефон 2yo and older",
            "page.CreateOrder.category.key": "Ключ/ключи",
            "page.CreateOrder.category.spare_parts": "Запчасти",
            "page.CreateOrder.category.medicines": "Лекарства, упаковка",
            "page.CreateOrder.category.antibiotics": "Антибиотики, упаковка",
            "page.CreateOrder.category.dietary_supplement": "БАДЫ",
            "page.CreateOrder.category.tablet": "Маленькие упаковки таблеток",
            "page.CreateOrder.category.food": "Продукты",
            "page.CreateOrder.category.docs": "Документы любые",
            "page.CreateOrder.category.driving_license": "Права",
            "page.CreateOrder.category.passport": "Паспорт",
            "page.CreateOrder.category.power_attorney": "Доверенность",
            "page.CreateOrder.category.military_ID": "Военный билет",
            "page.CreateOrder.category.two_docs_identical": "Два документа одинаковых",
            "page.CreateOrder.category.three_docs_identical": "Три документа одинаковых",
            "page.CreateOrder.category.four_docs_identical": "Четыре документа одинаковых",
            "page.CreateOrder.category.two_docs_same_person": "Два документа на одного человека",
            "page.CreateOrder.category.tree_docs_same_person": "Три документа на одного человека",
            "page.CreateOrder.category.four_docs_same_person": "Четыре документа на одного человека",
            "page.CreateOrder.alert.file_too_big": "",
            "page.CreateOrder.alert.file_too_big": "",
            "page.CreateOrder.alert.pay_failed": "Оплата не прошла",
            "page.CreateOrder.alert.pay_completed": "Оплата прошла успешно :)",
            "page.CreateOrder.alert.empty_files": "Не добавили файлы",
            "page.CreateOrder.alert.empty_lines": "Не все поля заполненны",
            "page.CreateOrder.alert.incorrectly_filled": "Не корректно заполнены поля",
            "page.CreateOrder.min_sum": "Минимальная сумма заказа: <accent>{{minSum}}</accent>",
            "page.CreateOrder.cost": "К оплате:: <accent>{{cost}}</accent>",
            // page.Greeting
            "page.Greeting.description": `Добро пожаловать в  <accent>{{company_name}}</accent> — вашего надежного партнера в мире международных доставок между Россией и США. Мы гордимся тем, что наш сервис строится на основе строгого соблюдения международных и национальных законов, обеспечивая безопасность и юридическую чистоту каждой перевозки.
                        Наши услуги включают:
                        - Экспресс-доставка документов и мелких посылок: Ваши отправления достигнут адресата в кратчайшие сроки благодаря нашей оптимизированной логистической сети.
                        - Перевозка крупногабаритных грузов и специализированных товаров: Мы обладаем всем необходимым для транспортировки грузов любой сложности, соблюдая все требования и регуляции.
                        - Полный комплекс таможенных услуг: Наша команда экспертов поможет вам в оформлении всех необходимых документов, соблюдении таможенных пошлин и налогов, а также в вопросах безопасности при перевозке товаров через границу.
                        - Онлайн-трекинг каждой посылки: Вы всегда будете в курсе, где находится ваша посылка, благодаря нашей системе онлайн-отслеживания.

                        Безопасность — наш приоритет:
                        - Мы используем передовые технологии шифрования для защиты ваших данных.
                        - Наши логистические центры оборудованы современными системами безопасности.
                        - Все грузы застрахованы от момента приема до доставки получателю.

                        Выбирая TransAtlantic Express, вы выбираете скорость, надежность и уверенность в сохранности каждой отправки. С нами ваш груз в надежных руках, а соблюдение законов о таможенной и торговой защите США, Таможенного кодекса ЕАЭС, Федерального закона "О таможенном регулировании в Российской Федерации", а также международных соглашений, таких как GATT и двусторонние торговые соглашения между Россией и США, гарантирует, что каждый этап транспортировки будет выполнен с высочайшим уровнем профессионализма и внимания к деталям. С TransAtlantic Express вы можете быть уверены, что ваш груз доставлен правильно и вовремя.`,
            // page.Account
            "page.Account.alert.empty_line": "Заполните поле перед отправкой",
            "page.Account.alert.incorrectly_filled": "Данные неверно заполнены",
            // page.Admin
            "page.Admin.greeting": "Добро пожаловать {{name}}",
            // components
            "components.Footer": "©Все права защищены",
            // components.Menu
            "components.Menu.account": "Аккаунт",
            "components.Menu.customer": "заказчик",
            "components.Menu.orders": " Заказы",
            "components.Menu.help": "Как это работает ?",
            "components.Menu.telegram": "Перейти в Telegram",
            "components.Menu.courier": "Заказчик",
            "components.Menu.courier_orders": "Запросы",
            "components.Menu.courier_his_orders": "Заказы",
            // Application
            "components.Application.description": "Описание: {{description}}",
            "components.Application.quantity": "Кол. вещей: {{values}}",
            "components.Application.weigth": "Вес: {{values}} гр.",
            // NavigationMenu
            "components.NavigationMenu.Home": "Главная страница",
            // NavigationMenu.Dispute
            "components.NavigationMenu.Dispute": "Страница заявок",
            // NavigationMenu.RegistrationForm
            "components.NavigationMenu.RegistrationForm.courier": "Регистрация Курьера",
            "components.NavigationMenu.RegistrationForm.customer": "Регистрация Заказчика",
            "components.NavigationMenu.Registration": "Регистрация",
            "components.NavigationMenu.Greeting": "Как это работает ?",
            "components.NavigationMenu.Order": "Страница товара",
            "components.NavigationMenu.CreateOrder": "Создание товара",
            // NavigationMenu.Account
            "components.NavigationMenu.Account": "Аккаунт",
            "components.NavigationMenu.Account.courier": "курьера",
            "components.NavigationMenu.Account.customer": "заказчика",
            // NavigationMenu.OrderCourierWork
            "components.NavigationMenu.OrderCourierWork": "Заказы в работе",
            // NavigationMenu.Admin
            "components.NavigationMenu.Admin": "Административная страница",
            // Input
            "components.input.name": "Имя",
            "components.input.last_name": "Фамилия",
            "components.input.patronymic": "Отчество",
            "components.input.email": "Email",
            "components.input.tel_rus": "Тел rus",
            "components.input.tel_use": "Тел use",
            "components.input.zelle": "Zelle",
            "components.input.card_withdrawal_courier": "Карта для вывода средст",
            "components.input.cart_number": "Номер карты",
            "components.input.cart_date": "Срок",
            "components.input.cart_zip": "Данные карты",
            "components.input.cart_cvv": "CVV",
            "components.input.name_item": "Введите название",
            "components.input.cost_item": "Стоимость товара",
            "components.input.quantity_item": "Колличество вещей",
            "components.input.weight_item": "Укажите вес в граммах",
            "components.input.origin_item": "Доставка из",
            "components.input.destination_item": "Доставка в",
            "components.input.description_item": "Дополнительная информация",
            // Button  // button.Home
            "button.Home.login": "Войти",
            "button.Home.registered": "Зарегистрироваться",
            // button.RegistrationForm
            "button.RegistrationForm.confirmation": "Подтвердить",
            "button.RegistrationForm.userpic": "Загрузить фото лица",
            "button.RegistrationForm.passport": "Загрузить ID / паспорт",
            "button.RegistrationForm.deposit": "Внести депозит",
            "button.RegistrationForm.registration": "Зарегистрироваться",
            // button.Greeting
            "button.Greeting.return": "Вернуться на главную страницу",
            "button.Greeting.go": "Все понятно, перейти на страницу входа и регистрации",
            // button.Registration
            "button.Registration.courier": "Курьер",
            "button.Registration.customer": "Заказчик",
            // button.Customer
            "button.Customer.addGoods": "Создать новый заказ",
            // button.Order
            "button.Order.submit_order": "Сдать заказ",
            "button.Order.get_order": "Взять в работу",
            "button.Order.accept_order": "Принять заказ",
            "button.Order.submit_order": "Сдать заказ",
            "button.Order.open_dispute": "Открыть спор",
            // button.CreatrOrder
            "button.CreateOrder.file_item": "Добавить фото товара",
            "button.CreateOrder.payment": "Оплатить и разместить заказ",
            "button.CreateOrder.calc": "Расчитать стоимость",
            // button.Account
            "button.Account.change": "Изменить",
            "button.Account.delete_info": "Удалить ID/паспорта",
            "button.Account.withdraw_Money": "Вывести деньги",
            "button.Account.logout": "Выйти из аккаунта",
            "button.Account.delete": "Удалить аккаунт",
            "button.Chat.send_message": "Отправить",
            // button.Admin
            "button.Admin.viewing_applications": "Просмотр заявок",
            "button.Admin.logout": "Выйти из аккаунта",
            // button.Menu
            "button.Menu.language": "Изменить язык",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
