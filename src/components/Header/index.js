import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/ToolBar';
import IconButton from 'material-ui/IconButton';
// import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
import customPropTypes from 'material-ui/utils/customPropTypes';

// import header from './Header.less';

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

export default class Header extends Component {

  static propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
  }

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const title = 'Horizon Reach';

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
          <IconButton contrast>
            <LightbulbOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
