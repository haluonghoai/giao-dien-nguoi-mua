const URL_API_PRODUCT_SERIVCE = 'product-service/api/';

//BRAND_API
function brandFindById(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/brands/${id}`);
}

function brandFindByCompany(id, page = 1, size = 20) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/brands/company/${id}?page=${page}&size=${size}`);
}
//END_BRAND_API

//CATEGORY_API
function cateogryProductFindById(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/categorys/${id}`);
}

function categoryProductFindByParent(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/categorys/parent/${id}`);
}

// function categoryProductFindByProductType(id) {
//     return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/categorys/product-type/${id}`);
// }
function categoryProductFindByProductType(id) {
    return ajaxGet(`http://localhost:8080/Doan_Thietbidien_war/api/v1/category/find-all`);
}
//END_CATEGORY_API

//COMMENT_API
function commentProductFindById(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/comments/${id}`);
}

function commentProductFindByProduct(id, page = 1, size = 5) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/comments/product/${id}?page=${page}&size=${size}`);
}

function commentProductUpload(id, comment) {
    return ajaxPost(`${URL_API_PRODUCT_SERIVCE}v1/public/comments/product/${id}`, comment);
}
//END_COMMENT_API

//FILE_API
function fileProductFindById(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/files/${id}`);
}

function fileProductFindByProduct(id, type) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/files/product/${id}?type=${type}`);
}
//END_FILE_API

//PRODUCT_API
function productFindByIds(ids) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products?ids=${ids}`);
}

function productFindById(id, cost, property, file, category, promotion, statistic) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/${id}?cost=${cost}&property=${property}&file=${file}&category=${category}&promotion=${promotion}&statistic=${statistic}`);
}

function productFindByProperty(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/${id}/properties`);
}

function productFindByCategory(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/category/${id}`);
}

function productFindCourses(productTypeId, category = 0, text = "", online = true, page = 1, size = 50) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/courses?product-type=${productTypeId}&category=${category}&text=${text}&online=${online}&page=${page}&size=${size}`);
}

function productFilter(companyId = 1, productType = 1, categories = null, brand = 0, text = "", status = 0, sortType = "date", asc = true, page = 1, size = 15) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/filter?company-id=${companyId}&product-type-id=${productType}${categories ? `&categories=${categories}` : ""}&brand-id=${brand}&text=${text}&status=${status}&sort-type=${sortType}&asc=${asc}&page=${page}&size=${size}`);
}

function productFindByIdsAndProperties(ids) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/ids/more?ids=${ids}`);
}

function productFindService(productType, category= 0, text = "", page = 1, size = 6) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/products/services?product-type=${productType}&category=${category}&text=${text}&page=${page}&size=${size}`);
}
//END_PRODUCT_API

//PRODUCT_TYPE_API
function productTypeFindById(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/product-types/${id}`);
}

function productTypeFindByCompany(id, view) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/product-types/company/${id}${view ? `?view=${view}`: ""}`);
}
//END_PRODUCT_TYPE_API

//PROPERTY_API
function propertyProductFindById(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/properties/${id}`);
}

function propertyProductFindByProductType(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/properties/product-type/${id}`);
}
//END_PROPERTY_API

//STATISTIC_API
function statisticProductIncreseView(id) {
    return ajaxPost(`${URL_API_PRODUCT_SERIVCE}v1/public/statistic/increase-view/product/${id}`);
}

function statisticProduct(id) {
    return ajaxGet(`${URL_API_PRODUCT_SERIVCE}v1/public/statistic/product/${id}`);
}
//END_STATISTIC_API