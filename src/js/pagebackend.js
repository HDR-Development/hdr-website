$(document).ready(function() {
    //console.log($(this).prev('.charTable'));
    $('input').on('click', function() {
        //console.log($(this).attr('id'));
        $(this).prev('div').toggle();
    });
});

// import the JSON file
var importFile = function(fileName) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        //console.log('h');
        const charJSON = JSON.parse(this.responseText);
        //console.log(charJSON);
        filterByMove(charJSON);
    };
    xmlhttp.open("GET", fileName);
    xmlhttp.send();
}

// construct a table and populate it from the JSON based on table id
function filterByMove(data) {
    //const tables = $('.charTable table');
    //console.log("tables: " + tables[0].getAttribute('id'));

    const divs = $('.charTable');
    //console.log(divs[1]);

    for(let i = 0; i < divs.length; i++)
    {
        //const tables = [];
        //tables.push(divs[0].childNodes[1], divs[1].childNodes[1]);
        //console.log(tables);

        var id = divs[i].getAttribute('id');
        //console.log(id);

        var filter;

        // filter by id to find and construct the table
        switch(id) {
            case "forward_air":
                //console.log('construct fair table');
                filter = "forward_air";
                break;
            case "back_air":
                //console.log('construct bair table');
                filter = "back_air";
                break;
            default:
                //console.log('move id not found');
                filter = "none";
                break;
        }

        // search for move name and construct table
        if (filter && filter != "none") {
            for(let j = 0; j < data.moveset.length; j++)
            {
                var index = data.moveset[j];
                if (index && index.name == filter)
                {
                    //console.log('found ' + filter + ' at index ' + j);
                    //let h = divs[i].childNodes[1];
                    //console.log(h.getElementsByTagName('tbody')[0]);
                    
                    constructMoveTable(divs[i].childNodes[1].getElementsByTagName('tbody')[0], divs[i].childNodes[3].getElementsByTagName('tbody')[0], index);
                }
            }
        }
    }
}

// parses all data for the character page
function constructMoveTable(table, ext_table, move) {
    //console.log(table);
    //console.log(ext_table);
    //console.log(move);

    // obtain each hitbox set of the move
    for(let j = 0; j < move.data.length; j++)
    {
        var result = [];
        var movePart = move.data[j];
        //console.log(movePart.data);

        // obtain individual hitbox data
        for(let x = 0; x < movePart.data.hitboxes.length; x++)
        {
            var hitbox = movePart.data.hitboxes[x];
            //console.log(hitbox.damage);
            result.push(hitbox);
        }

        // populate table
        result.forEach( data => {
            // populate main table
            let row = table.insertRow();
            let id = row.insertCell(0);
            id.innerHTML = data.id;
            let damage = row.insertCell(1);
            damage.innerHTML = data.damage;
            let angle = row.insertCell(2);
            angle.innerHTML = data.angle;

            // populate extra table
            let ext_row = ext_table.insertRow();
            let bkb = ext_row.insertCell(0);
            bkb.innerHTML = data.BKB;
            let kbg = ext_row.insertCell(1);
            kbg.innerHTML = data.KBG;
            let hitbox_size = ext_row.insertCell(2);
            hitbox_size.innerHTML = data.hitbox_size;
        });
    }
}

// format data such as adding units or missing decimals for whole numbers
function formatFields() {

}