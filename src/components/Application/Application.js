import { Link } from 'react-router-dom';
import style from './Application.module.scss';

function Application(props) {
    return (
        <Link to={'/order'} className={style.application}>
            <img className={style.img} src={`/media/orders/${props.img}`} />
            <div className={style.block_info}>
                <div className={style.info}>
                    <p className={style.title}>{props.title}</p>
                    <p className={style.cost}>{props.cost}</p>
                </div>
                <p className={style.weight}>Вес: {props.weight}</p>
                <p className={style.destination}>{props.destination}</p>
            </div>
            <p className={style.description}>Описание: {props.description}</p>
        </Link>
    )
}

export default Application;