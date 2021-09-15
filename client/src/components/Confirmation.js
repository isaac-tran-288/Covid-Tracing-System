import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactTimeout from "react-timeout"; 
import logo from "PSG/checkIn.png" ;

class App extends React.Component{
    submit = () => {
        confirmAlert({
            title: 'CHECK-IN CONFIRMATION',
            message: 'Congratulations Your Check-In is Confirmed',
            buttons: [
              {
                label: 'OK',
                onClick: () =>{() => this.props.setTimeout("TimeOut",3000)},
                
              },
             
            ]
          });
        };
       
        render() {
          return (
            <div className='container'>
                <img src={logo} width="100" height="50" />
                <button onClick={this.submit}>Confirm dialog</button>
                <Link to='/terminal' > OK </Link>
            </div>
          );
        }
      }

