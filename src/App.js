import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/app';
import 'firebase/firestore';

const config = require('./config');
const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


class App extends React.Component {

  constructor() {
    super();
    this.state = {
        products: [],
        loading: true,
    }
    this.db = firebase.firestore();
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     const products = snapshot.docs.map((doc) => {
    //         const data = doc.data();
    //         data['id'] = doc.id;
    //         return data;
    //     })
    //     this.setState({products, loading: false})

    //   })

    this.db
      .collection('products')
      .orderBy('price','asc')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
            const data = doc.data();
            data['id'] = doc.id;
            return data;
        })
        this.setState({products, loading: false})

      })

  }

  handleIncreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);
      // products[index].qty += 1;
      // this.setState({products: products});
      const docRef = this.db.collection('products').doc(products[index].id);
      docRef
        .update({ 
          qty: products[index].qty + 1
        })
        .then(() => {
          console.log("Update Successfuly");
        })
        .catch(err => {
          console.log(err);
        })
  }
  handleDecreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);
      // products[index].qty = (products[index].qty>0)?products[index].qty-1:0;
      // this.setState({products: products});
      const docRef = this.db.collection('products').doc(products[index].id);
      docRef
        .update({ 
          qty: (products[index].qty>0)?products[index].qty-1:0,
        })
        .then(() => {
          console.log("Update Successfuly");
        })
        .catch(err => {
          console.log(err);
        })
  }
  handleDeleteProduct = (id) => {
      const {products} = this.state;
      // const items = products.filter((item)=>item.id!==id)
      // this.setState({
      //     products: items
      // })
      const docRef = this.db.collection('products').doc(id);
      docRef
        .delete()
        .then(() => {
          console.log("Product Deleted");
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

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img:'https://www.codechef.com/sites/default/files/uploads/pictures/e404651e1715ab71569401c50147af71.jpg',
        title:'Arsh Raina',
        price: 69,
        qty: 1
      })
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Navbar 
          count={this.getCartCount()}
        />
        {/* <h1>CART</h1> */}
        {/* <button onClick={this.addProduct} style={{padding:20, fontsize: 20}}>Add a Product</button> */}
        <Cart 
          products={this.state.products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {this.state.loading && <h1>Loading Products ... </h1>}
        <div style={ {padding:10, fontSize:20 } }>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;







/**
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
 */