import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        leaders : state.leaders,
        promotions : state.promotions
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes : () => dispatch(fetchDishes()),
    resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
    fetchComments : () => dispatch(fetchComments()),
    fetchPromos : () => dispatch(fetchPromos()),
    fetchLeaders : () => dispatch(fetchLeaders()),
    postFeedback : (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders()
    }
  
    render(){

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.dishes.filter( (dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMessage={this.props.dishes.err}
                    promotion={this.props.promotions.promotions.filter( (promotion) => promotion.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMessage={this.props.promotions.err}
                    leader={this.props.leaders.leaders.filter( (leader) => leader.featured)[0]}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMessage={this.props.leaders.err}
                />
            );
        }

        const AboutUs = () => {
            return(
                <About leaders={this.props.leaders.leaders}
                    isLoading={this.props.leaders.isLoading}
                    errMessage={this.props.leaders.err}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    isLoading={this.props.dishes.isLoading}
                    errMessage={this.props.dishes.err}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentErrMessage={this.props.comments.err}
                    postComment={this.props.postComment}
                />
            );
        } 

        return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} /> 
                        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                        <Route exact path="/aboutus" component={AboutUs} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
