import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader,
         ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

function RenderDish({dish}){
    return(
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function formatDate(date){
    const newDate = new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        }).
        format(new Date(date));
    return newDate;
}

const minLength = (len) => (val) => val && val.length>=len;
const maxLength = (len) => (val) => !val || val.length<=len;

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen : !this.state.isModalOpen});
    }

    handleSubmit(values){
        console.log("Current state is "+JSON.stringify(values));
        alert("Current state is "+JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" name="author" id="author"
                                    className="form-control"
                                    placeholder="Your Name"
                                    validators = {{
                                        minLength : minLength(3), maxLength : maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    show="touched"
                                    model=".author"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} 
                                />       
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" name="comment" 
                                    rows="6"
                                    className="form-control"
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments({comments}){
    if(comments == null)
        return (<div></div>);
    else{
        const dishComments = comments.map((dishComment) => {
        return(
            <div key={dishComment.id}>
                <li>{dishComment.comment}</li>
                <br/>
                <li>-- {dishComment.author} , {formatDate(dishComment.date)}</li>
                <br/>
            </div>
        )
        });
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {dishComments}
                    <CommentForm />
                </ul>
            </div>
        );
    }
}

function DishDetail(props){

    if(props.dish == null)
        return (<div></div>);
    else
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments = {props.comments} />
                </div>
            </div>
        );
}

export default DishDetail;