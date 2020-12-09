import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle} from 'reactstrap';

    
class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedDish:null
        };
}

    renderDish(selectedDish){
        if (selectedDish!=null){
            return(
            <div key={selectedDish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={selectedDish.image} alt={selectedDish.name} />
              <CardImgOverlay>
                <CardTitle>{selectedDish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
            )
        }
        else{
            <div></div>
        }
     }

     renderComments(comments){
        // console.log(comments);
        if (comments!=null){

            const listItems =comments.map((c)=>{
                return(
                <div key={c.id} className="row">
                    <ul className="list-unstyled">
                        <li>{c.comment}</li>   
                        <li>-- {c.author}</li>  
                        <li>{c.date}</li>
                    </ul>
                </div>
                );
                })

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
        
        } else {
            return (
                <div> </div>
            );
        }
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.selectedDish)}
                    {this.renderComments(this.props.comments)}
                </div>
            </div>
        );
    }
}

export default Dishdetail;