$(document).ready(function () {
    search()
    checkbox_filter()
    var $listPeople = $("#list-people");
    $.ajax({
        type: "GET",
        url: "http://data.riksdagen.se/personlista/?utformat=json",
        dataType: "json",
        success: function (data) {
            $.each(data, (i, item) => {
                const data = item.person;
                for (i = 0; i < data.length; i++) {
                    $("h2").html("Antalet personer i riksdagen: " + data.length);
                    $listPeople.append(
                        "<li id=person_" + data[i].intressent_id + " class=" + data[i].parti + ">" +
                        "<div id=content>" + data[i].tilltalsnamn + " " + data[i].efternamn + " - Parti: " + data[i].parti + "</div>" +
                        "<img src=" + data[i].bild_url_80 + ">" + "</li>")
                }
            });
            console.log("Site loaded successfully", data)
        },
        error: function (error) {
            console.log("Something went wrong", error);
        }
    });
    function search() {
        $("#search").on("keyup", function () {
            var searchTerm = $(this).val().toLowerCase();
            $("li").each(function () {
                var string = $(this).text().toLowerCase();
                if (string.indexOf(searchTerm) === -1) {
                    $(this).fadeOut();
                }
                else {
                    $(this).fadeIn();
                }
            })
        })
    }
    function checkbox_filter() {
        var $select = $(".filter :checkbox").click(function () {
            if ($select.is(':checked')) {
                $("li").hide();
                $(".filter :checkbox:checked").each(function () {
                    $("." + $(this).val()).fadeIn();
                });
            }
            else{
                $("li").fadeIn();
            }
    });
    }
});