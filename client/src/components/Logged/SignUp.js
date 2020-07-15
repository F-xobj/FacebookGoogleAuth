import React, { Component } from 'react'
import { connect } from 'react-redux'
import Knight from '../../assets/img/knight.png'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faAt, faUnlock } from '@fortawesome/free-solid-svg-icons'

import * as actions from '../../Redux/actions/index'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
  }
  handelChange = async (e) => {
    await this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handelSubmit = async () => {
    await this.props.signUp(this.state).then((data) => {
      if (data) {
        this.props.history.push('/dashboard')
      }
    })
  }

  responseGoogle = async (res) => {
    const data = await this.props.oauthGoogle(res.accessToken).then((data) => {
      if (data) {
        this.props.history.push('/dashboard')
      }
    })
  }

  responseFacebook = async (res) => {
    const data = await this.props
      .oauthFacebook(res.accessToken)
      .then((data) => {
        if (data) {
          this.props.history.push('/dashboard')
        }
      })
  }

  render() {
    const element = <FontAwesomeIcon icon={faFacebook} size="2x" />
    return (
      // <Container>
      //   <Row xs="3" className="mt-4 ml-auto">
      //     <Col
      //       sm={{
      //         offset: 2,
      //       }}
      //     >
      //       <Form>
      //         <FormGroup>
      //           <Label for="email">Email</Label>
      //           <Input
      //             type="email"
      //             name="email"
      //             id="email"
      //             placeholder="email placeholder"
      //             onChange={this.handelChange}
      //           />
      //         </FormGroup>
      //         <FormGroup>
      //           <Label for="password">Password</Label>
      //           <Input
      //             type="password"
      //             name="password"
      //             id="password"
      //             placeholder="password placeholder"
      //             onChange={this.handelChange}
      //           />
      //         </FormGroup>
      //         {this.props.errorMessage ? (
      //           <Alert color="danger">{this.props.errorMessage}</Alert>
      //         ) : (
      //           ''
      //         )}
      //         <Button color="primary" onClick={this.handelSubmit}>
      //           SignUp
      //         </Button>
      //       </Form>
      //     </Col>

      //     <Col sm={{ size: 'auto', offset: 1 }}>
      //       <Container className="themed-container">
      //         <Row xs="1" className="mt-4">
      //           <Alert color="primary">Sign Up With :</Alert>
      //         </Row>
      //         <Row xs="4" className="mt-3 ">
      //           <Col sm={{ size: 'auto', offset: 0.5 }}>
      //             <Button color="primary">
      //               <GoogleLogin
      //                 clientId="696567563959-7p8kts89voj9k01504jprs9o3aacfgqj.apps.googleusercontent.com"
      //                 buttonText="Google "
      //                 uxMode="popup"
      //                 onSuccess={this.responseGoogle}
      //                 onFailure={this.responseGoogle}
      //                 cookiePolicy={'single_host_origin'}
      //                 cssClass="outline btn btn-primary"
      //               />
      //             </Button>
      //           </Col>
      //           <Col sm={{ size: 'auto', offset: 0.5 }}>
      //             <Button color="primary">
      //               <FacebookLogin
      //                 appId="2771619929761813"
      //                 autoLoad={false}
      //                 textButton="FaceBook"
      //                 fields="name,email,picture"
      //                 callback={this.responseFacebook}
      //                 cssClass="outline btn btn-primary"
      //               />
      //             </Button>
      //           </Col>
      //         </Row>
      //       </Container>
      //     </Col>
      //   </Row>
      // </Container>
      <>
        <div className="container">
          <>
            <img src={Knight} alt={Knight} />
            <div className="sBox sBorder">
              <>
                <h2>Login As :</h2>
                <div className="circleButton">
                  <GoogleLogin
                    clientId="696567563959-7p8kts89voj9k01504jprs9o3aacfgqj.apps.googleusercontent.com"
                    buttonText=""
                    onSuccess={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="brandTest"
                    icon={false}
                  >
                    <FontAwesomeIcon icon={faGoogle} size="2x" />
                  </GoogleLogin>
                  <FacebookLogin
                    appId="2771619929761813"
                    textButton=""
                    autoLoad={false}
                    icon={element}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    size="small"
                    cssClass="brandTest"
                  />
                </div>
                <div className="divider">
                  <span> OR </span>
                </div>
                <div className="loginForm">
                  <div class="input-container">
                    <FontAwesomeIcon icon={faAt} size="2x" className="icon" />
                    <input
                      class="input-field"
                      type="text"
                      placeholder=" Email"
                      name="email"
                      onChange={this.handelChange}
                    />
                  </div>
                  <div class="input-container">
                    <FontAwesomeIcon
                      icon={faUnlock}
                      size="2x"
                      className="icon"
                    />
                    <input
                      class="input-field"
                      type="password"
                      placeholder=" ********"
                      name="password"
                      onChange={this.handelChange}
                    />
                  </div>
                  <button onClick={this.handelSubmit}>SUBMIT</button>
                </div>
              </>
            </div>
          </>
        </div>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  }
}
export default connect(mapStateToProps, actions)(SignUp)
