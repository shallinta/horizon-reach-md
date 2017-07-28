import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Layout from 'material-ui/Layout';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/ToolBar';
import { Dialog } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { Card, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('Cart', theme => ({
  cards: {
    display: 'flex',
  },
  card: {
    width: 300,
  },
  flexGrow: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    fontSize: 14,
  },
  action: {
    marginTop: 20,
  },
  price: {
    textAlign: 'right',
    color: theme.palette.accent[400],
  },
  paper: {
    marginTop: 100,
  },
}));

export default class Cart extends Component {

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  state = {
    openCart: false,
    products: [
      {
        name: 'Wash Machine',
        price: 699,
        like: false,
        inCart: false,
      },
      {
        name: 'Air Conditioner',
        price: 769,
        like: true,
        inCart: false,
      },
      {
        name: 'Refrigerator',
        price: 599,
        like: false,
        inCart: false,
      },
      {
        name: '《Javascript拯救世界》',
        price: 89,
        like: true,
        inCart: false,
      },
    ],
  };

  componentDidMount() {
    if (!sessionStorage.length) {
      localStorage.setItem('getProducts', Date.now());
    }
    window.addEventListener('storage', (event) => {
      let newProducts;
      switch (event.key) {
        case 'getProducts':
          this.broadcastSession();
          break;
        case 'changeProducts':
          newProducts = JSON.parse(event.newValue);
          if (newProducts === 'null') {
            newProducts = null;
          }
          if (newProducts) {
            const oldProducts = this.state.products;
            const oldCartCount = oldProducts.filter(op => op.inCart).length;
            const newCartCount = newProducts.filter(op => op.inCart).length;
            if (oldCartCount !== newCartCount) {
              this.updateProducts(newProducts);
            }
          }
          break;
        default:
      }
    });
  }

  getProductNodes() {
    const classes = this.context.styleManager.render(styleSheet);
    return this.state.products.map((product, pid) => {
      const { name, price, like, inCart } = product;
      return (
        <Layout item key={`product-${name}-${pid + 1}`}>
          <Card className={classes.card}>
            <CardMedia>
              <img src="//lorempixel.com/300/200/nature" alt="card" />
            </CardMedia>
            <CardContent>
              <h2>{name}</h2>
              <p className={classes.price}>
                $ {price}
              </p>
            </CardContent>
            <CardActions >
              <IconButton accent onClick={() => this.likeProduct(pid)}>
                { like ? 'favorite' : 'favorite_border' }
              </IconButton>
              <IconButton accent onClick={() => this.addCart(pid)}>
                { inCart ? 'shopping_cart' : 'add_shopping_cart' }
              </IconButton>
              <div className={classes.flexGrow} />
              <Button compact primary>
                Detail
                <Icon className={classes.icon}>details</Icon>
              </Button>
            </CardActions>
          </Card>
        </Layout>
      );
    });
  }

  broadcastSession() {
    console.log(this);
    localStorage.setItem('changeProducts', JSON.stringify(sessionStorage.getItem('products')));
  }

  updateProducts(products) {
    this.setState({
      products,
    });
    sessionStorage.setItem('products', products);
  }

  openCart = (r) => {
    this.setState({
      openCart: r,
    });
  };

  likeProduct(index) {
    const products = Array.from(this.state.products).map((p, i) => ({
      ...p,
      like: i === index ? !p.like : p.like,
    }));
    this.setState({
      products,
    });
  }

  addCart(index) {
    const products = Array.from(this.state.products).map((p, i) => ({
      ...p,
      inCart: i === index ? !p.inCart : p.inCart,
    }));
    this.setState({
      products,
    }, () => {
      sessionStorage.setItem('products', products);
      localStorage.setItem('changeProducts', JSON.stringify(products));
    });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className="container">
        <Helmet title="Cart" />
        <h1 className={classes.title}>Cart</h1>
        <Layout item xs={12}>
          <Layout
            container
            className={classes.cards}
            justify="flex-start"
            gutter={24}
          >
            { this.getProductNodes() }
          </Layout>
        </Layout>
        <div className={classes.action}>
          <Button raised primary onClick={() => this.openCart(true)}>
            Go To Cart
            <Icon className={classes.icon}>shopping_cart</Icon>
          </Button>
        </div>
        <div>
          <Dialog
            fullScreen
            open={this.state.openCart}
            onRequestClose={() => this.openCart(false)}
            transition={<Slide direction="up" />}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton contrast onClick={() => this.openCart(false)}>
                  close
                </IconButton>
                <span className={classes.flexGrow}>
                  Shoppint Cart
                </span>
                <Button contrast onClick={() => this.openCart(false)}>PAY</Button>
              </Toolbar>
            </AppBar>
            <Paper className={classes.paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell numeric>Price</TableCell>
                    <TableCell numeric>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.state.products.filter(product => product.inCart).map((product, pid) => {
                    const { name, price } = product;
                    return (
                      <TableRow key={`product-incart-${name}-${pid + 1}`}>
                        <TableCell>{name}</TableCell>
                        <TableCell numeric>{price}</TableCell>
                        <TableCell numeric>1</TableCell>
                      </TableRow>
                    );
                  }) }
                </TableBody>
              </Table>
            </Paper>
          </Dialog>
        </div>
      </div>
    );
  }
}
