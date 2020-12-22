import React from 'react';

const CartItem = (props) => {

    const {price, title, qty, img } = props.product;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img style={styles.image} src={img} />
            </div>
            <div className="left-block">
                <div style={ {fontSize:25} }>{title}</div>
                <div style={ {color: '#777'} }>Rs. {price}</div>
                <div style={ {color: '#777'} }>Qty: {qty}</div>
                <div className="cart-item-actions">
                    <img
                     alt="increase"
                     className="action-icons" 
                     src="https://www.flaticon.com/svg/static/icons/svg/992/992651.svg"
                    //  onClick={ this.increaseQuantity } 
                    onClick={() => {props.onIncreaseQuantity(props.product)}}
                    />
                    <img 
                     alt="decrease" 
                     className="action-icons" 
                     src="https://www.flaticon.com/svg/static/icons/svg/561/561179.svg"
                     onClick={ () => {props.onDecreaseQuantity(props.product)} }                             
                    />
                    <img 
                     alt="delete" 
                     className="action-icons" 
                     src="https://www.flaticon.com/svg/static/icons/svg/1345/1345874.svg"
                     onClick={ () => {props.onDeleteProduct(props.product.id)}}
                    />
                </div>
            </div>
        </div>
    );
}


const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius:4,
        backgroundColor: '#777'
    }
}

export default CartItem;