// const orderForm = document.getElementById('orderForm');
// const orderbtn = document.getElementById('orderbtn');

// const merchantForm = document.getElementById('merchantForm')
// const merchantBtn = document.getElementById('merchantBtn')


// let orderData;
// if(orderForm) {
//     orderbtn.addEventListener('click', function() {
//         const title = orderForm.elements[1].value;
//         const description = orderForm.elements[2].value;
//         const client_id = orderForm.elements[0].value;
//         const merchant_id = orderForm.elements[3].value;
//         const roomName = orderForm.elements[4].value;

//         if(title && description && client_id && merchant_id && roomName) {
//             validClientForm = true;
//             io.socket.post('/ORRoom', {
//                 title: title,
//                 description: description,
//                 client_id: client_id,
//                 merchant_id: merchant_id,
//                 roomName: roomName
//                }, function(resData, jwRes) {
//                    if (jwRes.error) {
//                        console.log(jwRes.statusCode); // => e.g. 403
//                        return;
//                    }
//                    orderData = resData;
//                    window.location.href = "http://localhost:1337/ORRooms"
//                })
//         }

//     })
// }

// /// merchant manipulation
// let merchantData;
// if(merchantForm) {
//     merchantBtn.addEventListener('click', function() {
//         const name = merchantForm.elements[0].value;
//         const email = merchantForm.elements[1].value;
//         if(name && email) {
//              io.socket.post('/add_merchant', {
//                 name: name,
//                 email: email,
//                }, function(resData, jwRes) {
//                    if (jwRes.error) {
//                        console.log(jwRes.error); // => e.g. 403
//                        return;
//                    }
//                    merchantData = resData;
//                    console.log(merchantData)
//                    window.location.href = "http://localhost:1337/ORRooms"
//                })
//         }
// })

// }

// const merchantAccept = document.getElementById('accept');
// merchantAccept.addEventListener('click', function() {
//     io.socket.join('accept', function(msg) {
//         console.log('done');
//     })
// })

        // if(name && clientEmail && address && title && description && merchantEmail && roomName) {
        //     
            //  io.socket.post('/create', {
            //     name: name,
            //     clientEmail: clientEmail,
            //     address: address,
            //     title: title,
            //     description: description,
            //     merchantEmail: merchantEmail,
            //     roomName: roomName
            //    }, function(resData, jwRes) {
            //        if (jwRes.error) {
            //            console.log(jwRes.statusCode); // => e.g. 403
            //            return;
            //        }
            //        clientData = resData;
            //        window.location.href = "http://localhost:1337/order"
            //     //    clientPage();
            //    })
        // }
        
    // })
    
//     function clientPage() {
//         let clientName = document.getElementById('clientName');
//         let clientAddress = document.getElementById('clientAddress');
//         let clientId = document.getElementById('clientId');
//         let orderTitle = document.getElementById('clientTitle');
//         let orderDescription = document.getElementById('clientDescription');
//         let orderStatus = document.getElementById('clientStatus');
//         if(validClientForm) {
//             firstLayout.style.display = 'none';
//             secondLayout.style.display = 'block';
//             // put our data into the DOM
//             clientName.innerHTML = clientData.client.name
//             clientAddress.innerHTML = clientData.client.address;
//             clientId.innerHTML = ` <div id="clientId">id | ${clientData.order[0].id}</div>`;
//             orderTitle.innerHTML = `<div id="clientTitle">title | ${clientData.order[0].title}</div>`;
//             orderDescription.innerHTML = `<div id="clientDescription">description | ${clientData.order[0].description} </div> `;
//             orderStatus.innerHTML = `<div id="clientTitle">status | <span class="assigned">Waiting the merchant acceptance</span></div>`;
//             console.log(clientData)
//         }
//     }
// }

