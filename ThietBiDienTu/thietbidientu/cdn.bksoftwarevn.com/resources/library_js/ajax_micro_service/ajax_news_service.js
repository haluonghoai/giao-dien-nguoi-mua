const URL_NEWS_SERIVCE = 'news-service/api/';

//CATEGORY_API
function categoryNewsFindById(id) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/categories/${id}`);
}

function categoryNewsFindByCompany(id) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/categories/company/${id}`);
}
//END_CATEGORY_API

//COMMENT_API
function commentNewsUpload(newsId, data) {
    return ajaxPost(`${URL_NEWS_SERIVCE}v1/public/comments?news-id=${newsId}`, data);
}

function commentNewsFindById(id) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/comments/${id}`);
}

function commentNewsFindByNews(id, page = 1, size = 5) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/comments/news/${id}?page=${page}&size=${size}`);
}
//END_COMMENT_API

//NEWS_API
function newsFindById(id) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/newses/${id}`);
}

function newsFindSimilarNews(id, size = 6) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/newses/${id}/similar-news?size=${size}`);
}

function newsFilter(category = 0, company = 0, type = 0, name = "", tag = "", page = 1, size = 6) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/newses/filter?category=${category}&company=${company}&type=${type}&name=${name}&tag=${tag}&page=${page}&size=${size}`);
}

function newsFilterEvent(category = 0, company = 0, name = "", tag = "", page = 1, size = 6) {
    return ajaxGet(`${URL_NEWS_SERIVCE}v1/public/newses/filter-event?category=${category}&company=${company}&name=${name}&tag=${tag}&page=${page}&size=${size}`);
}

function statisticNewsIncreseView(idNew) {
    return ajaxPut(`${URL_NEWS_SERIVCE}v1/public/statistic/news/${idNew}/view`);
}
//END_NEWS_API
