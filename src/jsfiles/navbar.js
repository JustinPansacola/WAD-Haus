$(document).ready(function ($) { //wait for the document to load
    $('#content').css({
        'margin-top': $('.navbar').outerHeight() + 0 + 'px' //adjust the css rule for margin-top to equal the element height - 10px and add the measurement unit "px" for valid CSS
    });
});

$(window).resize(function () {
    //$("#log").append("<div>Handler for .resize() called.</div>");
    $('#content').css({
        'margin-top': $('.navbar').outerHeight() + 0 + 'px' //adjust the css rule for margin-top to equal the element height - 10px and add the measurement unit "px" for valid CSS
    });
});

// $("#menu-btn").click(function () {
//     $('#content').css({
//         'margin-top': $('.navbar').outerHeight() + 0 + 'px' //adjust the css rule for margin-top to equal the element height - 10px and add the measurement unit "px" for valid CSS
//     });
// });

var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");

menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav");
    // container.classList.toggle("active-cont");
});


$(document).mousedown(function (e) {
    if (!$(e.target).closest('#sidebar').length && !$(e.target).closest('.navbar').length) {
        sidebar.classList.remove("active-nav");
    }
});

var selection_height = $('#selection').outerHeight()
        // console.log(selection_height)

$(window).on("scroll", function () {

    var x_scroll = window.scrollY

    if (x_scroll > selection_height) {
        $('#map').css({
            'height': $(window).height() - $('.navbar').outerHeight() + "px"
        });

    } else {
        $('#map').css({
            'height': $(window).height() - $('#selection').outerHeight() - $('.navbar').outerHeight() - 10 + "px"
        });
    }
})
