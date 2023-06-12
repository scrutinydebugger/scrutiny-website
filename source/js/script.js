;(function ($) {
    "use strict"

    $(window).on("scroll", function () {
        var scrollToTop = $(".scroll-top-to"),
            scroll = $(window).scrollTop()
        if (scroll >= 200) {
            scrollToTop.fadeIn(200)
        } else {
            scrollToTop.fadeOut(100)
        }
    })

    // scroll-to-top
    $(".scroll-top-to").on("click", function () {
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            500
        )
        return false
    })

    // scroll
    $(".scrollTo").on("click", function (e) {
        e.preventDefault()
        var target = $(this).attr("href")
        $("html, body").animate(
            {
                scrollTop: $(target).offset().top,
            },
            500
        )
    })

    $(document).ready(function () {
        // navbarDropdown
        if ($(window).width() < 992) {
            $(".main-nav .dropdown-toggle").on("click", function () {
                $(this).siblings(".dropdown-menu").animate(
                    {
                        height: "toggle",
                    },
                    300
                )
            })
        }
    })

    hljs.configure({ cssSelector: "code" })
    hljs.highlightAll()
})(jQuery)
