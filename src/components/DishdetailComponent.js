import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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