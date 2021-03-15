const URL_API_MARKETING_SERIVCE = 'marketing-service/api/';

//COMBO_API
function comboFindById(id) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/combos/${id}`);
}

function comboFindByCompany(companyId, page = 1, size = 6) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/combos/company/${companyId}?page=${page}&size=${size}`)
}
//END_COMBO_API

//COUPON_API
function couponFindByCodeAndCompany(code, companyId) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/coupons/${code}/company/${companyId}`);
}

function couponUseCoupon(code, companyId) {
    return ajaxPut(`${URL_API_MARKETING_SERIVCE}v1/public/coupons/${code}/company/${companyId}`);
}

function couponGetGlobalCompany(id) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/coupons/company/${id}`);
}

function couponFindByToken(token) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/coupons/token/${token}`);
}
//END_COUPON_API

//POPUP_API
function popupFindShowedCompany(id) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/popups/company/${id}`);
}
//END_POPUP_API

//PROMO_API
function promotionFindById(id) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/promotions/${id}`);
}

function promotionFindGlobalCompany(id) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/promotions/company/${id}`);
}

function promotionFindByProductId(id) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/promotions/product/${id}`);
}

function promitionFindByListProductId(ids) {
    return ajaxGet(`${URL_API_MARKETING_SERIVCE}v1/public/promotions/products?ids=${ids}`);
}
//END_PROMO_API