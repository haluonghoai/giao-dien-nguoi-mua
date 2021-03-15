let listProductCart, cartProductTemp, tempSumTotal, sumTotal;
var arrCart = [];
var cart = [];
$(function (){
    listProductCart = $("#list-product-cart");
    cartProductTemp = $("#cart-product-temp");
    tempSumTotal = $("#temp-sum-total");
    sumTotal = $("#sum-total");
    hiddenNavHero();
    viewListProductCart();
})

async function viewListProductCart() {
    cart = getCartLocalStorage();
    if(cart && cart.length > 0) {
        let listId = cart.map(data => data.id);
        await productFindByIdsAndProperties(listId).then(rs => {
            if(rs) {
                arrCart = rs.map((data, index) => {
                    for(let j = 0; j < cart.length; j++) {
                        if(data.id == cart[j].id) {
                            data.number = cart[j].number;
                            return data;
                        }
                    }
                })
            }
        }).catch(err => {
            setItemLocalStorage("cart", []);
            console.log(err);
            alertDanger(DANGER_LIST_PRODUCT);
        })
    }
    renderListProductCart();
    countCost(arrCart);
}

function renderListProductCart() {
    let viewListProduct = "";
    if(arrCart && arrCart.length > 0) {
        viewListProduct = arrCart.map(data => {
            let {alias, id, name, promotions, cost, number, quantity, image} = data;
            let cartProductClone = cartProductTemp.clone();
            cartProductClone.removeClass("d-none");
            cartProductClone.find(".remove").attr("onclick", `removeProductCart(${id})`);
            cartProductClone.attr("id", `product-cart-${id}`);
            cartProductClone.find(".href-product-cart").attr("href", viewAliasProduct(alias, id));
            let imgProductClone = cartProductClone.find(".img-product-cart");
            imgProductClone.attr("src", viewSrcFile(image));
            imgProductClone.attr("alt", viewField(name));
            cartProductClone.find(".name-product-cart").html(viewField(name));
            let {minusPrice} = viewPromotionCostProduct(promotions, cost);
            cost = cost - minusPrice;
            cartProductClone.find(".cost-product-cart").html(viewPriceVND(cost));
            cartProductClone.find(".total-product-cart").html(viewPriceVND(cost * number));
            let inputProductClone = cartProductClone.find(".input-product-cart");
            inputProductClone.attr("max", quantity);
            inputProductClone.val(number);
            inputProductClone.attr("onchange", `inputChangeProductCart(${id}, ${quantity})`);
            return cartProductClone;
        })
    }
    listProductCart.html(viewListProduct);
    runInputSpinner();
}

function inputChangeProductCart(id, quantity) {
    let inputQuantity = $(`#product-cart-${id} input[type='text']`);
    let val = inputQuantity.val();
    if(val > 0 && val <= quantity) {
        changeNumberProductCart(id, val);
    }else if(val == 0) {
        removeProductCart(id);
    }
    viewNumberCart();
}

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