import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import style from './Greeting.module.scss';

function Greeting() {
    return (
        <div className={style.wrapper}>
            <Menu />
            <main className={style.main}>
                <div className={style.greeting}>
                    {/* Добро пожаловать в TransAtlantic Express — вашего надежного партнера в мире международных доставок между Россией и США. Мы предлагаем удобный и безопасный сервис доставки товаров любого размера и веса, обеспечивая их сохранность на каждом этапе пути.

                    Наши услуги:

                    Экспресс-доставка документов и мелких посылок
                    Перевозка крупногабаритных грузов и специализированных товаров
                    Полный комплекс таможенных услуг
                    Онлайн-трекинг каждой посылки для вашего удобства
                    Безопасность — наш приоритет:

                    Мы используем передовые технологии шифрования для защиты ваших данных
                    Наши логистические центры оборудованы современными системами безопасности
                    Все грузы застрахованы от момента приема до доставки получателю
                    Выбирая TransAtlantic Express, вы выбираете скорость, надежность и уверенность в сохранности каждой отправки. С нами ваш груз в надежных руках! */}

                    Добро пожаловать в TransAtlantic Express — вашего надежного партнера в мире международных доставок между Россией и США. Мы гордимся тем, что наш сервис строится на основе строгого соблюдения международных и национальных законов, обеспечивая безопасность и юридическую чистоту каждой перевозки.

                    Наши услуги включают:
                    - Экспресс-доставка документов и мелких посылок: Ваши отправления достигнут адресата в кратчайшие сроки благодаря нашей оптимизированной логистической сети.
                    - Перевозка крупногабаритных грузов и специализированных товаров: Мы обладаем всем необходимым для транспортировки грузов любой сложности, соблюдая все требования и регуляции.
                    - Полный комплекс таможенных услуг: Наша команда экспертов поможет вам в оформлении всех необходимых документов, соблюдении таможенных пошлин и налогов, а также в вопросах безопасности при перевозке товаров через границу.
                    - Онлайн-трекинг каждой посылки: Вы всегда будете в курсе, где находится ваша посылка, благодаря нашей системе онлайн-отслеживания.

                    Безопасность — наш приоритет:
                    - Мы используем передовые технологии шифрования для защиты ваших данных.
                    - Наши логистические центры оборудованы современными системами безопасности.
                    - Все грузы застрахованы от момента приема до доставки получателю.

                    Выбирая TransAtlantic Express, вы выбираете скорость, надежность и уверенность в сохранности каждой отправки. С нами ваш груз в надежных руках, а соблюдение законов о таможенной и торговой защите США, Таможенного кодекса ЕАЭС, Федерального закона "О таможенном регулировании в Российской Федерации", а также международных соглашений, таких как GATT и двусторонние торговые соглашения между Россией и США, гарантирует, что каждый этап транспортировки будет выполнен с высочайшим уровнем профессионализма и внимания к деталям. С TransAtlantic Express вы можете быть уверены, что ваш груз доставлен правильно и вовремя.

                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Greeting;