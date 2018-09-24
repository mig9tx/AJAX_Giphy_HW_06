$(document).ready(function () {
    $(document).on("click", '.myGifs', function (event) {
        event.preventDefault();
        var thing = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=9eYxjIxpJY0AYEPAItWXZnXl50byaqGu&limit=12";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#gifs").empty();
            $("#data-name").text(JSON.stringify(response));
            var results = response.data;
            console.log(response.data)
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifImage = $("<img>Rating: "+ results[i].rating + "</img>");
                    // var p = $("<p>");
                    // p.text("Rating: " + results[i].rating);
                    gifImage.attr("src", results[i].images.fixed_height_still.url); //sets the source to the img element
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url); //saves the data-still url as a value to the img element
                    gifImage.attr("data-animate", results[i].images.fixed_height.url); //saves the data-animate url as a value to the img element
                    gifImage.attr("data-state", "still"); //sets the data-state value as still to the img element
                    gifImage.addClass("gif"); //add the class gif for on.click identification
                    $("#gifs").prepend(gifImage);
                    console.log(results[i].rating);
                }
            }
        })
        return false;
    });

    var gifs = ['Houston Astros', 'Pizza','Legend of Zelda: Breath of the Wild', 'Ford Raptor', 'Super Nintendo Games', 'The Avengers', 'Spider-Man PS4', 'Funny Cat', 'Great White Shark', 'Ford Shelby']
    createButtons();

    function createButtons() {
        $("#buttons").empty(); //empties the div
        gifs.forEach(function (val, i) { //for loop obtaining values of each object in array
            console.log(val);
        });
        for (var i = 0; i < gifs.length; i++) { //for the length of the array
            var b = $("<button>");
            b.addClass("myGifs")
                .attr("data-name", gifs[i])
                .text(gifs[i]);
            $("#buttons").append(b); //adds a button with the class attributes and name to the html
        }
    }

    $("#add-gif").on("click", function (event) { //adds user input button and values.
        event.preventDefault();
        var input = $("#submit-input").val().trim();
        gifs.push(input);
        createButtons();
        $("#submit-input").val('');

    });

    $(document).on("click", ".gif", function (event) {
        console.log("this works");
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});