const URL_BK_CDN = 'https://cdn.bksoftwarevn.com/bk_cdn/api/';

//STREAM_API
function streamGetStream(fileType, fileName) {
    return ajaxGet(`${URL_BK_CDN}v1/public/stream/${fileType}/${fileName}`);
}
//END_STREAM_API

//UPLOAD_API
function uploadGetLink() {
    return ajaxGet(`${URL_BK_CDN}v1/public/get-link`);
}

function uploadPing() {
    return ajaxGet(`${URL_BK_CDN}v1/public/ping`);
}

function uploadFiles(files, companyId) {
    return ajaxUploadFile(`${URL_BK_CDN}v1/public/upload/company/${companyId}`, files);
}
//END_UPLOAD_API