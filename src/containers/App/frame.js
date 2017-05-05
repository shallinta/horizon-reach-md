import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import { List, ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Icon from 'material-ui/Icon';
// import InboxIcon from 'material-ui-icons/Inbox';
import Header from 'components/Header';

const styleSheet = createStyleSheet('AppFrame', theme => ({
  '@global': {
    hthemel: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebKitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: theme.palette.accent.A400,
      textDecoration: 'none',
    },
    'a:hover': {
      color: theme.palette.accent.A200,
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto',
    },
  },
  frame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  drawer: {
    flex: '0 0 250px',
  },
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    display: 'block',
    fontSize: 20,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color'),
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary[500],
    },
  },
  listText: {
    flex: 1,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('all'),
    '&:hover': {
      paddingLeft: 50,
      fontSize: '125%',
      color: theme.palette.accent[400],
    }
  },
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  pageContent: {
    flex: 1,
    marginTop: 64,
    padding: '20px 40px',
  },
  [theme.breakpoints.up(960)]: {
    pageContent: {
      flex: '0 0 920px',
    },
  },
}));

export default class AppFrame extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  static getLinkNode(path, name, cn, cb) {
    return (
      <Link to={path} key={`link-${name}`} className={cn} onClick={cb}>{name}</Link>
    );
  }

  state = {
    drawerOpen: false,
  };

  closeDrawer = () => {
    this.setState({
      drawerOpen: false,
    });
  };

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

  renderDrawerList() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <List>
        <ListItem button>
          <ListItemIcon><Icon>home</Icon></ListItemIcon>
          <ListItemText primary={AppFrame.getLinkNode('/', 'Home', classes.listText, this.closeDrawer)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Icon>import_contacts</Icon></ListItemIcon>
          <ListItemText primary={AppFrame.getLinkNode('/articles', 'Articles', classes.listText, this.closeDrawer)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Icon>widgets</Icon></ListItemIcon>
          <ListItemText primary={AppFrame.getLinkNode('/examples', 'Examples', classes.listText, this.closeDrawer)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Icon>more</Icon></ListItemIcon>
          <ListItemText primary={AppFrame.getLinkNode('/about?id=100', 'About', classes.listText, this.closeDrawer)} />
        </ListItem>
      </List>
    );
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div id="app-frame" className={classes.frame}>
        <Drawer
          className={classes.drawer}
          paperClassName={classes.paper}
          docked={false}
          onRequestClose={this.closeDrawer}
          open={this.state.drawerOpen}
        >
          <div className={classes.nav}>
            <Toolbar className={classes.toolbar}>
              <Link className={classes.title} to="/" onClick={this.closeDrawer}>
                Horizon Reach
              </Link>
              <Divider absolute />
            </Toolbar>
            { this.renderDrawerList() }
            <Divider absolute />
          </div>
        </Drawer>
        <div className={classes.page}>
          <Header toggleDrawer={this.toggleDrawer} />
          <div className={classes.pageContent} key="pageContent">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
