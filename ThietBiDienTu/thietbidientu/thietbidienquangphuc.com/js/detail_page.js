let productDetailSection;

$(function () {

    productDetailSection = $('.product-detail');
    
    renderDetailPage();
    changeNumberProductQuantity();
})


function renderDetailPage() {
     const productDetailItem = getItemSessionStorage("productItemDetail");

     console.log(productDetailItem);

    let viewListDetailItem = '';
    viewListDetailItem = `
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-5">
                                <a class="product-detail__img href-img-product" data-lightbox="image-1" href="#">
                                        <img src="${productDetailItem.image}" class="img-product" alt="${productDetailItem.name}">
                                        
                                </a>
                            </div>
                            <div class="col-12 col-md-7">
                                <div class="product-detail_decs">
                                    <h1 class="pdc-name" id="name-infor-product">${productDetailItem.name}</h1>
                                    <p class="pdc-price" id="cost-infor-product">
                                        <span class="make-bold">Giá tiền: </span>
                                        <span class="pdc-price-unit">${productDetailItem.price} VNĐ</span>
                                    </p>
                                    <p class="pdc-status">
                                        <span class="make-bold" >Tình trạng:</span>
                                        <span class="${productDetailItem.status ? 'con-hang' : 'het-hang'}" id="status-infor-product">
                                            ${productDetailItem.status ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                    </p>

                                    <p class="description make-bold">Mô tả:</p>
                                    <div class="mo-ta">
                                        ${productDetailItem.description}
                                    </div>
                                    <p class="pdc-parameter make-bold">Thông số kĩ thuật:</p>
                                    <div class="thong-so-kt-thuat">
                                        ${productDetailItem.specification}
                                    </div>
                                    <br>
                                    <div class="pdc-inbut">
                                        <div class="buttons_added">
                                            <input class="minus is-form" type="button" value="-" style="padding: 0px 20px 40px 20px;
                                            font-size: 30px;">
                                            <input aria-label="quantity" class="input-qty" max="10" min="1" name="" type="number" value="1" style="padding: 20px 2px 20px 2px;
                                            font-size: 18px;">
                                            <input class="plus is-form" type="button" value="+" style="padding: 5px 25px 35px 15px;
                                            font-size: 20px;">
                                        </div>
                                        <button class="brn btn-danger buynow" onclick="${productDetailItem.status ? 'addToCartHasNumber()' : 'alertHetHang()'}" style="padding:7px; margin-left:20px">${productDetailItem.status ? 'Mua ngay' : 'Hết hàng'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 `;
     productDetailSection.html(viewListDetailItem);
     return productDetailSection;
    
}

function alertHetHang() {
    alert('Sản phẩm này đã hết hàng, mong quý khách thông cảm !');
}

function addToCartHasNumber() {


    const productDetailItem = getItemSessionStorage("productItemDetail");


    let productID = productDetailItem.increaseId;
    let productName = productDetailItem.name;
    let productPrice = productDetailItem.price;
    let productImage = productDetailItem.image;
    let productQuantity = parseInt($('.input-qty').val());
    
    const product = {
                productID,
                productName,
                productPrice,
                productImage,
                productQuantity
    };
    
    products.push(product);

  
    setItemSessionStorage("productsItem", products);
    
    viewNumberCart();
}
function changeNumberProductQuantity() {
    $('input.input-qty').each(function() {
        var $this = $(this),
        qty = $this.parent().find('.is-form'),
        min = Number($this.attr('min')),
        max = Number($this.attr('max'))
        if (min == 0) {
            var d = 0
        } else d = min
        $(qty).on('click', function() {
            if ($(this).hasClass('minus')) {
            if (d > min) d += -1
        } else if ($(this).hasClass('plus')) {
            var x = Number($this.val()) + 1
            if (x <= max) d += 1
        }
        $this.attr('value', d).val(d)
    })
    })  

}