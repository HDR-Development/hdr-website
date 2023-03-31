$(document).ready(function() {
    //console.log("h");
    $('input').on('click', function() {
        //console.log($(this).attr('id'));
        $(this).next('table').toggle();
    });
});

// import the JSON file
var importFile = function(fileName) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        //console.log('h');
        const charJSON = JSON.parse(this.responseText);
        //console.log(charJSON);
        parseCharData(charJSON);
    };
    xmlhttp.open("GET", fileName);
    xmlhttp.send();
}

// parses all data for the character page
function parseCharData(data) {
    //console.log(data);
    //console.log(data.moveset);

    // obtain each move
    for(let i = 0; i < data.moveset.length; i++)
    {
        var move = data.moveset[i];
        //console.log(move.data.length);

        // obtain each hitbox set of the move
        for(let j = 0; j < move.data.length; j++)
        {
            var movePart = move.data[j];
            //console.log(movePart.data);

            // obtain individual hitbox data
            for(let x = 0; x < movePart.data.hitboxes.length; x++)
            {
                var hitbox = movePart.data.hitboxes[x];
                console.log(hitbox);
            }
        }
    }
}