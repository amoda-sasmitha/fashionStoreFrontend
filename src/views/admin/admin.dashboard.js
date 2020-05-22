/*  eslint-disable */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar'
import '../../asserts/commoncss/sidebar.css'
import {getCounts} from "../../controllers/Common";
import Config from "../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            counts : defaultcounts
        }
    }

    componentDidMount(){
        this.loadCounts();
    }

    loadCounts = () => {
        getCounts()
            .then( result => {
                console.log(result);
                this.setState({counts : result })
            })
            .catch( err => {
                console.log(err)
            })
    }

    render(){
        const { counts } = this.state;
        return(
            <div className="bg-light wd-wrapper">
            <AdminSidebar active={"dashboard"}/>
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row mx-1">
                            <div className="col-12 px-0">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded ">
                                    Main Dashboard <span className="mx-2 badge badge-success px-2" >Admin</span>
                                </h5>
                            </div>
                           { counts.map ( (item,i) => (
                            <div key={i} className="col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2" > 
                                    <div className={cardstyle}> 
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src={`images/default/admin.${item.name}.png`} className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                     <h6 className="text-secondary bold-normal pr-2">{item.name}</h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0"+item.value).slice(-2)}</h3>                        
                                    </div>                           
                                    </div>
                            </div>
                            ))
                            }
                           

                             
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}
const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"
const defaultcounts = [ { name : "Users" , value : 0 },
{ name : "Managers" , value :0 },
{ name : "Products" , value : 0 },
{ name : "Categories" , value : 0 },
{ name : "Orders" , value : 0 },
{ name : "Offers" , value : 0 },]
export default Dashboard;
