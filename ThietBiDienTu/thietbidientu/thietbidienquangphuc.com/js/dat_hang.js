let listProductTotal;
let customerDetail;
let buttonOrder;
// let paymentByBank, paymentByCash;
let paymentMethodsRadio, noteByCustomer;

const orderSuccess = {};


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
    fireEventHandler();
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
        viewListProductTotal = cartPayment.map((item, index) => {
            
            return ` 
                <tr class="">
                    <td>${index + 1}</td>
                    <td class="name-number-product">${item.productName}</td>
                    <td>${item.productQuantity}</td>
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

    listProductTotal.html(viewListProductTotal);
    listProductTotal.append(viewListTotal);
    
}


function renderListCustomer() {
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
    customerDetail.html(viewListCustomer);
    return customerDetail;

}


function orderProduct() {
    btnOrder.on('click', function() {

        
        let paymentMethod, paymentText;
        let userDetails = JSON.parse(getItemSessionStorage('tokenLoginSuccess'));

        let productDetails = getItemSessionStorage('productsItem');
        
        let productOrderArray = productDetails.map(item => {
            return {
                "idProduct" : item.productID,
                "amount": item.productQuantity
            };
        });

        // get Payment Method
        paymentMethodsRadio.each(function () {
            if($(this).is(':checked')) {

               paymentMethod = $(this).val();
               var idVal = $(this).attr("id");
               paymentText = $("label[for='"+idVal+"']").text();
               
            }

        });
        // testing: console.log(productOrderArray);

        var orderNew = new Object();
        orderNew.note =  noteByCustomer.val();
        orderNew.idUser = 1; // kiểm tra xem bảng nguoidung co id này ko
        orderNew.idCustomer =  userDetails.id;
        orderNew.idOrderstatus = 1, // bên admin set
        orderNew.statusPaments = false; // false: mặc định là chưa thanh toán
        orderNew.payments = parseInt(paymentMethod) ? true : false;
        var orderDTO = new Object();
        orderDTO.order = orderNew;
        orderDTO.orderDetailsList = productOrderArray;


        // Order success push to Session
       
        
        //console.log(productDetails);

        $.ajax({
            url: `http://localhost:8080/api/v1/order/addPurchase`,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            data:
            JSON.stringify(orderDTO)
            ,
            success: function (res) {

                console.log(res);
                let validData = JSON.parse(res);
                let {idOrderstatus, note} = validData.data.order;
                let idOrder = validData.data.orderDetails[0].idOrder;
                //console.log(idOrder);
                
                // push value to orderSuccess;
                orderSuccess.note = note;
                orderSuccess.payments = paymentText;
                orderSuccess.orderStatus = idOrderstatus ? 'Chưa xác nhận' : 'Đã xác nhận';
                orderSuccess.idOrder = idOrder;

                if(validData.data.check === false) {
                    $('#orderFailModal').modal('show');
                } else {          
                        $('#orderSuccessModal').modal('show');
                }             
            }
           
        });
    });
}
function fireEventHandler() {
    $("#closeNotifyOrder").on("click", function () {
        setItemSessionStorage('productOrderSuccess', [...products]);
        setItemSessionStorage('noteOrderSuccess', orderSuccess);
        sessionStorage.removeItem('productsItem');
        window.location = 'dat-hang-thanh-cong.html';
    });
}
