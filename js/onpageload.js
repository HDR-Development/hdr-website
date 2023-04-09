$(document).ready(function() {
    // toggle extra table on button click
    $('button.toggle_ext').on('click', function() {
        var ext_table = $(this).prev();
        ext_table.is(":visible") ? $(this).html('Show extra data') : $(this).html('Hide extra data');
        $(this).prev().toggle();
    });
});