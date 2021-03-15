$(document).ready(function () {
    // $('.banner').slick({
    //     dots: true,
    //     infinite: true,
    // });
    $(".bars-open").click(function () { 
        $("nav .nav").addClass("open");
        $("nav .shadow").addClass("open");
    });
    $(".fa-times").click(function () { 
        $("nav .nav").removeClass("open");
        $("nav .shadow").removeClass("open");
    });
    $(".search-icon .search-click").on("click", function(){
        $(".search-icon").toggleClass("show")
    })
    $(document).on("click", function(e){
        var container = $(".search-icon");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            if($(".search-icon").hasClass("show")){
                $(".search-icon").removeClass("show")
            };
        }
    })
});