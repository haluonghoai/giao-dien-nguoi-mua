let listProductTotal;
let customerDetail;
let buttonOrder;
// let paymentByBank, paymentByCash;
let paymentMethodsRadio, noteByCustomer;


window.onload = function() {
    if(location.pathname === 'dathang.html') {
        userMustLogin('dathang.html');
    }
}

$(function () {


    customerDetail = $('.customer-field');
    listProductTotal = $('#list-product-total');
    btnOrder = $('#btn-order');

    paymentMethodsRadio = $("input:radio[name='payment_method']");
    noteByCustomer = $("textarea[name='note']");
    // paymentByBank = $('#payment_method_bacs');
    // paymentByCash = $('#payment_method_cod');

   
    orderProduct();
    renderListProductPayment();
    renderListCustomer();
})


function userMustLogin(url = null) {
    let validLogin = isLoggedIn();
    
    if(!validLogin) {
        window.location = 'login.html';
    }
    if(validLogin) {
        window.location = url;
    }
}


function renderListProductPayment() {
    let cartPayment = getItemSessionStorage("productsItem");
    let viewListProductTotal = '';
    //console.log('Render payment');
    
    if(cartPayment && cartPayment.length > 0) {
        //render list
        
        // console.log(cartPayment.length);
        viewListProductTotal = cartPayment.map(item => {
            
            return ` 
                <tr class="">
                    <td class="name-number-product">${item.productName}</td>
                    <td class="cart-totalprice">
                        <span class="product-total-price">${item.productPrice * item.productQuantity}</span>
                    </td>
                </tr>
                `;
        });

        viewListTotal = `
                <tr class="order-total">
                    <th>Tổng</th>
                    <td>
                        <span class="sum-cost" id="sum-cost">${cal(cartPayment).amount}</span>
                    </td>
                </tr>
        `;

    
    }

    listProductTotal.html(viewListProductTotal);
    listProductTotal.append(viewListTotal);
    
}


function renderListCustomer() {
    let userDetails = JSON.parse(getItemSessionStorage('tokenLoginSuccess'));
    console.log(userDetails);
    let viewListCustomer = '';
    viewListCustomer = `
                        <div class="row">
                            <div class="col-12">
                                <div class="filed-item">
                                    <label>Họ Tên</label>
                                    <strong><span id="name">${userDetails.name}</span></strong>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="filed-item">
                                    <label>Email</label>
                                    <strong><span id="email">${userDetails.email}</span></strong>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="filed-item">
                                    <label>Địa chỉ</label>
                                    <strong><span id="diachi">${userDetails.adress}</span></strong>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="filed-item">
                                    <label>Số điện thoại </label>
                                    <strong><span id="sodienthoai">${userDetails.phoneNumber}</span></strong>
                                </div>
                            </div>
                        </div>
                 `;
    customerDetail.html(viewListCustomer);
    return customerDetail;

}


function orderProduct() {
    btnOrder.on('click', function() {

        
        let paymentMethod;
        let userDetails = JSON.parse(getItemSessionStorage('tokenLoginSuccess'));
        let productDetials = getItemSessionStorage('productsItem');
        
        let productOrderArray = productDetials.map(item => {
            return {
                "idProduct" : item.productID,
                "amount": item.productQuantity
            };
        });

        // get Payment Method
        paymentMethodsRadio.each(function () {
            if($(this).is(':checked')) {

               paymentMethod = $(this).val();
            }

        });
        // testing: console.log(productOrderArray);

        var orderNew = new Object();
        orderNew.note =  noteByCustomer.val();
        orderNew.idUser = 13; // kiểm tra xem bảng nguoidung co id này ko
        orderNew.idCustomer =  userDetails.id;
        orderNew.idOrderstatus = 1, // bên admin set
        orderNew.statusPaments = false; // false: mặc định là chưa thanh toán
        orderNew.payments = paymentMethod ? true : false;
        var orderDTO = new Object();
        orderDTO.order = orderNew;
        orderDTO.orderDetailsList = productOrderArray;

        //console.log(productDetials);
        $.ajax({
            url: `http://localhost:8080/api/v1/order/addPurchase`,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            data:
                JSON.stringify(orderDTO)
            ,
            success: function (res) {
                alert('Bạn đã đặt hàng thành công');
                //alert(res['data'])
                console.log(res);
                //window.location.reload();
            },
            error: function(errorThrown) {
                alert('Đặt hàng thất bại');
                console.log(errorThrown);
            }
        });
    });
}
