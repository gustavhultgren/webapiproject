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

//http://data.riksdagen.se/personlista/?iid=&fnamn=Johan&enamn=&utformat=json

/*  $(document).ready(function () {
    $(".create-post").click(function () {
        $(".show-form").fadeToggle("fast", "linear");
    });
    $(".thread-img").hover(function () {
        time = setTimeout(() => {
            $(this).parent(".column").find(".stats").toggle();
        }, 600);
    }, hideToolTip);
});

function hideToolTip() {
    clearTimeout(time);
    $(".stats").fadeOut().hide();
}

$(document).ready(function () {
    $(".column-thread > img").mouseover(function () {
        $(this).addClass("resize-zoom");
    })
    $("img").mouseout(function () {
        $(this).removeClass("resize-zoom");
    });
});  */

//function show_post_creation() {
//    $(".show-form").css({"display": "inline-grid", "align-self": "center"});
//}

//84 words