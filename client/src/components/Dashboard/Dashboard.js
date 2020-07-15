import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Redux/actions/index'
import { Grid, Header, Icon, Segment, Container } from 'semantic-ui-react'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getSecret()
  }
  render() {
    return (
      <Container>
        <Segment placeholder>
          <Grid columns={1} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="user secret" />
                  <Icon loading name="spinner" size="small" />
                  {this.props.secret}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    secret: state.dashboard.secret,
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
