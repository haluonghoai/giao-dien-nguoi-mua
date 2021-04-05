let listDetailOrder, listProductOrder, listProductOrderTotal;
let listCustomerDetail;
let timeOrder, infoOrderView;
let track;
let btnPayment;


// let paymentByBank, paymentByCash;
let paymentMethod, noteByCustomer;

let statusOrder = [
    {id: 0, statusName: "Chưa xác nhận"},
    {id: 1, statusName: "Đã xác nhận"},
    {id: 2, statusName: "Đang giao hàng"},
    {id: 3, statusName: "Đã giao hàng"},
    {id: 4, statusName: "Đã hủy"},
];


$(function () {

    listDetailOrder = $('.tracking-order');
    listProductOrder = $('.product-order');
    listProductOrderTotal = $('.product-order-total');
    
    listCustomerDetail = $('.customer-field');
    timeOrder = $('.time-order-box');

    btnPayment = $('.btn-payment');
    infoOrderView = $(".info-order-view")
    track = $('.track .step');

    renderListOrderDetail();
    renderListOrderCustomer();
    renderListOrderProduct();
    paymentEventHandler();
  
})


// function trackingOrderStatus(idOrder) {   
//     const result = statusOrder.some(ele => {
//         return ele.id === idOrder;
//     });
//     return result;
    
// }


function paymentEventHandler() {
    btnPayment.on('click', function() {
        $('#paymentModal').modal('show');
    });
}

function setActiveTrack(idOrder) {
    
   track[idOrder - 1].classList.add('active');
   console.log(track[idOrder]);
}

function renderListOrderDetail() {
    let informationOrder = getItemSessionStorage("noteOrderSuccess");
    console.log(informationOrder);
    let timeFormat = new Date(informationOrder.timeCreate);

    let date = `${(timeFormat.getDate() < 10) ? '0'+ timeFormat.getDate() : timeFormat.getDate()}-${(timeFormat.getMonth() < 10) ? '0'+ (timeFormat.getMonth()+1) : (timeFormat.getMonth()+1)}-${timeFormat.getFullYear()}`;

    let dayExpected = new Date(timeFormat.setDate(timeFormat.getDate() + 7));
    let dayExpectedFormat = `${(dayExpected.getDate() < 10) ? '0'+ dayExpected.getDate() : dayExpected.getDate()}-${(dayExpected.getMonth() < 10) ? '0'+ (dayExpected.getMonth()+1) : (dayExpected.getMonth()+1)}-${dayExpected.getFullYear()}`;
    
    console.log(dayExpected);
    setActiveTrack(informationOrder.orderStatus);
    


    let viewListDetailOrder = '';
    viewListDetailOrder = `
                    <div class="card-info">
                        <h4>Order ID: ${informationOrder.idOrder}</h4>
                        <h4>Thời gian đặt: ${date}</h4>  
                    </div>
                    <article class="card">
                        <div class="card-body row">
                            <div class="col"> <strong>Dự kiến thời gian giao:</strong> <br>${dayExpectedFormat}</div>
                            <div class="col"> <strong>Hình thức thanh toán:</strong> <br> ${informationOrder.payments}</div>
                            <div class="col"> <strong>Note:</strong> <br> ${informationOrder.note} </div>
                            <div class="col"> <strong>Trạng thái: </strong> <br> ${statusOrder[informationOrder.orderStatus].statusName}</div>
                        </div>
                    </article>                
                 `;
    listDetailOrder.html(viewListDetailOrder);
    return listDetailOrder;
}

function renderListOrderProduct() {
    let cartPayment = getItemSessionStorage("productOrderSuccess");
    let viewListProductTotal = '';
    //console.log('Render payment');
    
    if(cartPayment && cartPayment.length > 0) {
        //render list
        
        // console.log(cartPayment.length);
        viewListProductTotal = cartPayment.map((item, index) => {
            
            return ` 
                <li class="col-md-4">
                    <figure class="itemside mb-3">
                        <div class="aside"><img src="${item.productImage}" class="img-sm border"></div>
                        <figcaption class="info align-self-center">
                            <p class="title">${item.productName} <br><strong>Số lượng: ${item.productQuantity}</strong></p> 
                            <span class="text-muted">${numberWithCommas(item.productPrice)} VNĐ</span>
                        </figcaption>
                    </figure>
                </li>
            `;
        });

        viewListTotal = `
                <h3 class="text-right">Tổng tiền: ${numberWithCommas(cal(cartPayment).amount)} VNĐ</h3>
        `;

    
    }

    listProductOrder.html(viewListProductTotal);
    listProductOrderTotal.html(viewListTotal);
    
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
