$(document).ready(function () {
    $("#modal_trigger").click(function () {
        if ($("#modal_trigger").attr("href") == "#") {
            $("#header_user_trigger").click();
        }
    });

    $("#change_password_trigger").click(function () {
        $("#headeruser").hide();
    })
});
$(document).mouseup(function (e) {
    var container = $("#headeruser");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});

