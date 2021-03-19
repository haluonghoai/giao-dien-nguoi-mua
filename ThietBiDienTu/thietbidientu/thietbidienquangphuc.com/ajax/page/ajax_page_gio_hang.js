let cartProductTemp, tempSumTotal, sumTotal;
var arrCart = [];
var cart = [];
$(function (){
    // listProductCart = $("#list-product-cart");
    cartProductTemp = $("#cart-product-temp");
    tempSumTotal = $("#temp-sum-total");
    sumTotal = $("#sum-total");
    hiddenNavHero();
    viewListProductCart();
})


//cart
function getCartLocalStorage() {
    let cart = [];
    if (localStorage && localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    return cart;
}


$(".btn-add-cart").unbind("click").click(function () {
    console.log('hello')
    addToCart($(this).attr("data-id"));
    return false;
})


function addToCart(id, number = 1) {
    let cart = getCartLocalStorage();
    let check = true;
    cart = cart.map(data => {
        if(data.id == id) {
            if(data.number == number) {
                alertInfo(INFO_CART_PRODUCT_EXIT);
            } else {
                data.number = number;
                alertSuccess(SUCCESS_CART_UPDATE_NUMBER_PRODUCT);
            }
            check = false;
        }
        return data;
    })
    if(check) {
        cart.push({id, number});
        alertSuccess(SUCCESS_CART_ADD_PRODUCT);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  //  viewNumberCart();
}



function handleAnimationCart() {
    $(".gioHang .animate__animated").addClass("animate__wobble");
    setTimeout(function () {
        $(".gioHang .animate__animated").removeClass("animate__wobble");
    },1000);
}
//end_cart




function changeNumberProductCart(id, number) {
    arrCart = arrCart.map(data => {
        if(data.id == id) {
            data.number = number;
            let {promotions, cost} = data;
            let {minusPrice} = viewPromotionCostProduct(promotions, cost);
            cost = cost - minusPrice;
            $(`#product-cart-${id}`).find(".cost-product-cart").html(viewPriceVND(cost));
            $(`#product-cart-${id}`).find(".total-product-cart").html(viewPriceVND(cost * number));
        }
        return data;
    })
    cart = cart.map(data => {
        if(data.id == id) data.number = number;
        return data;
    })
    countCost(arrCart);
    setItemLocalStorage("cart", cart);
}

function removeProductCart(id) {
    arrCart = arrCart.filter(data => data.id != id);
    cart = cart.filter(data => data.id != id);
    countCost(arrCart);
    setItemLocalStorage("cart", cart);
    renderListProductCart();
}

function clickBtnThanhToan() {
    if(checkItemCart()) {
        location.href = "dathang.html";
    } else {
        alertInfo(INFO_CART_NO_PRODUCT);
    }
}