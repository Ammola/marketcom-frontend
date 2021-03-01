import React, { Component } from 'react';
// // import PaypalExpressBtn from 'react-paypal-express-checkout';
 
// // export default class MyApp extends React.Component {
// //     render() {
// //         const onSuccess = (payment) => {
// //             // Congratulation, it came here means everything's fine!
// //             		console.log("The payment was succeeded!", payment);
// //                     console.log("THIS PROPS", this.props);
// //             		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
// //                     this.props.clearCart();
// //                     this.props.history.push("/");
// //         }
 
// //         const onCancel = (data) => {
// //             // User pressed "cancel" or close Paypal's popup!
// //             console.log('The payment was cancelled!', data);
// //             // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
// //         }
 
// //         const onError = (err) => {
// //             // The main Paypal's script cannot be loaded or somethings block the loading of that script!
// //             console.log("Error!", err);
// //             // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
// //             // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
// //         }
 
// //         let env = 'sandbox'; // you can set here to 'production' for production
// //         let currency = 'USD'; // or you can set this value from your props or state
// //         let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
// //         // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
// //         const client = {
// //             sandbox:    'AUDgSDc8O2xcFn4Iw8Hmk5eBcgETPqrVQqHWHoPgcZein8MvTGy9H10PXMfbnzb-pBMtNmvKpQDMBMoG',
// //             production: 'YOUR-PRODUCTION-APP-ID',
// //         }
// //         // In order to get production's app-ID, you will have to send your app to Paypal for approval first
// //         // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
// //         //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
// //         // For production app-ID:
// //         //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
// //         // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
// //         return (
// //             <PaypalExpressBtn env={env} client={client} currency={currency} total={this.props.total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
// //         );
// //     }
// // }


// import { PayPalButton } from "react-paypal-button-v2";

// export default class Example extends Component {
//   render() {
//     return (
//       <PayPalButton
//         amount={this.props.totalUSD}
//         currency='USD'
//         // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
//         onSuccess={(details, data) => {
//           console.log("details:  ")
//           console.log(details)
//           console.log("data:  ")
//           console.log(data)
//           let userId = parseInt(JSON.parse(localStorage.getItem('userId')))
//           console.log("userId  ")
//           console.log(userId)
//           // let order = {
//           //   "orderId": data.orderID,
//           //   "payerId": data.payerID,
//           //   "paymentId": data.paymentID,
//           //   "billingToken": data.billingToken,
//           //   "facilitatorAccessToken": data.facilitatorAccessToken,
//           //   "amount": details.purchase_units.amount.value
//           // }
//           // console.log("order")
//           // console.log(order)
//           // axios.post("/marketcom/order/add",order, {headers: {"Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token")}})
//           //      .then(response=>{
//           //       console.log("response ");
//           //        console.log(response)
//           //       })
//           //      .catch(error=>{
//           //       console.log("error ");
//           //        console.log(error);
//           //       })
//           alert("Transaction completed by " + details.payer.name.given_name);
//           this.props.clearCart();
//           this.props.history.push("/");

//           // OPTIONAL: Call your server to save the transaction
//           return fetch("marketcom/shop/delete", {
//             method: "post",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": "Bearer " + localStorage.getItem("token")
//             },
//             body: JSON.stringify({
//             orderId: data.orderID,
//             payerId: data.payerID,
//             paymentId: data.paymentID,
//             billingToken: data.billingToken,
//             facilitatorAccessToken: data.facilitatorAccessToken,
//             amount: details.purchase_units.amount.value
//             }), 
            
//           });  
//          }
//       }
//       options={{
//         clientId: "AUDgSDc8O2xcFn4Iw8Hmk5eBcgETPqrVQqHWHoPgcZein8MvTGy9H10PXMfbnzb-pBMtNmvKpQDMBMoG"
//       }}
//       />
//     );
//   }
// }

import { PayPalButton } from "react-paypal-button-v2";
export default class Example extends Component {
  render() {
    return (
      <PayPalButton
        amount={this.props.totalUSD}
        currency='USD'
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          console.log("details:  ")
          console.log(details)
          console.log("data:  ")
          console.log(data)
          console.log("details.purchase_units[0].amount ")
          console.log(details.purchase_units[0].amount)
          
          // let order = JSON.stringify({
          //   orderId: data.orderID,
          //   payerId: data.payerID,
          //   paymentId: data.paymentID,
          //   billingToken: data.billingToken,
          //   facilitatorAccessToken: data.facilitatorAccessToken,
          //   amount: details.purchase_units[0].amount.value
          //   })
          // console.log("order")
          // console.log(order)
          // axios.post(`marketcom/order/add?userId=${this.state.newUser.id}`,order, {headers: {"Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token")}})
          //      .then(response=>{
          //       console.log("response ");
          //        console.log(response)
          //       })
          //      .catch(error=>{
          //       console.log("error ");
          //        console.log(error);
          //       })
          //alert("Transaction completed by " + details.payer.name.given_name);
          this.props.clearCart();
          this.props.addOrder(details, data);
          this.props.history.push("/");
          let userId = JSON.parse(localStorage.getItem('userId'))
          console.log("userId  ")
          console.log(userId)
          //return this.props.addOrder(details,data);
          //OPTIONAL: Call your server to save the transaction
          // return fetch(`marketcom/order/add?userId=${userId}`, {
          //   method: "post",
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Authorization": "Bearer " + localStorage.getItem("token")
          //   },
          //   body: JSON.stringify({
          //   orderId: data.orderID,
          //   payerId: data.payerID,
          //   paymentId: data.paymentID,
          //   billingToken: data.billingToken,
          //   facilitatorAccessToken: data.facilitatorAccessToken,
          //   amount: details.purchase_units[0].amount.value
          //   }), 
          // });  
        }
      }
      options={{
        clientId: "AUDgSDc8O2xcFn4Iw8Hmk5eBcgETPqrVQqHWHoPgcZein8MvTGy9H10PXMfbnzb-pBMtNmvKpQDMBMoG"
      }}
      />
    );
  }
}