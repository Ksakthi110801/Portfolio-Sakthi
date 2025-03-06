$(document).ready(function () {
    $(window).on("scroll", function () {
        let navbar = $(".navbar");

        if ($(window).scrollTop() > 100) {
            navbar.addClass("island");
        } else {
            navbar.removeClass("island");
        }
    });

    let sections = $("section");
    let navLinks = $(".navbar-nav .nav-link");

    function setActiveNavLink() {
        let scrollPos = $(window).scrollTop();

        sections.each(function () {
            let sectionTop = $(this).offset().top - 100;
            let sectionHeight = $(this).outerHeight();
            let sectionId = $(this).attr("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.removeClass("active");
                $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass("active");
            }
        });
    }

    $(window).on("scroll", setActiveNavLink);
    setActiveNavLink();

    //mouse trailing starts
    let coords = { x: 0, y: 0 };
    let circles = $(".circle");

    circles.each(function () {
        $(this).data("x", 0);
        $(this).data("y", 0);
    });

    function updateMousePosition(e) {
        coords.x = e.clientX;
        coords.y = e.clientY + $(window).scrollTop();
    }

    function updateOnScroll() {
        coords.y = coords.y + ($(window).scrollTop() - lastScrollY);
        lastScrollY = $(window).scrollTop();
    }

    let lastScrollY = $(window).scrollTop();

    $(window).on("mousemove", updateMousePosition);
    $(window).on("scroll", updateOnScroll);

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.each(function (index) {
            let $circle = $(this);
            $circle.css({
                left: x - 8 + "px",
                top: y - 8 + "px",
                transform: `scale(${(circles.length - index) / circles.length})`,
            });

            $circle.data("x", x);
            $circle.data("y", y);

            let nextCircle = circles.eq(index + 1).length ? circles.eq(index + 1) : circles.eq(0);
            x += (nextCircle.data("x") - x) * 0.5;
            y += (nextCircle.data("y") - y) * 0.5;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
    //mouse trailing ends
});





const navSlider = new Swiper(".nav-slider", {
    spaceBetween: 10,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: { crossFade: true },
    watchSlidesProgress: true,
    fade: true,
});


const mainSlider = new Swiper(".main-slider", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 800,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    thumbs: {
        swiper: navSlider,
    },
});


