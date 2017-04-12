var gifStrings = ['Ohio', 'Texas', 'California'];
var giphies = [];
addButtons(gifStrings);

function addButtons(arr) {
    $('#buttons-target').html('');
    arr.forEach(function(s) {
        var b = $('<button/>');
        b.addClass('giphy-topic');
        b.text(s);
        $('#buttons-target').append(b);
    });
    $('.giphy-topic').on('click', function(e) {

        var text = this.innerText.split(' ').join('+');

        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search?q='+text+'&limit=10&api_key=dc6zaTOxFJmzC',
            method: 'GET',
            success: function(response) {
                console.log(response);
                giphies = [];
                response.data.forEach(function(gif) {
                    giphies.push({
                        show: 'still',
                        still: gif.images.fixed_width_still.url,
                        gif: gif.images.fixed_width.url,
                        rating: gif.rating
                    })
                });
                loadImages();
            }
        })
    });
}

function loadImages() {
    $('#giphy-target').html('');
    giphies.forEach(function(src, i) {
        var imgToAdd = $('<img>');
        var container = $('<div>');
        var rating = $('<p>');
        rating.text(src.rating);
        container.addClass('img-container');
        imgToAdd.addClass('giphy-image');
        imgToAdd.attr('id', i);
        imgToAdd.attr('src', src.still);
        container.append(imgToAdd);
        rating.prepend("Rating: ");
        container.append(rating);
        $('#giphy-target').append(container);
    });

    $('.giphy-image').on('click', function(e) {
        e.preventDefault();
        var id = $(e.target).attr('id');
        if (giphies[id].show == 'still') {
            $(e.target).attr('src', giphies[id].gif);
            giphies[id].show = 'gif';
        } else {
            $(e.target).attr('src', giphies[id].still);
            giphies[id].show = 'still';
        }
        
    });
}

$('#form').submit(function(e) {
    e.preventDefault();
    gifStrings.push($('#newUni').val().trim());
    addButtons(gifStrings);
    $('#newUni').val('');
})




