import './product-card.styles.scss';
import Button from '../button/button.component'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-item.context';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price, id } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button
                type='button'
                buttonType='inverted'
                onClick={addProductToCart}>
                ADD TO CART
            </Button>
        </div>
    )
}

export default ProductCard;