(function() {
    var nextUrl;
    $("#go").on("click", function(e) {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                q: $("input").val(),
                type: $("select").val()
            },

            success: function(data) {
                data = data.artists || data.albums;

                var noresults =
                    "https://pngimage.net/wp-content/uploads/2018/06/image-not-available-png-8.png";

                if (data.items.length == 0) {
                    $("h2").html("No results found");
                }
                // console.log(data.items);
                var resultsHtml = "";
                // console.log(data.items);
                for (var i = 0; i < data.items.length; i++) {
                    var img;
                    var name = data.items[i].name;
                    // console.log(data.items[i].external_urls.spotify);
                    // console.log(data.items[i].name );
                    // console.log(data.items[i].images[0]);
                    if (data.items[i].images[0]) {
                        img = data.items[i].images[0].url;
                        // console.log("img: ", img);
                    } else {
                        img = "default.png";
                    }

                    resultsHtml += '<div class = "result">';
                    resultsHtml +=
                          "<a href='" +
                          data.items[i].external_urls.spotify +
                          "'>" +
                          "<img src ='" +
                          img +
                          "'>" +
                          "</a>";
                    resultsHtml +=
                          "<a href=" +
                          data.items[i].external_urls.spotify +
                          ">" +
                          name +
                          "</a>";
                    resultsHtml += "</div>";

             }

                $("#artist_result").html($("input").val());
                $(".results").html(resultsHtml);

                //function addButton() calls function loadMoreResults(), and so on. Each functio keeps calling each other
                function addButton(data) {
                    if (data.next) {
                        $(".results").append(
                            '<button id="moreButton">See More!</button>'
                        );
                        $("#moreButton").on("click", function() {
                            $("#moreButton").remove();
                            var nextUrl = data.next.replace(
                                "api.spotify.com/v1/search",
                                "elegant-croissant.glitch.me/spotify"
                            );
                            loadMoreResults(nextUrl);
                        });
                    }
                }
                addButton(data);

                function loadMoreResults(nextUrl) {
                    $.ajax({
                        url: nextUrl,
                        success: function(data) {
                            data = data.artists || data.albums;
                            var resultsHtml = "";
                            for (var i = 0; i < data.items.length; i++) {
                                var img;
                                var name = data.items[i].name;
                                // console.log(data.items[i].external_urls.spotify);
                                // console.log(data.items[i].name );
                                // console.log(data.items[i].images[0]);
                                if (data.items[i].images[0]) {
                                    img = data.items[i].images[0].url;
                                    // console.log("img: ", img);
                                } else {
                                    img = "default.png";
                                }

                                resultsHtml += '<div class = "result">';
                                resultsHtml +=
                                      "<a href='" +
                                      data.items[i].external_urls.spotify +
                                      "'>" +
                                      "<img src ='" +
                                      img +
                                      "'>" +
                                      "</a>";
                                resultsHtml +=
                                      "<a href=" +
                                      data.items[i].external_urls.spotify +
                                      ">" +
                                      name +
                                      "</a>";
                                resultsHtml += "</div>";

                        }

                    $(".results").append(resultsHtml);


                    addButton(data);
                        }
                    });
                }
            }
        });
    });
})();
