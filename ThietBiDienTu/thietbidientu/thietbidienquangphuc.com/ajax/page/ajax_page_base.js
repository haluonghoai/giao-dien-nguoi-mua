let textNameCompany, textSlogan, linkEmailCompany, textEmailCompany, linkFacebookCompany, linkYoutubeCompany, linkZaloCompany, descriptionCompnay, iframeAddressCompany,
    textAddressCompany, linkPhoneCompany, linkPhoneCompany2, textPhoneCompany, textPhoneCompany2, liNavTemp, selectCategorySearch, textSearch, navNTemp, navCategory, listNewFooter, listInfoFooter, listFileFooter;

//Array Product cart
 const products = getItemSessionStorage("productsItem") || [];
 let productQuantity = 0;
 let listProductCart, listCalTotal;

 let checkItemInCart = false;

 let myButtonCart, myButtonThanhtoan, myButtonDeleteCart;

 // Login - Register (Form)
 let headerTextAuthen;

 let fieldUsername, fieldPassword, formLogin, btnLogin, btnRegister;
 let fieldName, fieldPass, fieldHoten, fieldEmail, fieldAddress, fieldPhone;

 // Detail Page
 let productItem;
 

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
    listCalTotal = $('#cal-total-sum');

    //viewSocialCompany();

    cartNumberCount = $('#slsp-s');
    listProductCart = $("#list-product-cart");
    myButtonCart = $('#myBtnCart');
    myButtonDeleteCart = $('.btnDeleteCart');
    myButtonThanhtoan = $('#btnThanhtoan');

    //Login
    headerTextAuthen = $('.header-contact');

    fieldUsername = $('#myName');
    fieldPassword = $('#myPassword');

    fieldName = $('#name');
    fieldPass = $('#password');
    fieldHoten = $('#hoten');
    fieldEmail = $('#email');
    fieldAddress = $('#diachi');
    fieldPhone = $('#sodienthoai');



    formLogin = $('#myForm');
    btnLogin = $('.myBtnLogin');
    btnRegister = $('.myBtnRegister');

    
    
    loginUser();
    registerUser();
    
    buttonHandleEvent();
    buttonHandleDeleteCart();
    buttonHandleDeleteItem();
    hasUserLogin();


    activeMenuMain();
    viewNavAndSelectCategorySearch();
    viewNumberCart();
    renderListProductCart();
    keypressEnterInputSearchProduct();
    showAllProduct();
    viewNav1();
    

    moveToDetailPage();
    

    // bao vut vao day thay
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
        url:"http://localhost:8080/api/v1/category/find-all",
        method:"GET",
        dataType: "json",
        success:function(rs){
            var dataArray = rs["data"];
            for (var i = 0; i < dataArray.length; i++){
                
               var name = dataArray[i].name;
               var id = parseInt(dataArray[i].id);
               $('#nav_danh_muc').append(`<li onclick="loadProductByCategory(${id})" data-id="${id}">${name}</li>`)
               
             };      
            }
    }
    )}

    
    
    function showAllProduct(){
        
       
        $.ajax({
            url:"http://localhost:8080/api/v1/product/find-all",
            method:"GET",
            dataType: "json",
            success:function(rs){
            var dataArray = rs["data"];
        
            for (var i = 0; i < dataArray.length; i++){
                // $('#list-product').append('<div class="col-lg-6 col-md-4 col-lg-3"><strong>'+dataArray[i].name+'</strong></div>');
                console.log(dataArray);
                $('#list-product').append('<div class="product-inner col-lg-3 my-3" onclick="moveToDetailPage()" data-idDetail="'+dataArray[i].increaseId+'"> <div class="product__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="text-center"><button type="button" class="btn btn-primary btn-add-cart" onclick="addProductToCart()" data-id="'+dataArray[i].increaseId+'" data-name="'+dataArray[i].name+'" data-price="'+dataArray[i].price+'" data-image="'+dataArray[i].image+'" >Thêm vào giỏ</button> </div></div></div>')
            };      
            }
            })
        
    }

    function loadProductByCategory(idCategory) {

        $('#list-product').empty();

        $.ajax({
            url:`http://localhost:8080/api/v1/product/find-by-category?idCategory=${idCategory}`,
            method:"GET",
            dataType: "json",
            success:function(rs){
            var dataArray = rs["data"];
            
                for (var i = 0; i < dataArray.length; i++){
                    
                    console.log(dataArray);
                    $('#list-product').append('<div class="product-inner col-lg-3 my-3" onclick="moveToDetailPage()" data-idDetail="'+dataArray[i].increaseId+'"> <div class="product__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="text-center"><button type="button" class="btn btn-primary btn-add-cart" onclick="addProductToCart()" data-id="'+dataArray[i].increaseId+'" data-name="'+dataArray[i].name+'" data-price="'+dataArray[i].price+'" data-image="'+dataArray[i].image+'" >Thêm vào giỏ</button> </div></div></div>')
                };          
            }
            })
    }
  

function searchProduct() {
    let linkProductType = selectCategorySearch.val();
    let search = textSearch.val();
    $.ajax({
        url: `http://localhost:8080/api/v1/product/search-by-name?name=${search}`,
        dataType: "json",
        method: "GET",
        success:function(rs){
            var dataArray = rs["data"];
            console.log(dataArray.length);
            $('#list-product-search').empty();
            for (var i = 0; i < dataArray.length; i++){
                // $('#list-product').append('<div class="col-lg-6 col-md-4 col-lg-3"><strong>'+dataArray[i].name+'</strong></div>');
                $('.search-product').css('display', 'block');
                $('#list-product-search').append('<div class="product-inner-search my-3" onclick="moveToDetailPage()"> <div class="product-search__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="text-center"><button type="button" class="btn btn-primary btn-add-cart" onclick="addProductToCart(event)" data-id="'+dataArray[i].increaseId+'" data-name="'+dataArray[i].name+'" data-price="'+dataArray[i].price+'" data-image="'+dataArray[i].image+'" >Thêm vào giỏ</button> </div></div></div>')
                
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

/**
 * Code handle Order and Add to cart
 */

function addProductToCart(e) {
    e = e || window.event;

   

    let productID = parseInt(e.target.dataset.id);
    let productName = e.target.dataset.name;
    let productPrice = e.target.dataset.price;
    let productImage = e.target.dataset.image;

    
    //check quantity
    checkItemInCart = products.filter(data => {
        
        return data.productID === productID ;
    })

    const product = {
                productID,
                productName,
                productPrice,
                productImage,
                productQuantity: 1
    };
    // check item co roi thi quantity += 1
    //ham onload dau ? viet di xong t onload
    //the m viet sang 1 file khac roi nhung no vao n
    // tu tu dat ho cai de bug
    // moi lan xoa session reffresh lai trang di dang bi code thg kia de len
    //ok ?, ke dau buoi, do m chay dc day
    // ao vlon :)). chan ban lam master javascriup the nay thi ong :v 
    if(checkItemInCart.length > 0){
        
        products.forEach(p => {
            if(p.productID === productID) {
                p.productQuantity += 1;
            }
        })
    }
    else
        products.push(product);

  
    setItemSessionStorage("productsItem", products);
    
    viewNumberCart();

    
}

function buttonHandleDeleteCart() {
    myButtonDeleteCart.on('click', function() {
        sessionStorage.removeItem('productsItem');
        window.location.reload();
    });
}

function removeProduct(e) {
   
    if(e.target.matches('.btnDeleteItem')) {
        const el = e.target;
        const delIndex = parseInt(el.dataset.idItem);
        products.splice(delIndex, 1);
        setItemSessionStorage("productsItem", products);
        window.location.reload();
    }
    return;

}
function buttonHandleDeleteItem() {

    listProductCart.on('click', function(e) {
        removeProduct(e);
    })

}

function cal(products){
    var calculation = {
        amount : 0,
        amountTemp : 0
    }
    products.forEach(p =>{
        calculation.amountTemp += p.productPrice * p.productQuantity;
    })
    calculation.amount += calculation.amountTemp + calculation.amountTemp * 0,1;
    return calculation;
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

function renderListProductCart() {
    let newCart = getItemSessionStorage("productsItem");
    let viewListProductCart, viewListCalTotal = '';


    if(newCart && newCart.length > 0) {
        console.log('hello render');
        //render list
        viewListProductCart = newCart.map((item, index) => {
            return ` <tr class="cart_item" id="cart-product-new">
                                <td class="cart-premove">
                                    <button class="btnDeleteItem" title="Xóa sản phẩm này" data-idItem=${index}">x</button>
                                </td>
                                <td class="cart-img">
                                    <a href="#" class="href-product-cart">
                                        <img src="${item.productImage}" alt="" class="img-product-cart">
                                    </a>
                                </td>
                                <td class="cart-name">
                                    <a href="#" class="href-product-cart name-product-cart">${item.productName}</a>
                                </td>
                                <td class="cart-price  d-none d-md-block" data-title="Giá">
                                    <span class="cost-product-cart">${item.productPrice}</span>
                                </td>
                                <td class="cart-quantity" data-title="Số lượng">
                                    <div class="quantity buttons_added">
                                    
                                        <input type="number" id="number" value="${item.productQuantity}" min="1" max="100" step="1" class="input-product-cart" data-id=${index} onchange="inputChangeProductCart()"/>
                                    
                                    </div>
                                    
                                </td>
                                <td class="cart-subtotal" data-title="Tổng">
                                    <span class="total-product-cart">${item.productPrice * item.productQuantity}</span>
                                </td>
                     </tr>
            `;
        });

        //render tong 
        // Lam tiep o day
        
        viewListCalTotal =  `
            <tr class="cart-psubtotal">
                <th>Tạm tính</th>
                <td data-title="Tạm tính" id="tam-tinh">
                    <span id="temp-sum-total">${cal(newCart).amountTemp}</span>
                </td>
            </tr>
            <tr class="order-total">
                <th>Tổng</th>
                <td data-title="Tổng" id="tong-tien">
                    <span id="sum-total">${cal(newCart).amount}</span>
                </td>
            </tr>
        `;
    }



    listProductCart.html(viewListProductCart);
    listCalTotal.html(viewListCalTotal)
}

function inputChangeProductCart(e) {
    e = e || window.event;
    let qty = parseInt(e.target.value);
    let index = parseInt(e.target.dataset.id);
    products[index].productQuantity = qty;
    setItemSessionStorage("productsItem", products)
    //console.log(newCart[index].productQuantity);
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

/**
 * Code handle Authentication
 */
function hasUserLogin() {
    const validLogin = isLoggedIn();
    const userLogin = JSON.parse(getItemSessionStorage('tokenLoginSuccess'));
    let userLoginName;

    if(userLogin == null) {
        userLoginName = 'Username'
    } else {

        userLoginName = userLogin.username;
    }
    //console.log(userLoginName);
    const userLoginText = `
        Hello ${userLoginName}
         <button class="brn btn-info btn-lg btnLogout" onclick="logoutUser()">
            <i class="fas fa-sign-out-alt"></i>
        </button>
    `
   
    if(validLogin) {
        headerTextAuthen.html(userLoginText);
    }

}

function logoutUser() {
    if(confirm('Are you sure want to logout ?')) {
        sessionStorage.removeItem('tokenLoginSuccess');
        window.location.reload();
        
    }
    return false;
}

function isLoggedIn() {
    const tokenLogin = getItemSessionStorage('tokenLoginSuccess');
    if(!tokenLogin) {
        return false;
    }
    return true;
}

function autoRedirect(url = null) {
    let validLogin = isLoggedIn();
    
    if(!validLogin) {
        window.location = 'login.html';
    }
    if(validLogin) {
        window.location = url;
    }
}


function loginUser() {  
  
    // jQuery ajax form submit example, runs when form is submitted 
    btnLogin.on('click', function(e) { 
        var username = fieldUsername.val();
        var password = fieldPassword.val();
        // e.preventDefault(); // prevent actual form submit
        console.log(username);
       // var form = $(this);
      //  var url = form.attr('action'); //get submit url [replace url here if desired]
        $.ajax({
            url: `http://localhost:8080/api/v1/customer/search-customer-username?username=${username}`,
            type: 'GET',
            dataType: 'json',
            success:function(rs){
                let userPassword;
                // Check username
                if (rs.data === undefined || rs.data.length == 0) {
                    fieldUsername.val('Username sai');
                    fieldUsername.css({'border-color': 'red', 'color': 'red'});
                    fieldUsername.focus(function() {
                        fieldUsername.val('');
                    })
                    return;
                }

                userPassword = rs.data[0].password ;
                
                //check password
                if(password != userPassword) { // check tạm, check cẩn thận thì phải ===
                    alert('Username or Password wrong');
                    return;
                } else {
                    alert('Login Success');
                    setItemSessionStorage('tokenLoginSuccess', JSON.stringify(rs.data[0]));
                    // console.log(btnLogin.attr("href"));
                    autoRedirect('dathang.html');
                    //  window.location = 'dathang.html';
                   // btnLogin.attr("href","gio-hang.html" ); // chua hoan thien
                }
                
            },
            error: function(rs) {
                alert('Username sai')
            }
        });
    });
}

function validateNewUser() {
    var name = fieldName.val();
    var pass = fieldPass.val();
    var hoten = fieldHoten.val();
    var email = fieldEmail.val();
    var address = fieldAddress.val();
    var phonenumber = fieldPhone.val();
 
    if(name == '') {
        fieldName.val('Tên không được để trống');
        fieldName.css({'border-color': 'red', 'color': 'red'});
        fieldName.focus(function() {
            fieldName.val('');
        })
        return false;
    }

    if(pass == '') {
        fieldPass.val('Password không được để trống');
        fieldPass.css({'border-color': 'red', 'color': 'red'});
        fieldPass.focus(function() {
            fieldPass.val('');
        })
        return false;
    }

    if(hoten == '') {
        fieldHoten.val('Username không được để trống');
        fieldHoten.css({'border-color': 'red', 'color': 'red'});
        fieldHoten.focus(function() {
            fieldHoten.val('');
        })
        return false;
    }

    if(email == '') {
        fieldEmail.val('Email không được để trống');
        fieldEmail.css({'border-color': 'red', 'color': 'red'});
        fieldEmail.focus(function() {
            fieldEmail.val('');
        })
        return false;
    }

    return true;
}   

function registerUser() {
    // jQuery ajax form submit example, runs when form is submitted 
    btnRegister.on('click', function(e) { 

        var name = fieldName.val();
        var pass = fieldPass.val();
        var hoten = fieldHoten.val();
        var email = fieldEmail.val();
        var address = fieldAddress.val();
        var phonenumber = fieldPhone.val();

        const validValidate = validateNewUser();

        if(!validValidate) {
            alert('Sai');
            return;
        }
        
            
            const customerNew = {
                "name" : name,
                "email" : email,
                "adress" : address,
                "phoneNumber" : phonenumber,
                "username" : hoten,
                "password" : pass 
            }
         
            $.ajax({
                url: `http://localhost:8080/api/v1/customer/add`,
                type: 'POST',
                data: customerNew,
                contentType: "application/json;charset=utf-8",
                data:
                    JSON.stringify(customerNew)
                ,
                success: function (res) {
                    alert('Register success');
                    let userNew = JSON.parse(res);
                    setItemSessionStorage('tokenLoginSuccess', JSON.stringify(userNew.data));
                    autoRedirect('trang-chu.html');
                    console.log(res);
                },
                error: function(errorThrown) {
                    alert('Register Fail');
                    console.log(errorThrown);
                }
            });
        

    });
}

function buttonHandleEvent() {
    myButtonThanhtoan.on('click', function() {
        autoRedirect('dathang.html');
    });
}



/**
 * Code handle Detail Product page
 */
function moveToDetailPage(e) {
    e = e || window.event;
    let targetEle = e.target;

    if(targetEle.matches('.btn-add-cart')) {
        return;
    }

    productItem = targetEle.closest('.product-inner');
    let idItem = parseInt(productItem.dataset.iddetail);
    

    $.ajax({
        url: `http://localhost:8080/api/v1/product/find-by-id?id=${idItem}`,
        dataType: "json",
        method: "GET",
        success:function(rs){
            var dataArray = rs["data"];
            setItemSessionStorage("productItemDetail", dataArray);
            window.location = 'chi-tiet-san-pham.html';
        }
    });
    
}
