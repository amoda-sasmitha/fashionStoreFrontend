   /*  eslint-disable */
   import React, { Component } from 'react'
   import './loading.css';
   
   import icon from '../asserts/Images/loading.svg'
   export class loading extends Component {
       static propTypes = {
   
       }
   
       render() {
           return (
               <div className="loading">
                   <img src={icon} />
   
               </div>
           )
       }
   }
   
   export default loading
   