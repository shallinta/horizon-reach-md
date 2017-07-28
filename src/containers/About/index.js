import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import ClearAllIcon from 'material-ui-icons/ClearAll';

import { setRecord, clearRecord } from 'redux/modules/auth';

const styleSheet = createStyleSheet('Examples', theme => ({
  title: {
    color: theme.palette.accent[400],
  },
  actions: {
    display: 'flex',
  },
  flexGrow: {
    flex: 1,
  },
  fab: {
    margin: theme.spacing.unit,
  },
}));

@connect(
  state => ({
    user: state.auth.user,
    record: state.auth.record,
  }),
  {
    pushState: push,
    setRecord,
    clearRecord,
  }
)
export default class About extends Component {
  static propTypes = {
    record: PropTypes.array.isRequired,
    setRecord: PropTypes.func.isRequired,
    clearRecord: PropTypes.func.isRequired,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  componentDidMount() {
    this.props.setRecord({
      msg: 'Open this page.',
      time: +new Date(),
    });
  }

  clearRecord = () => {
    this.props.clearRecord();
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className="container">
        <Helmet title="About" />
        <h1 className={classes.title}>About</h1>
        <ul>
          { this.props.record && this.props.record.length
            ? this.props.record.map((elem, idx) => {
              const { msg, time } = elem;
              // eslint-disable-next-line
              // return <li key={`record-${idx + 1}-${time}`}>【{idx + 1}】 {new Date(time).toLocaleString()} : {msg}</li>;
              return <li key={`record-${idx + 1}-${time}`}>【{idx + 1}】 {msg}</li>;
            })
            : <li>No messages.</li>
          }
        </ul>
        <div className={classes.actions}>
          <div className={classes.flexGrow} />
          <Button fab accent className={classes.fab} onClick={this.clearRecord}>
            <ClearAllIcon />
          </Button>
        </div>
      </div>
    );
  }
}
