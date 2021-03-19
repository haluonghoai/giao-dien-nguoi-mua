let textNameCompany, textSlogan, linkEmailCompany, textEmailCompany, linkFacebookCompany, linkYoutubeCompany, linkZaloCompany, descriptionCompnay, iframeAddressCompany,
    textAddressCompany, linkPhoneCompany, linkPhoneCompany2, textPhoneCompany, textPhoneCompany2, liNavTemp, selectCategorySearch, textSearch, navNTemp, navCategory, listNewFooter, listInfoFooter, listFileFooter;

//Array Product cart
 const products = getItemSessionStorage("productsItem") || [];
 let listProductCart;

$(function () {
    //textNameCompany = $(".text-name-company");
    textSlogan = $(".text-solgan");
    linkEmailCompany = $(".link-email-company");
    textEmailCompany = $(".text-email-company");
    linkFacebookCompany = $(".link-facebook-company");
    linkYoutubeCompany = $(".link-youtube-company");
    linkZaloCompany = $(".link-zalo-company");
    descriptionCompnay = $(".description-compnay");
    iframeAddressCompany = $(".iframe-address-company");
    textAddressCompany = $(".text-address-company");
    linkPhoneCompany = $(".link-phone-comany");
    linkPhoneCompany2 = $(".link-phone-comany2");
    textPhoneCompany = $(".text-phone-company");
    textPhoneCompany2 = $(".text-phone-company2");
    navCategory = $("#nav-category");
    listNewFooter = $("#list-new-footer");
    listInfoFooter = $("#list-info-footer");
    listFileFooter = $("#list-file-footer");

    liNavTemp = $("#li-nav-temp");
    selectCategorySearch = $("#cars");
    textSearch = $("#text-search");
    navNTemp = liNavTemp.find(".class-n");

    //viewSocialCompany();

    cartNumberCount = $('#slsp-s');
    listProductCart = $("#list-product-cart");







    activeMenuMain();
    viewNavAndSelectCategorySearch();
    viewNumberCart();
    keypressEnterInputSearchProduct();
    showAllProduct();
    viewNav1();

   // addProductToCart();
    //cartNumberCount.html(products.length);

})

//HEADER
function viewSocialCompany() {
    companyFindById(COMPANY_ID).then(rs => {
        if(rs) {
            let {address, description, email, logo, map, nameCompany, website, slogan} = rs;
            textNameCompany.html(viewField(nameCompany));
            textSlogan.html(viewField(slogan));
            linkEmailCompany.attr("href", email ? `mailto:${email}` : "");
            textEmailCompany.html(viewField(email));
            descriptionCompnay.html(viewField(description));
            iframeAddressCompany.attr("src", viewField(map));
            textAddressCompany.html(viewField(address));
        }
    }).catch(err => {
        console.log(err);
        alertDanger(DANGER_INFOR_COMPANY);
    })
    infoFindByCompany(COMPANY_ID).then(rs => {
        if(rs) {
            let arrDienThoai = rs.filter(data => data.type === 1 );
            let arrFacebook = rs.filter(data => data.type === 2);
            let arrYoutube = rs.filter(data => data.type === 4);
            let arrZalo = rs.filter(data => data.type === 9);
            linkFacebookCompany.attr("href", viewField(arrFacebook[0].value));
            linkYoutubeCompany.attr("href", viewField(arrYoutube[0].value));
            linkZaloCompany.attr("href", viewField(arrZalo[0].value));
            //PHONE NUMBER
            let valuePhoneNumber = arrDienThoai[0] ? arrDienThoai[0].value : null;
            let valuePhoneNumber2 = arrDienThoai[1] ? arrDienThoai[1].value : null;
            linkPhoneCompany.attr("href", valuePhoneNumber ? `tel:${valuePhoneNumber}` : "");
            linkPhoneCompany2.attr("href", valuePhoneNumber ? `tel:${valuePhoneNumber2}` : "");
            textPhoneCompany.text(viewField(valuePhoneNumber));
            textPhoneCompany2.text(viewField(valuePhoneNumber2));
        }
    }).catch(err => {
        console.log(err);
        alertDanger(DANGER_INFOR_COMPANY);
    })
}

async function viewNavAndSelectCategorySearch() {
    await productTypeFindByCompany(COMPANY_ID).then(rs => {
        if(rs) {
            let optionTemp = selectCategorySearch.find("option");
            rs.map(data => {
                let liNavTempClone = liNavTemp.clone();
                liNavTempClone.removeClass("d-none");
                liNavTempClone.find(".nav-href").attr("href", viewAliasProductType(data.alias, data.id));
                liNavTempClone.find(".nav-href").attr("data-id", data.id);
                liNavTempClone.find(".nav-text").html(viewField(data.name));
                liNavTempClone.find(".nav1").attr("data-id", data.id);
                liNavTempClone.removeAttr("id");
                //add html
                liNavTemp.before(liNavTempClone);
                //add Nav1
                // viewNav1(data.id);
                //viewSelectProductTypeSearch
                let optionClone = optionTemp.clone();
                optionClone.removeAttr("selected");
                optionClone.attr("value", viewAliasProductType(data.alias, data.id));
                optionClone.html(viewField(data.name));
                selectCategorySearch.append(optionClone);
            })
        }
    }).catch(err => {
        console.log(err);
        alertDanger(DANGER_PRODUCT_TYPE);
    })
    //view nav1-category

}
 //viewNav1();
// //view navcategory

function viewNav1() {
    $.ajax({
        url:"http://localhost:8080/DOAN_Thiet_bi_dien_war/api/v1/category/find-all",
        method:"GET",
        success:function(rs){
            var dataArray = rs.data;
            for (var i = 0; i < dataArray.length; i++){
                
               var name = dataArray[i].name;
               $('#nav_danh_muc').append("<li>"+name+"</li>")
               
            };      
            }
    }
    )}

    
    
    function showAllProduct(){
        
       
        $.ajax({
            url:"http://localhost:8080/DOAN_Thiet_bi_dien_war/api/v1/product/find-all",
            method:"GET",
            success:function(rs){
            var dataArray = rs.data;
        
            console.log(dataArray.length);
            for (var i = 0; i < dataArray.length; i++){
                // $('#list-product').append('<div class="col-lg-6 col-md-4 col-lg-3"><strong>'+dataArray[i].name+'</strong></div>');
                console.log(dataArray);
                $('#list-product').append('<div class="product-inner col-lg-3 my-3"> <div class="product__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="text-center"><button type="button" class="btn btn-primary btn-add-cart" onclick="addProductToCart(event)" data-id="'+dataArray[i].id+'" data-name="'+dataArray[i].name+'" data-price="'+dataArray[i].price+'" data-image="'+dataArray[i].image+'" >Thêm vào giỏ</button> </div></div></div>')
            };      
            }
            })
        
    }

    function loadProductByCategory() {
        $.ajax({
            url: "http://localhost:8080/DOAN_Thiet_bi_dien_war/api/v1/category/find-all",
            method: "GET",
            success:function(rs){
                var dataArray = rs.data;
                console.log(dataArray.length);
                for (var i = 0; i < dataArray.length; i++){
                    // $('#list-product').append('<div class="col-lg-6 col-md-4 col-lg-3"><strong>'+dataArray[i].name+'</strong></div>');
                    
                    $('#list-product').append('<div class="product-inner col-lg-3 my-3"> <div class="product__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="text-center"><button type="button" class="btn btn-primary btn-add-cart" onclick="addProductToCart(event)" data-id="'+dataArray[i].id+'" data-name="'+dataArray[i].name+'" data-price="'+dataArray[i].price+'" data-image="'+dataArray[i].image+'" >Thêm vào giỏ</button> </div></div></div>')
                };      
                }
        })
    }
  

function searchProduct() {
    let linkProductType = selectCategorySearch.val();
    let search = textSearch.val();
    $.ajax({
        url: `http://localhost:8080/DOAN_Thiet_bi_dien_war/api/v1/product/search-by-name?name=${search}`,
        method: "GET",
        success:function(rs){
            var dataArray = rs.data;
            console.log(dataArray.length);
            for (var i = 0; i < dataArray.length; i++){
                // $('#list-product').append('<div class="col-lg-6 col-md-4 col-lg-3"><strong>'+dataArray[i].name+'</strong></div>');
                $('.search-product').css('display', 'block');
                $('#list-product-search').append('<div class="product-inner-search my-3"> <div class="product-search__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="text-center"><button type="button" class="btn btn-primary btn-add-cart" onclick="addProductToCart(event)" data-id="'+dataArray[i].id+'" data-name="'+dataArray[i].name+'" data-price="'+dataArray[i].price+'" data-image="'+dataArray[i].image+'" >Thêm vào giỏ</button> </div></div></div>')
                
            };      
            }
    })
    //location.href  = `${linkProductType}&search=${search}`;
   //location.href  = `&search=${search}`;
    
}


// ADD TO CART NEW

function getItemSessionStorage(key) {
    let rs = sessionStorage.getItem(key);
    rs = rs ? JSON.parse(rs) : null;
    return rs;
}

function setItemSessionStorage(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
}


function addProductToCart(e) {
    e = e || window.event;

   

    let productID = e.target.dataset.id;
    let productName = e.target.dataset.name;
    let productPrice = e.target.dataset.price;
    let productImage = e.target.dataset.image;
    

    const product = {
        productID,
        productName,
        productPrice,
        productImage,
    }

    products.push(product)
    
    setItemSessionStorage("productsItem", products);
    viewNumberCart();
   
    alert('Đã thêm ' + productName + ' vào giỏ hàng');
    //onclick="addProductToCart(event)" add to (btn-add-cart) button
}

function viewNumberCart() {
    let arrProduct = getItemSessionStorage("productsItem");
    console.log(arrProduct);
    let count = 0;
    if(arrProduct && arrProduct.length > 0) {
        $("#slsp-s").html(arrProduct.length);
    }
    if(arrProduct == null) {
        $("#slsp-s").html(0);
    }
    
    handleAnimationCart();
}


async function viewListProductCart() {
    let newCart = getItemSessionStorage("productsItem");
    if(newCart && newCart.length > 0) {
        let listId = newCart.map(data => data.id);
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
  //  viewNumberCart();
}


function keypressEnterInputSearchProduct() {
    textSearch.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            searchProduct();
        }
    });
}

//END_HEADER

//FOOTER
//END_FOOTER

//ActiveMenuMain
function activeMenuMain() {
    let {pathname} = location;
    if(pathname == "/") pathname = "/trang-chu";
    $("#nav-main li").removeClass("active");
    $(`#nav-main li[data-active='${pathname.slice(1)}']`).addClass("active");
}
