$(document).ready(function() {
    // toggle extra table on button click
    $('button').on('click', function() {
        var ext_table = $(this).parent().children().eq($(this).attr('id'));
        ext_table.is(":visible") ? $(this).html('Show extra data') : $(this).html('Hide extra data');
        $(ext_table).toggle();
    });
});

// import the JSON file
var importFile = function(fileName) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const charJSON = JSON.parse(this.responseText);
        constructMoveTables(charJSON);

        // hide ext tables on page load
        $("table[id|='ext_data']").each(function() {
            $(this).toggle();
        });
    };
    xmlhttp.open("GET", fileName);
    xmlhttp.send();
}

// construct a table and populate it from the JSON
function constructMoveTables(charJSON) {
    let page_end = document.getElementById("dataEnd");

    for(let i = 0; i < charJSON.moveset.length; i++) {//{< divs.length; i++) {
        let div = document.createElement('div');
        div.className = "charTable";
        let move = charJSON.moveset[i];
        
        // obtain each hitbox set of the move
        for(let j = 0; j < move.data.length; j++) {
            let hitboxSets = [];
            let movePart = move.data[j];

            let dataFlags = {
                "is_grab": movePart.data.is_grab,   // if move is a grab
                "has_fkb": false,                   // if move has FKB
                "has_rehit": false,                 // if move has rehit rate
                "include_fa": false,                // if move has documented frame advantage
            };

            // construct move info
            parseInfoData(div, movePart);

            // obtain individual hitbox data
            for(let x = 0; x < movePart.data.hitboxes.length; x++) {
                let hitbox = movePart.data.hitboxes[x];
                
                // check if certain data is present
                dataFlags.has_fkb = (hitbox.FKB && hitbox.FKB != 0) ? true : dataFlags.has_fkb;
                dataFlags.has_rehit = (hitbox.rehit_rate && hitbox.rehit_rate != 0) ? true : dataFlags.has_rehit;

                hitboxSets.push(hitbox);
            }

            // iterate through moveparts and construct table and ext_table for each hitbox set
            let table = document.createElement('table');
            let table_head = document.createElement('thead');
            let table_body = document.createElement('tbody');
            let ext_table = document.createElement('table');
            let ext_table_head = document.createElement('thead');
            let ext_table_body = document.createElement('tbody');
            ext_table.id = "ext_data";  // used for toggle script
            
            // construct table header
            let header_data = [
                // Hitbox ID,
                "Damage",
                "Angle",
                "BKB",
                // FKB
                "KBG",
            ];

            // add additional fields according to data flags
            if (!dataFlags.is_grab) {
                header_data.splice(0, 0, "Hitbox ID");
            }
            if (dataFlags.has_fkb) {
                header_data.splice(3 + !dataFlags.is_grab, 0, "FKB");
            }
            insertRowFromData(table_head, header_data);

            // construct ext_table header
            let ext_header_data = [
                "BKB",
                "KBG",
                "Hitbox Size",
            ];
            insertRowFromData(ext_table_head, ext_header_data);
            
            // populate hitbox set
            hitboxSets.forEach( hitbox => {
                let row_data = [
                    //hitbox.id,
                    hitbox.damage + ((/^\d+\.\d$/).test(hitbox.damage) ? '%' : '.0%'),
                    hitbox.angle,
                    hitbox.BKB,
                    // hitbox.FKB
                    hitbox.KBG,
                ];

                let ext_row_data = [
                    hitbox.BKB,
                    hitbox.KBG,
                    hitbox.hitbox_size + ((/^\d+\.\d$/).test(hitbox.damage) ? 'u' : '.0u'),
                ];

                // add additional fields according to data flags
                if (!dataFlags.is_grab) {
                    row_data.splice(0, 0, hitbox.id);
                }
                if (dataFlags.has_fkb) {
                    row_data.splice(3 + !dataFlags.is_grab, 0, hitbox.FKB ? hitbox.FKB : "-");
                }
                console.log(row_data);

                // populate main table
                insertRowFromData(table_body, row_data);

                // populate extra table
                insertRowFromData(ext_table_body, ext_row_data);

                // append table and ext_table to div
                table.appendChild(table_head);
                table.appendChild(table_body);
                ext_table.appendChild(ext_table_head);
                ext_table.appendChild(ext_table_body);
                div.appendChild(table);
                div.appendChild(ext_table);
            });

            // add buttons and spacing
            let button = document.createElement('button');
            button.type = "button";
            button.textContent = "Show extra data";
            button.id = (8 * j) + 4;    // offset id for toggle script
            div.appendChild(button);
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createElement('br'));
        }

        // append complete move to document and update current page end
        page_end.parentNode.insertBefore(div, page_end.nextSibling);
        page_end = page_end.nextSibling;
    }
}

// populate table header/row with a collection of data
function insertRowFromData(table, data, debug = false) {
    let row = table.insertRow();
    data.forEach( h => {
        let cell = row.insertCell(data.indexOf(h));
        cell.innerHTML = h;
    });
}

// populate info section with overview data
function parseInfoData(div, movePart) {
    let hitbox_duration = document.createElement('p');

    hitbox_duration.textContent = "Hitbox Duration: F" + movePart.data.hitbox_start + " - F" + movePart.data.hitbox_end;
    hitbox_duration.style.textAlign = "center";
    hitbox_duration.style.fontSize = "16px";

    div.appendChild(hitbox_duration);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
}