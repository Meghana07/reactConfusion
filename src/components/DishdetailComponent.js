import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

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
        const dishComments = comments.map( (dishComment) => {
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
    
    const dish = props.dish;

    if(dish == null)
        return (<div></div>);
    else
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <RenderComments comments = {dish.comments} />
                </div>
            </div>
        );
}

export default DishDetail;