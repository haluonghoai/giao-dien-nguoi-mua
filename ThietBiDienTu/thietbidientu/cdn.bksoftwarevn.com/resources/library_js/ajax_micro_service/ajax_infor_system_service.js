const URL_API_INFOR_SYSTEM_SERIVCE = 'infor-system-service/api/';

//APPOINTMENT_API
function appointmentUpload(appointment, branchId) {
    return ajaxPost(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/appointment/branch/${branchId}`, appointment)
}
//END_APPOINTMENT_API

//BANK_API
function bankFindByCompany(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/banks/company/${id}`);
}
//END_BANK_API

//BRANCH_API
function brachFindByCompany(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/branches/company/${id}`);
}
//END_BRANCH_API

//COMPANY_API
function companyFindById(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/companies/${id}`);
}
//END_COMPANY_API

//CONFIG_SITEMAP_API
function configSitemapFindAll() {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/config-site-maps`);
}

function configSitemapFindByCompany(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/config-site-maps/company/${id}`);
}

function configSitemapFilter(urlDirectory = "", companyId = 0, status = -1) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/config-site-maps/filter?url_directory=${urlDirectory}&company_id=${companyId}&status=${status}`);
}
//END_CONFIG_SITEMAP_API

//CONTACT_API
function contactUpload(contact) {
    return ajaxPost(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/contact`, contact);
}
//END_CONTACT_API

//CONTENT_API
function contentFindByCompany(id, code) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/contents/company/${id}?code=${code}`);
}
//END_CONTENT_API

//DANH_MUC_ALIAS_API
function danhMucAliasfindAll() {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/danh-muc-alias`);
}

function danhMucAliasFindById(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/danh-muc-alias/${id}`);
}

function danhMucAliasFindByCompany(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/danh-muc-alias/company/${id}`);
}
//END_DANH_MUC_ALIAS_API

//HISTORY_CHANGE_SITE_MAP_API
function historyChangeSitemapFindByCompany(id, page = 1, size = 10) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/history-change-site-maps/company/${id}?page=${page}&size=${size}`);
}
//END_HISTORY_CHANGE_SITE_MAP_API

//INFO_API
function infoFindByCompany(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/infos/company/${id}`);
}
//END_INFO_API

//TAN_SUAT_THAY_DOI_ALIAS_API
function tanSuatThayDoiAliasFindAll() {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/tan-suat-thay-doi-alias`);
}

function tanSuatThayDoiAliasFindById(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/tan-suat-thay-doi-alias/${id}`)
}
//END_TAN_SUAT_THAY_DOI_ALIAS_API

//URL_ALIAS_API
function urlAliasFindById(id) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/url-alias/${id}`);
}

function urlAliasFindByAliasAndCompany(alias, companyId) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/url-alias/alias/${alias}/company-id/${companyId}`)
} 

function urlAliasCheckExist(alias = "", companyId = 0) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/url-alias/check-exist?alias=${alias}&company-id=${companyId}`);
}

function urlAliasFindByDanhMuc(danhMucId) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/url-alias/danh-muc/${danhMucId}`);
}

function urlAliasFilter(alias = "", url = "", companyId = 0, page = 1, size = 10) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/url-alias/filter?alias=${alias}&url=${url}&company-id=${companyId}&page=${page}&size=${size}`);
}
//END_URL_ALIAS_API

//CUSTOMER_API
function customerFindByCompany(companyId) {
    return ajaxGet(`${URL_API_INFOR_SYSTEM_SERIVCE}v1/public/customers/company/${companyId}`);
}
//END_CUSTOMER_API