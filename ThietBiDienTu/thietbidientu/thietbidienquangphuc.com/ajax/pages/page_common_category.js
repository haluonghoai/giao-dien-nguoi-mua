$(function () {
    let url = new URL(location.href);

    // let idCongTrinh = url.searchParams.get(id);


    function detectTinTuc() {
        return url.pathname.includes('tin-tuc') || localStorage.getItem('isTinTuc') === 'true';
    }

    setTimeout(function () {
        if (detectTinTuc()) {
            let isChiTiet = localStorage.getItem('isChiTiet') === 'true';
            $('.tinTuc__danhMuc').addClass('d-none');
            $('.tinTuc__spnb').removeClass('mt-5');
            if (isChiTiet) {
                $('.tinTuc__btnShowMoreNews').hide();
            }
            $('.tinTuc__bvgd--title h3').text('Được xem nhiều');

            NewestArticle.mappingNewestArticle(true);
        } else {

            let isChiTiet = localStorage.getItem('isChiTiet') === 'true';
            if (isChiTiet) {
                $('.tinTuc__danhMuc').removeClass('d-none');
                $('.tinTuc__spnb').addClass('mt-5');
                $('.tinTuc__btnShowMoreNews').hide();
                DuToan.mappingDuToan(idCongTrinh);
            } else {
                $('.tinTuc__danhMuc').addClass('d-none');
                $('.tinTuc__spnb').removeClass('mt-5');

                // DanhMuc.generateListDanhMucAndMapping();
            }
            $('.tinTuc__bvgd--title h3').text('công trình mới nhất');
            NewestArticle.mappingNewestArticle(false);
        }
        OutStandingProduct.generateListOutstandingProductAndMapping();

    }, 10);


});
// ===Danh muc===
let DuToan = {

    generateListDuToan: function (object) {
        let templateDanhMuc = $("#hiddenElementDm").clone();
        templateDanhMuc.removeAttr("id").removeClass("d-none");
        templateDanhMuc.find('.tinTuc__danhMuc--firstLevelLi div').prepend(textToIconFile(FileUtil.getFileName(object.url)));
        templateDanhMuc.find("a.tinTuc__danhMuc--link")
            .text(FileUtil.getFileNameWithoutExtension(object.url).nameFile)
            .attr('href', FileUtil.getLinkFile(object.url));
        return templateDanhMuc;
    },
    mappingDuToan: function (id) {
        FetchingNewsData.getListFile(id).then((listData) => {
                if (listData.length > 0) {
                    listData.forEach((el) => $("#listDm").append(this.generateListDuToan(el)));
                } else {
                    $("#listDm").html(`<li class="tinTuc__danhMuc--firstLevelLi text-uppercase"><span style="font-size: 14px; color: var(--text-black-1);">không có Dữ liệu</span></li>`);
                };
            }
        );
    }
};
// ===end Danh muc===

//===Outstanding product===
let OutStandingProduct = {
    getListOutstandingProduct: async function () {
        let listProduct;
        listProduct = await Promise.resolve(
            productFilter(COMPANY_ID, 0, null, 0, "", 0, "sold", false, 1, 6)
        ).then((rs) => rs.content);
        return listProduct;
    },
    generateOutstandingProduct: function (object) {
        let promotions = object.promotions;
        let templateProduct = $("#hidden-product").clone().removeClass("d-none").removeAttr("id");
        templateProduct.find("div.tinTuc__spnb--productName").text(object.name);
        templateProduct.find("span.tinTuc__spnb--imgProduct img").attr({
            src: viewSrcFile(object.image),
        });
        if (object.cost !== 0) {
            templateProduct.find('.tinTuc__spnb--link').attr('href', viewAliasProduct(object.alias, object.id));
            //handlePrice
            if (promotions.length === 0) {
                templateProduct
                    .find("span.tinTuc__spnb--oldPrice").addClass('d-none');

                templateProduct
                    .find("span.tinTuc__spnb--newPrice")
                    .html(`${MoneyUtils.viewPriceVND(object.cost)}`);

            } else {
                let handledPromotion = viewPromotionCostProduct(promotions, object.cost);
                if (handledPromotion.minusPrice === 0) {
                    templateProduct
                        .find("span.tinTuc__spnb--oldPrice").addClass('d-none');
                } else {
                    templateProduct
                        .find("span.tinTuc__spnb--oldPrice").removeClass('d-none')
                        .html(`<del>${MoneyUtils.viewPriceVND(object.cost)}</del>`);
                }
                templateProduct
                    .find("span.tinTuc__spnb--newPrice")
                    .html(`${MoneyUtils.viewPriceVND(object.cost - handledPromotion.minusPrice)}`);
            }
        }else{
            templateProduct.find('.tinTuc__spnb--link').attr('href', 'lien-he');
            templateProduct
                .find("span.tinTuc__spnb--oldPrice").addClass('d-none');
            templateProduct
                .find("span.tinTuc__spnb--newPrice")
                .html(`Liên hệ trực tiếp`);
        }



        //end handle price
        return templateProduct;
    },
    generateListOutstandingProductAndMapping: function () {
        this.getListOutstandingProduct().then((listData) => {
            listData.forEach((el) =>
                $("#list-product").append(this.generateOutstandingProduct(el))
            )
        });
    }
};


//===end Outstanding product===

// ===bai viet gan day===
let NewestArticle = {
    getListNewestArticle: async function (type, category) {
        let listNewestArticle;
        listNewestArticle = await Promise.resolve(
            newsFilter(category, COMPANY_ID, type, "", "", 1, 6)
        )
            .then((rs) => rs.content)
            .catch((err) => console.log(err));
        return listNewestArticle;
    },
    generateNewestArticle: function (object, isTinTuc) {
        let templateNewestArticle = $("#hidden-bvgd")
            .clone()
            .removeClass("d-none")
            .removeAttr("id");
        templateNewestArticle.find('.tinTuc__bvgd--link').attr('href', `chi-tiet-${isTinTuc ? 'tin-tuc?id=' + object.id : 'cong-trinh?id=' + object.id}`);
        templateNewestArticle
            .find("span.tinTuc__bvgd--imgProduct img")
            .attr("src", viewSrcFile(object.image));
        templateNewestArticle
            .find("div.tinTuc__bvgd--date")
            .text(TimeUtils.formatTime(object.creatTime).d);
        templateNewestArticle
            .find("div.tinTuc__bvgd--month")
            .text(TimeUtils.formatTime(object.creatTime).m);
        templateNewestArticle
            .find("div.tinTuc__bvgd--productName")
            .text(object.name);
        templateNewestArticle
            .find("div.tinTuc__bvgd--commentCount")
            .text(`${NumberUtils.formatLargeNumber(object.view)} lượt xem`);
        return templateNewestArticle;
    },

    mappingNewestArticle: function (isTinTuc = true) {
        function mapping(typeArticle, category) {
            NewestArticle.getListNewestArticle(typeArticle, category)
                .then((rs) => {
                    rs.forEach((data) =>
                        $("#list-bvgd").append(NewestArticle.generateNewestArticle(data, isTinTuc))
                    );
                })
                .catch((err) => console.log(err));
        }

        if (isTinTuc) {
            mapping(TIN_TUC_TYPE, 11);
        } else {
            mapping(CONG_TRINH_TYPE, 10);
        }

    },
};
// ===bai viet gan day===


let FetchingNewsData = {
    newsFrefix: 'news-service/api/',
    getListFile: async function (id) {
        let listFileName;
        let url = `${this.newsFrefix}v1/public/attachments/news/${id}`;
        await Promise.resolve(ajaxGet(url))
            .then(rs => {
                listFileName = rs.map(rs1 => {
                    return {
                        id: rs1.id,
                        url: rs1.url,
                        name: rs1.name
                    }
                });
            });
        return listFileName;

    }
}