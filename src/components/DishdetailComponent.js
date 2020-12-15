import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom' ; 

    function Renderdish({dish}){
        if (dish!=null){
            return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>                    
            </Card>
          </div>
            )
        }
        else{
            <div></div>
        }
     }

    function RenderComments({comments}){
        // console.log(comments);
        if (comments!=null){

            const listItems =comments.map((c)=>{
                return(
                <div key={c.id} >
                    <ul className="list-unstyled">
                        <li>
                        <p>{c.comment}</p>  
                        <p>-- {c.author}, {new Intl.DateTimeFormat('en', {year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                        </li>
                    </ul>
                </div>
                );
                });
            
            
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardBody>
                        <h4>Comments</h4>
                            {listItems}
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
             return (
                <div> </div>
            );
             
        }
    }



    const Dishdetail=(props)=>{
        
        const dish = props.dish;
        if(dish!=null){        
            return(
                <div className="container">
                     <div className="row">
                            <Breadcrumb>
                            <BreadcrumbItem> <Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                            </div>
                        </div>
                    <div className="row">
                        <Renderdish dish={props.dish}/>
                    
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            );
        } else{
            return(
                <div></div>
            )
        }
    }


export default Dishdetail;