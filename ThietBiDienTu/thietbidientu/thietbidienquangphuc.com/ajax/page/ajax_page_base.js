var textNameCompany, textSlogan, linkEmailCompany, textEmailCompany, linkFacebookCompany, linkYoutubeCompany, linkZaloCompany, descriptionCompnay, iframeAddressCompany,
    textAddressCompany, linkPhoneCompany, linkPhoneCompany2, textPhoneCompany, textPhoneCompany2, liNavTemp, selectCategorySearch, textSearch, navNTemp, navCategory, listNewFooter, listInfoFooter, listFileFooter;

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

    viewSocialCompany();
    activeMenuMain();
    viewNavAndSelectCategorySearch();
    viewNumberCart();
    keypressEnterInputSearchProduct();
    showAllProduct();
    viewNav1();
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
// viewNav1();
// //view navcategory

function viewNav1() {
    $.ajax({
        url:"http://localhost:8080/Doan_Thietbidien_war/api/v1/category/find-all",
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
            url:"http://localhost:8080/Doan_Thietbidien_war/api/v1/product/find-all",
            method:"GET",
            success:function(rs){
            var dataArray = rs.data;
            console.log(dataArray.length);
            for (var i = 0; i < dataArray.length; i++){
                // $('#list-product').append('<div class="col-lg-6 col-md-4 col-lg-3"><strong>'+dataArray[i].name+'</strong></div>');
                $('#list-product').append('<div class="product-inner col-lg-3"> <div class="product__img"><img src="'+dataArray[i].image+'" class="product-img"><div class="product__promo product-promo"> </div> </div> <div class="product__text"><span class="d-block text-center product-name">'+dataArray[i].name+'</span><div class="product-price text-center"><span>'+dataArray[i].price+'</span></div><div class="bt-add-cart text-center"><button type="button" class="btn btn-primary btn-add-cart" data-id="'+dataArray[i].id+'">Thêm vào giỏ</button> </div></div></div>')
            };      
            }
            })
    }
  

function searchProduct() {
    let linkProductType = selectCategorySearch.val();
    let search = textSearch.val();
    location.href  = `${linkProductType}&search=${search}`;
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
