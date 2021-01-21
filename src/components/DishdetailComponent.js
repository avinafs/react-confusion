

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem ,Button, Modal, ModalBody, ModalHeader, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom' ; 
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

export class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

            this.state = {
              isNavOpen: false,
              isModalOpen: false
            };
        }

        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.comment);
        }


    render() {
        return (
            <div>
                <Button color="secondary" outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="author">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger" model=".author" show="touched" 
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" 
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


  function Renderdish({dish}){
     // console.log(dish);
        if (dish!=null){
            return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg  src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>                    
            </Card>
          </div>
            );
        }
        else{
            <div></div>
        }
     }

    function RenderComments({comments, addComment, postComment, dishId}){
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
                    <CommentForm dishId={dishId}addComment={addComment} postComment={postComment}/>
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
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
    
       else if (props.dish!=null){        
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
                        <Renderdish dish={props.dish}
                         isLoading={props.dishesLoading} 
                         errMess={props.dishesErrMess}  />
                    
                        <RenderComments comments={props.comments} addComment ={props.addComment}
                         postComment={props.postComment}
                         dishId={props.dish.id} />
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