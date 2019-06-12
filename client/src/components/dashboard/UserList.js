import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from 'react-redux';
import { getUser } from '../../actions/userActions';
import PropTypes from 'prop-types';

class UserList extends Component {
 
    componentDidMount(){
        this.props.getUser();
    }

    render() {
        const {user} = this.props.users;
        const { isAuthenticated } = this.props.auth;

        const list =    user.map(({id, name}) =>{
                return(<CSSTransition key= {id} timeout={500}>
                    <ListGroupItem>
                        {name}
                    </ListGroupItem>
                </CSSTransition>
                    )
                })
        

        return (
           <Container>
              <ListGroup>
                  {isAuthenticated ?
                  <TransitionGroup>
                      {list}
                  </TransitionGroup>
                  :
                   <div>
                       <h1> Please Login or Register to see data</h1>
                   </div>       
                }
              </ListGroup>
           </Container>
        );
     }
}

UserList.propTypes = {
    getUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   users: state.user,
   auth : state.auth 
});

export default connect(mapStateToProps, { getUser })(UserList)
