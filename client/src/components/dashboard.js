import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../actions/index'


class Dashboard extends Component {
  componentDidMount() {
    this.props.getSecret()
  }
  render() {
    return <>Hello From Dashboard {this.props.secret}</>;
  }
};

const mapStateToProps = state => {
  return {
    secret: state.dashboard.secret
  }
}

export default connect(mapStateToProps, actions)(Dashboard);
