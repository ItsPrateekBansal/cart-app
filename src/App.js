import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
        products: [
            {
                price: 99,
                title: 'Watch',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
                id: 1
            },
            {
                price: 999,
                title: 'Mobile Phone',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=967&q=80',
                id: 2,
            },
            {
                price: 10000,
                title: 'Laptop',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                id: 3,
            }
        ],
    }
  }
  handleIncreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);
      products[index].qty += 1;
      this.setState({products: products});
  }
  handleDecreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);
      products[index].qty = (products[index].qty>0)?products[index].qty-1:0;
      this.setState({products: products});
  }
  handleDeleteProduct = (id) => {
      const {products} = this.state;
      const items = products.filter((item)=>item.id!==id)
      this.setState({
          products: items
      })
  }
  getCartCount = () => {
    const {products} = this.state;
    let count = 0;
    products.forEach((product)=>{
      count += product.qty;
    })
    return count;
  }
  getCartTotal = () => {
    const {products} = this.state;
    let cartTotal = 0;
    products.forEach((product) => {
      cartTotal += product.qty*product.price
    })
    return cartTotal;
  }

  render() {
    return (
      <div className="App">
        <Navbar 
          count={this.getCartCount()}
        />
        {/* <h1>CART</h1> */}
        <Cart 
          products={this.state.products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={ {padding:10, fontSize:20 } }>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
