import React from 'react';

class CartItem extends React.Component {
    constructor () {
        super();
    }
    increaseQuantity = () => {
        // console.log("this.state", this.state);
        this.setState((prevState) => {
            return {
                qty: prevState.qty + 1,
            }
        })
    }

    decreaseQuantity = () => {
        this.setState((prevState) => {
            return {
                qty: prevState.qty>0?prevState.qty - 1:0,
            }
        })
    }



    render() {
        const {price, title, qty } = this.props.product;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
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
                         onClick={ this.increaseQuantity } 
                        />
                        <img 
                         alt="decrease" 
                         className="action-icons" 
                         src="https://www.flaticon.com/svg/static/icons/svg/561/561179.svg"
                         onClick={ this.decreaseQuantity }                             
                        />
                        <img 
                         alt="delete" 
                         className="action-icons" 
                         src="https://www.flaticon.com/svg/static/icons/svg/1345/1345874.svg"
                        />
                    </div>
                </div>
            </div>
        );
    }
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