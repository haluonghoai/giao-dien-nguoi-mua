$(document).ready(function () {
  $(".close-popup").click(function () {
    $(".popup-ad").css("display", "none");
  });
  $(window).scroll(function () {
    let bannerHeight = $(".hero").height();
    var aTop = $("header").height() + $("nav").height() + bannerHeight;
    if ($(this).scrollTop() > aTop) {
      $(".catalog").css("padding-top", bannerHeight);
      $(".hero").addClass("fixed");
      $(".nav-category")
          .off("click")
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
    } else {
      $(".catalog").css("padding-top", 0);
      $(".hero").removeClass("fixed");
      $(".hero__category").removeClass("show-cate");
    }
  });
  particlesJS('quote',
      {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
});

function runCarouselConstruction() {
  $('.construction-carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
}

function runPartnerCarousel() {
  $('.partner-carousel').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 576,
        settings: {

          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {

          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {

          slidesToShow: 5
        }
      },
      {
        breakpoint: 1200,
        settings: {

          slidesToShow: 6
        }
      },
    ]
  });
}
