import { Link } from 'react-router-dom';
import style from './Application.module.scss';
import { useEffect, useState } from 'react';
import { reqGetFile } from '../../utils/api/sendApiRequest';
import { Trans } from 'react-i18next';

function Application(props) {
    const { name, totalCost, weigth, quantity, cost, origin, destination, description } = props;
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        const getImage = async () => {
            const image = await reqGetFile('item', props.img);
            if (image) {
                setImageUrl(URL.createObjectURL(image));
            }
        }
        getImage();
    }, []);

    let text;
    let values;

    if (weigth) {
        text = 'components.Application.weigth'
        values = weigth;
    } if (quantity) {
        text = 'components.Application.quantity'
        values = quantity;
    }

    return (
        <Link to={`/${props.role}/order/${props.id}`} className={style.application}>
            {imageUrl && <img className={style.img} src={imageUrl} />}
            <div className={style.block_info}>
                <p className={style.title}>{name}</p>
                <p className={style.cost}>{totalCost}</p>
                <p className={style.weigth}>
                    <Trans
                        i18nKey={text}
                        values={{ values }}
                    />
                </p>
            </div>
            <p className={style.destination}>{`${origin}/${destination}`}</p>
            <p className={style.description}>{description && <Trans
                i18nKey={'components.Application.description'}
                values={{ description }} />}
            </p>
        </Link>
    )
}

export default Application;