import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/ToolBar';
import IconButton from 'material-ui/IconButton';
// import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
// import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { signIn, signOut, setRecord } from 'redux/modules/auth';

const styleSheet = createStyleSheet('Header', theme => ({
  grow: {
    flex: 1,
  },
  title: {
    marginLeft: 24,
    flex: '0 0 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
  },
}));

@connect(
  state => ({
    user: state.auth.user,
  }),
  {
    signIn,
    signOut,
    setRecord,
  }
)
export default class Header extends Component {

  static propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    setRecord: PropTypes.func.isRequired,
    user: PropTypes.string,
  }

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentDidMount() {
    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', Date.now());
      this.props.setRecord({
        msg: 'Requesting for existing session storage.',
        time: +new Date(),
      });
    }
    window.addEventListener('storage', (event) => {
      let newUser;
      switch (event.key) {
        case 'getSessionStorage':
          this.props.setRecord({
            msg: '收到同步session数据的请求.',
            time: +new Date(),
          });
          this.broadcastSession();
          break;
        case 'sessionStorage':
          newUser = event.newValue;
          if (newUser === 'null') {
            newUser = null;
          }
          this.props.setRecord({
            msg: `收到新的session数据 : user = ${newUser}`,
            time: +new Date(),
          });
          if (newUser && newUser === sessionStorage.getItem('user')) {
            console.log('1');
          } else if (!newUser && !sessionStorage.getItem('user')) {
            console.log('2');
          } else {
            // eslint-disable-next-line
            if (newUser) {
              // sessionStorage.setItem('user', newUser);
              this.signIn(newUser);
            } else {
              // sessionStorage.removeItem('user');
              this.signOut();
            }
          }
          break;
        default:
      }
    });
    this.checkStatus();
  }

  checkStatus() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.signIn(user);
    }
  }

  broadcastSession() {
    this.props.setRecord({
      msg: `广播自己的session数据 : user = ${sessionStorage.getItem('user')}`,
      time: +new Date(),
    });
    localStorage.setItem('sessionStorage', sessionStorage.getItem('user'));
    localStorage.clear();
    // const se = document.createEvent('StorageEvent');
    // eslint-disable-next-line
    // se.initStorageEvent('storage', false, false, 'sessionStorage', '----^^^', sessionStorage.getItem('user'), location.href, localStorage);
    // window.dispatchEvent(se);
  }

  checkInOrOut = () => {
    const user = this.props.user;
    if (user) {
      this.signOut();
    } else {
      this.signIn('Chen Zhan');
    }
    this.broadcastSession();
  }

  signIn(user) {
    this.props.setRecord({
      msg: `本页登录 : user = ${user}`,
      time: +new Date(),
    });
    this.props.signIn(user);
    sessionStorage.setItem('user', user);
  }

  signOut() {
    this.props.setRecord({
      msg: `本页登出 : user = ${sessionStorage.getItem('user')}`,
      time: +new Date(),
    });
    this.props.signOut();
    sessionStorage.removeItem('user');
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const title = 'Horizon Reach';
    console.log('§§§§§§§§§§§', this.props.user);
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton contrast className={classes.icon} onClick={this.props.toggleDrawer}>
            menu
          </IconButton>
          <span className={classes.title} type="title">
            {title}
          </span>
          <div className={classes.grow} />
          <span className={classes.title}>
            {this.props.user || '未登录'}
          </span>
          <IconButton contrast onClick={this.checkInOrOut}>
            {this.props.user ? 'exit_to_app' : 'account_circle'}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
