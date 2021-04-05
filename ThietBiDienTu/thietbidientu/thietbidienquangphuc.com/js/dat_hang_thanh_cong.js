let listOrderTotal;
let listCustomerDetail;
let timeOrder, infoOrderView;

// let paymentByBank, paymentByCash;
let paymentMethod, noteByCustomer;


$(function () {


    listCustomerDetail = $('.customer-field');
    listOrderTotal = $('#list-product-total');
    timeOrder = $('.time-order-box');


    listCustomerNote = $('.customer-note');
    paymentMethod = $("#payment-method");
    noteByCustomer = $("#note-by-customer");
    infoOrderView = $(".info-order-view")



    renderListOrderDetailPayment();
    renderListOrderCustomer();
    renderNoteAndPayment();
    renderTimeOrder();
    renderInfoOrder();
})

function renderInfoOrder() {
    let informationOrder = getItemSessionStorage("noteOrderSuccess");
    let listInfoOrder = '';

    listInfoOrder = `
        <h3 class="info-order">Thông tin đơn hàng | Số <span>${informationOrder.idOrder}</span></h3>    
    `;
    infoOrderView.html(listInfoOrder);
    return infoOrderView;
}

function renderTimeOrder() {
    let listTime = '';
    let today = new Date();
    let date = `${(today.getDate() < 10) ? '0'+ today.getDate() : today.getDate()}-${(today.getMonth() < 10) ? '0'+ (today.getMonth()+1) : (today.getMonth()+1)}-${today.getFullYear()}`;
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = time+' '+date;

    listTime = `
            <h4 class="time-order">Thời gian đặt: ${dateTime}</h4>
    `;

    timeOrder.html(listTime);
    return timeOrder;
}


function renderNoteAndPayment() {
    let informationOrder = getItemSessionStorage("noteOrderSuccess");
    console.log(informationOrder);

    let viewListCustomerNote = '';
    viewListCustomerNote = `
                    <label>Ghi chú</label>
                    <div class="alert alert-primary" id="note-by-customer" role="alert">
                        ${informationOrder.note}
                    </div>
                    <label>Hình thức thanh toán</label>
                    <div class="alert alert-dark" id="payment-method" role="alert">
                        ${informationOrder.payments}
                    </div>
                 
                 `;
    listCustomerNote.html(viewListCustomerNote);
    return listCustomerNote;
}

function renderListOrderDetailPayment() {
    let cartPayment = getItemSessionStorage("productOrderSuccess");
    let viewListProductTotal = '';
    //console.log('Render payment');
    
    if(cartPayment && cartPayment.length > 0) {
        //render list
        
        // console.log(cartPayment.length);
        viewListProductTotal = cartPayment.map((item, index) => {
            
            return ` 
                <tr class="">
                    <td>${index + 1}</td>
                    <td class="name-number-product">${item.productName}</td>
                    <td class="name-number-product">${item.productQuantity}</td>
                    <td class="cart-totalprice">
                        <span class="product-total-price">${numberWithCommas(item.productPrice * item.productQuantity)}</span>
                    </td>
                </tr>
                `;
        });

        viewListTotal = `
                <tr class="order-total">
                    <th colspan="3">Tổng</th>
                    <td>
                        <span class="sum-cost" id="sum-cost">${numberWithCommas(cal(cartPayment).amount)}</span>
                    </td>
                </tr>
        `;

    
    }

    listOrderTotal.html(viewListProductTotal);
    listOrderTotal.append(viewListTotal);
    
}


function renderListOrderCustomer() {
    let userDetails = JSON.parse(getItemSessionStorage('tokenLoginSuccess'));
    console.log(userDetails);
    let viewListCustomer = '';
    viewListCustomer = `
                    <ul class="list-group">
                        <li class="list-group-item active">Họ tên: ${userDetails.name}</li>
                        <li class="list-group-item">Email: ${userDetails.email}</li>
                        <li class="list-group-item">Địa chỉ: ${userDetails.adress}</li>
                        <li class="list-group-item">Số điện thoại: ${userDetails.phoneNumber}</li>
                        
                    </ul>

                 `;
    listCustomerDetail.html(viewListCustomer);
    return listCustomerDetail;

}
