import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle} from 'reactstrap';
import Dishdetail from './DishdetailComponent';

class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedDish:null,
            comments: null
        };
    }
    onDishSelect(dish){
        this.setState({selectedDish:dish});
    }
    getSelectedDish(selectedDish){
      this.setState({comments: selectedDish.comments});
     // console.log(selectedDish.comments);
  }
    
  render() {
    const menu = this.props.dishes.map((dish) => {
        return (
          <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card onClick={()=> {this.onDishSelect(dish); 
                                this.getSelectedDish(dish);}}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        );
    });

    return (
      <div className="container">
        <div className="row">   
          {menu}
        </div>
        <div className="row">
          <Dishdetail selectedDish={this.state.selectedDish}
              comments = {this.state.comments} />
        </div>
      </div>
    );

    
  }
}

export default Menu;