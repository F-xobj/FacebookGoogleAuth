import React, { Component } from 'react';
import { connect } from 'react-redux'
import auth from '../reducers/auth';

export default (OriginalComponent) => {

    class MixedComponent extends Component {


        checkAuth() {
            if (!this.props.isAuth && !this.props.token) {
                this.props.history.push('/')
            }
        }

        componentDidMount() {
            this.checkAuth()
        }
        componentDidUpdate(prevProps, prevState) {
            this.checkAuth()
        }
        render() {
            return (<OriginalComponent {...this.props} />);
        }
    }
    const mapStateToProps = state => {
        return {
            isAuth: state.auth.isAuth,
            token: state.auth.token
        }
    }
    return connect(mapStateToProps)(MixedComponent)
}
