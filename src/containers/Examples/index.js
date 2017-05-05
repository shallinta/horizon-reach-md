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

const styleSheet = createStyleSheet('Examples', () => ({
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
}));

export default class Examples extends Component {
  static propTypes = {
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  state = {
    favoriteBtn: 'favorite_border',
    openExample: '',
  }

  handleClickFavorite = () => {
    this.setState({
      favoriteBtn: this.state.favoriteBtn === 'favorite' ? 'favorite_border' : 'favorite',
    });
  }

  openExample(exampleName) {
    this.setState({
      openExample: exampleName,
    });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className="container">
        <Helmet title="Examples" />
        <h1>Examples</h1>
        <Layout item xs={12}>
          <Layout
            container
            className={classes.cards}
            justify="start"
            gutter={24}
          >
            <Layout item>
              <Card className={classes.card}>
                <CardMedia>
                  <img src="//lorempixel.com/300/200/nature" alt="card" />
                </CardMedia>
                <CardContent>
                  <h2>圆弧文字</h2>
                  <p>
                    将一段文字绘制在圆弧形状上。
                  </p>
                </CardContent>
                <CardActions >
                  <IconButton accent onClick={this.handleClickFavorite}>
                    {this.state.favoriteBtn}
                  </IconButton>
                  <div className={classes.flexGrow} />
                  <Button compact primary onClick={() => this.openExample('circle-text')}>
                    Detail
                    <Icon className={classes.icon}>details</Icon>
                  </Button>
                </CardActions>
              </Card>
            </Layout>
          </Layout>
        </Layout>
        <div>
          <Dialog
            fullScreen
            open={this.state.openExample === 'circle-text'}
            onRequestClose={() => this.openExample('')}
            transition={<Slide direction="up" />}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton contrast onClick={() => this.openExample('')}>
                  close
                </IconButton>
                <span className={classes.flexGrow}>
                  圆弧文字
                </span>
                <Button contrast onClick={() => this.openExample('')}>save</Button>
              </Toolbar>
            </AppBar>
          </Dialog>
        </div>
      </div>
    );
  }
}
