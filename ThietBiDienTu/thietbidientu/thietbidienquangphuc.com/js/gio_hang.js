$(document).ready(function () {
    // Exception Home
    $(".nav-category")
        .on("click", function () {
            $(".hero__category").toggleClass("show-cate");
        });
    $(document)
        .on("click", function (e) {
            var container = $(".nav-category");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($("#hero__category").hasClass("show-cate")) {
                    container.trigger("click");
                }
            }
        });
    // Exception Home
    // $("input[type='number']").inputSpinner();
});
