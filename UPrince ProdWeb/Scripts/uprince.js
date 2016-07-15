/*++++++++++++nice scroll++++++++++++*/
//$(document).ready(function() {
//    $("#boxscroll2").niceScroll("#contentscroll2", {cursorcolor: "#d1cccc", cursoropacitymax: 1, boxzoom: false});
//});

/*+++++++++++++main++++++++++++++++*/
$(document).ready(function() {
    $(".launch-modal").click(function() {
        $("#myProjects").removeClass('projects-visibility');
    });
    $("#close-projects").click(function() {
        $("#myProjects").addClass('projects-visibility');
    });
});

/*+++++++++screen-2+++++++++++++++++++*/
$(document).ready(function() {
    $(".launch-modal").click(function() {
        $("#modal-active-today").removeClass('projects-visibility');
    });
    $("#close-today").click(function() {
        $("#modal-active-today").addClass('projects-visibility');
    });
});

/*+++++++++++++++++++Screen-4++++++++++++++++++++++++++++*/

$(document).ready(function() {
    $(".launch-modal").click(function() {
        $("#dailyLog").removeClass('projects-visibility');
    });
    $("#close-dailyLog").click(function() {
        $("#dailyLog").addClass('projects-visibility');
    });
});

/*++++++++++++++++screen-6+++++++++++++++++++++++++*/
$(document).ready(function() {

    $("#launch-product").click(function() {
        $("#project-product").removeClass('projects-visibility');
    });
    $(".close-projects").click(function() {
        $("#project-product").addClass('projects-visibility');
    });

    $("#launch-product-description").click(function() {
        $("#product-container").removeClass('projects-visibility');
    });
    $("#close-product-description").click(function() {
        $("#product-container").addClass('projects-visibility');
    });
});

/*++++++++++++++++screen-10++++++++++++++++++++++++++++++++++++*/
$(document).ready(function() {
    $("#launch-dash").click(function() {
        $("#my-dashboard").removeClass('projects-visibility');
    });
    $("#close-dash").click(function() {
        $("#my-dashboard").addClass('projects-visibility');
    });
});

//$(document).ready(function () {
//    $("#dash-toggle").click(function () {
//        console.log('ttt');
//        $("#toggle-ul").toggleClass('active-dash');
//        $("#popover-content-dash").toggleClass('show-dash');
//        $(".lable-toggle").toggleClass('active-text');
//    });
//});