import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux'
import { compose } from 'redux'

import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'


import * as actions from '../actions/index'

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
class SignUp extends Component {

  state = {
    email: '',
    password: ''
  }
  handelChange = async (e) => {
    await this.setState({
      [e.target.id]: e.target.value
    })
  }

  handelSubmit = async () => {
    await this.props.signUp(this.state).then(data => {
      if (data) {
        this.props.history.push('/dashboard')
      }
    })
  }

  responseGoogle = async (res) => {
    const data = await this.props.oauthGoogle(res.accessToken).then(data => {
      if (data) {
        this.props.history.push('/dashboard')
      }
    })
  }

  responseFacebook = async (res) => {
    const data = await this.props.oauthFacebook(res.accessToken).then(data => {
      if (data) {
        this.props.history.push('/dashboard')
      }
    })
  }

  render() {
    return (
      <Container>
        <Row xs="3" className="mt-4 ml-auto">
          <Col
            sm={{
              offset: 2,
            }}
          >
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email placeholder"
                  onChange={this.handelChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password placeholder"
                  onChange={this.handelChange}

                />
              </FormGroup>
              {this.props.errorMessage ? <Alert color="danger">
                {this.props.errorMessage}
              </Alert> : ''}
              <Button color="primary" onClick={this.handelSubmit}>SignUp</Button>
            </Form>
          </Col>

          <Col sm={{ size: "auto", offset: 1 }}>
            <Container className="themed-container">
              <Row xs="1" className="mt-4">
                <Alert color="primary">
                  Sign Up With  :
                 </Alert>
              </Row>
              <Row xs="4" className="mt-3 ">
                <Col sm={{ size: "auto", offset: 0.5 }}>
                  <Button color="primary">
                    <GoogleLogin

                      clientId="696567563959-7p8kts89voj9k01504jprs9o3aacfgqj.apps.googleusercontent.com"
                      buttonText="Google "
                      uxMode="popup"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={'single_host_origin'}
                      cssClass="outline btn btn-primary"

                    />
                  </Button>
                </Col>
                <Col sm={{ size: "auto", offset: 0.5 }}>
                  <Button color="primary">
                    <FacebookLogin
                      appId="2771619929761813"
                      autoLoad={false}
                      textButton="FaceBook"
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      cssClass="outline btn btn-primary"
                    />
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
