/*  eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar'
import '../../asserts/commoncss/sidebar.css'
import {getCounts , getRevenue , getlatestComments } from "../../controllers/Common";
import Config from "../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { Line as LineChart, Bar, Doughnut } from 'react-chartjs-2';
import { getAllOrders } from "../../controllers/Order";
import { connect } from "react-redux";

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            counts : defaultcounts,
            revenue_labels : [] ,
            revenue_data :[], 
            comments : [],
            orders : [],

        }
    }

    componentDidMount(){
        this.loadCounts();
        this.loadRevenue();
        this.loadLatestComments();
        this.loadOrders();
    }

    loadCounts = () => {
        getCounts()
            .then( result => {
                // console.log(result);
                this.setState({counts : result })
            })
            .catch( err => {
                console.log(err)
            })
    }

    loadLatestComments = () => {
        getlatestComments(4)
            .then( result => {
                console.log(result);
                this.setState({comments : result })
            })
            .catch( err => {
                console.log(err)
            })
    }

    loadOrders = () => {
        getAllOrders()
          .then((result) => {
            //console.log(result);
            this.setState({ orders: result });
          })
          .catch((err) => {
            console.log(err);
          });
      };

    loadRevenue = () => {
        getRevenue()
            .then( result => {
                // console.log(result);
                this.setState({
                    revenue_labels : result.map(i => moment(new Date(i.date)).format("MMM DD") ),
                    revenue_data : result.map(i => i.total )
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    render(){
        const { counts , revenue_data , revenue_labels , comments , orders} = this.state;
        const role = this.props.auth.user.type;
        const isadmin = (role && role == "admin") ? true : false
        let reversedOrders = orders.reverse();
        const user = this.props.auth.user;
        let CurrentOrders = reversedOrders.filter((ord) => {
          return ord.shipped == false;
        });

        const count_data = isadmin ? counts : counts.splice(2,4)

        return(
            <div className="bg-light wd-wrapper h-100">
            <AdminSidebar active={"dashboard"}/>
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row mx-1">
                            <div className="col-12 px-0">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    {this.setGreeting()} <span className="small bold-normal text-muted">{user.fname}</span> 
                                </h5>
                            </div>
                           { count_data.map ( (item,i) => (
                            <div key={i} className={`col-lg-${isadmin ? '2' : '3'} col-md-3 col-sm-4 col-6 pl-0 pr-2`} > 
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
                        { isadmin && <div className="col-12 px-0" >
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 px-2">
                            <h6 className="text-muted bold-normal px-2 mb-0">
                                    Last Two Weeks Revenue
                            </h6>
                            <h5 className="text-dark bold-normal px-2 pt-1 pb-3 ">
                                    LKR {Config.numberWithCommas(revenue_data.reduce((a,c) => a +c , 0))}.00
                            </h5>
                                <LineChart data={{
                                                    labels: revenue_labels,
                                                    datasets: [
                                                        {
                                                            label: "Revenue",
                                                            backgroundColor: 'rgba(26, 188, 156,0.5)',
                                                            borderColor: 'rgba(39, 174, 96,0.4)',
                                                            data: revenue_data
                                                        }
                                                    ]
                                                }}
                                                    options={options2}
                                                    width={12} height={3} />
                            </div>
                        </div>}
                        {/* latest orders */}
                        <div className="col-8 pl-0" >
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 px-2">
                            <h6 className="text-muted bold-normal px-2 mb-2">
                                   New Orders
                            </h6>
                            <div className="table-responsive px-2">
                            <table className="table table-stripped">
                                <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {CurrentOrders.splice(-4).map((item) =>
                                    this.renderOrdersTable(item)
                                )}
                                </tbody>
                            </table>
                            </div>
                            </div>
                        </div>
                        {/* ------------ */}
                        {/* latest comments */}
                        <div className="col-4 px-0" >
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 px-2">
                            <h6 className="text-muted bold-normal px-2 mb-0">
                                    Latest Comments 
                            </h6>
                            <ul class="list-group mt-2 ">
                                { comments.map( (c,i) =>  (
                                <li key={i} class="list-group-item p-2 " style={{borderLeft : 0 , borderRight : 0 , borderTop : 0}}>
                                    <h6 className="small bold-normal">{c.produt_name}</h6>
                                <p className="small text-muted mb-0">{c.comment}</p>
                                </li>
                                ))}
                            </ul>                         
                            </div>
                        </div>
                        {/* ------------ */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getStyle = (item) => {
        return {
          backgroundColor: item.deleteRequest ? "#ffa1a150" : "#FFFFFF",
        };
      };

    renderOrdersTable = (item) => {
        return (
          <tr key={item._id} style={this.getStyle(item)}>
            <td>
              <b>{moment(new Date(item.date)).format("DD , MMM YYYY")}</b>
            </td>
            <td>
              <h6 className="form-label">LKR {item.amount}</h6>
            </td>
            <td>{item.userName}</td>
            <td>
              <button
                className="btn btn-dark btn-sm px-2 mr-2"
                onClick={() => this.onClickView(item)}
              >
                More Details
              </button>
            </td>
          </tr>
        );
      };

      
  onClickView = (item) => {
    this.props.history.push(`/manager/orders/getOrder/${item._id}`);
  };

  
  setGreeting = () => {
    let h = new Date().getHours()
    if(h >= 5 && h <= 11 ){
        return "Good Morning! ,"
    }else if(h >= 12 &&  h <= 17){
        return "Good Afternoon! ,"
    }else if(h >= 18 && h <= 20){
        return "Good Evening! ,"
    }else{
        return "Good Night! ,"
    }
}

}
const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"
const defaultcounts = [ { name : "Users" , value : 0 },
{ name : "Managers" , value :0 },
{ name : "Products" , value : 0 },
{ name : "Categories" , value : 0 },
{ name : "Orders" , value : 0 },
{ name : "Offers" , value : 0 },]

const options2 = {
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }

}

const mapStateToProps = state => ({
    auth : state.auth || {} ,
  });

export default connect( mapStateToProps)(withRouter(Dashboard));
