const URL_API = "https://dev.bksoftwarevn.com/";
const ss_lg = localStorage.getItem("token"); //token login

async function ajaxGet(url) {
    let rs = null;
    if (url.includes("?"))
        url = url.concat("&token=" + ss_lg);
    else url = url.concat("?token=" + ss_lg);

    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: checkUrlApi(url) ? URL_API + url : url,
        timeout: 30000,
        cache: false,
        success: function (result) {
            if(result.success === true) {
                rs = result.data;
            }
        }
    });
    return rs;
}

async function ajaxPost(url, data) {
    let rs = null;
    if (url.includes("?"))
        url = url.concat("&token=" + ss_lg);
    else url = url.concat("?token=" + ss_lg);
    await $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: checkUrlApi(url) ? URL_API + url : url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            if(result.success === true) {
                rs = result.data;
            }
        }
    });
    return rs;
}

async function ajaxPut(url, data) {
    let rs = null;
    if (url.includes("?"))
        url = url.concat("&token=" + ss_lg);
    else url = url.concat("?token=" + ss_lg);
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        url: checkUrlApi(url) ? URL_API + url : url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            if(result.success === true) {
                rs = result.data;
            }
        }
    })
    return rs;
}

async function ajaxDelete(url, data) {
    let rs = null;
    if (url.includes("?"))
        url = url.concat("&token=" + ss_lg);
    else url = url.concat("?token=" + ss_lg);
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        url: checkUrlApi(url) ? URL_API + url : url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            if(result.success === true) {
                rs = result.data;
            }
        }
    })
    return rs;
}

async function ajaxUploadFile(url, file) {
    let rs = null;
    await $.ajax({
        type: "POST",
        url: checkUrlApi(url) ? URL_API + url : url,
        data: file,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            rs = result;
        }
    });
    return rs;
}

function checkUrlApi(url) {
    if(url) {
        if(url.indexOf("http") === 0) return false;
        return true;
    }
    return false;
}