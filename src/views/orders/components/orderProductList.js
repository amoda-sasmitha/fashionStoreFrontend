/*  eslint-disable */
import React, {Component} from "react";

export class orderProductList extends Component{

    state = {
        products: this.props.products,
        //visible: this.props.visible,
    }

    //onChange = (e) => this.setState({title: e.target.value});

    render() {
        //style={{display: this.state.visible? "block" : "none"}}
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card Name</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
                <button className="btn btn-danger btn-sm px-2 mr-2">Close</button>
            </div>
        );
    }
}

export default orderProductList;