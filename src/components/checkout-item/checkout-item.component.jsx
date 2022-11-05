import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-item.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartitem }) => {
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);
    const { id, name, imageUrl, quantity, price } = cartitem;
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemFromCart(cartitem)}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItemToCart(cartitem)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={() => clearItemFromCart(cartitem)}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;