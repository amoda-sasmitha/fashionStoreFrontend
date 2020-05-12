      /*  eslint-disable */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import { getUserDetails } from '../../actions/userActions'


class AllUsers extends Component {

    constructor() {
        super();
        this.state = {

        };



    }

    componentWillMount() {
        this.props.getUserDetails();
    }


    render() {
        const userdetails = this.props.users.map(user => (
            <div key={user._id}>

                <h3>{user.fname}</h3>
            </div>
        ))
        return (

            <div className="container">
                <h3>This is test</h3>
                {userdetails}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users.users
})

export default connect(mapStateToProps, { getUserDetails })(AllUsers);