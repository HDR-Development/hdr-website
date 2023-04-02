$(document).ready(function() {
    // toggle extra table on button click
    $('button.toggle_ext').on('click', function() {
        var ext_table = $(this).prev()//$(this).parent().children().eq($(this).attr('id'));
        ext_table.is(":visible") ? $(this).html('Show extra data') : $(this).html('Hide extra data');
        $(this).prev().toggle();
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

        // rotate angles
        $("td.angle_img").each(function() {
            let arrow = $(this);
            let value = $(this).next();
            let angle = value[0].childNodes[0].data;
            if (angle > 360) {
                arrow[0].childNodes[0].data = "*";
            }
            else {
                angle *= -1;
                arrow.css({'-webkit-transform': 'rotate(' + angle + 'deg)',
                '-moz-transform': 'rotate(' + angle + 'deg)',
                '-ms-transform': 'rotate(' + angle + 'deg)',
                '-o-transform': 'rotate(' + angle + 'deg)',
                'transform': 'rotate(' + angle + 'deg)'});
            }
            
        });
    };
    xmlhttp.open("GET", fileName);
    xmlhttp.send();
}

// construct a table and populate it from the JSON
function constructMoveTables(charJSON) {
    let divs = $('.charTable');

    for(let i = 0; i < divs.length; i++) {
        let move = charJSON.moveset[i];
        
        // obtain each hitbox set of the move
        for(let j = 0; j < move.data.length; j++) {
            let hitboxSets = [];
            let movePart = move.data[j];

            let dataFlags = {
                "is_grab": movePart.data.is_grab,           // if move is a grab
                "has_fkb": false,                           // if move has FKB
                "has_fa": false,                            // if move has documented frame advantage
                "has_ac": movePart.data.has_ac,             // if move has autocancel windows
                "has_early_ac":                             // if move has an early autocancel window
                    movePart.data.autocancel_early_start
                    && movePart.data.autocancel_early_end,
            };

            // construct move info
            parseInfoData(divs[i], movePart, dataFlags);

            // obtain individual hitbox data
            for(let x = 0; x < movePart.data.hitboxes.length; x++) {
                let hitbox = movePart.data.hitboxes[x];
                
                // check if certain data is present
                dataFlags.has_fkb = (hitbox.fkb && hitbox.fkb != 0) ? true : dataFlags.has_fkb;
                dataFlags.has_fa = (hitbox.frame_advantage_0 && hitbox.frame_advantage_100) ? true : dataFlags.has_fa;

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
                "Hitbox Size",
            ];

            // add additional fields according to data flags
            if (!dataFlags.is_grab) {
                header_data.splice(0, 0, "Hitbox ID");
            }
            if (dataFlags.has_fkb) {
                header_data.splice(3 + !dataFlags.is_grab, 0, "FKB");
            }
            insertRowFromData(table_head, header_data, true, false, 1 + !dataFlags.is_grab);

            // construct ext_table header
            let ext_header_data = [
                "Hitlag Multiplier",
                "SDI Multiplier",
                "Shieldstun Multiplier",
                "Shield Damage",
                "Additional Hitstun",
                // Frame Advantage
            ];
            if (dataFlags.has_fa) {
                header_data.splice(5, 0, "Frame Advantage (0/100%)");
            }
            insertRowFromData(ext_table_head, ext_header_data);
            
            // populate hitbox set
            hitboxSets.forEach( hitbox => {
                let row_data = [
                    //hitbox.id,
                    hitbox.damage + ((/^\d+\.\d$/).test(hitbox.damage) ? '%' : '.0%'),
                    hitbox.angle,
                    hitbox.bkb,
                    // hitbox.fkb
                    hitbox.kbg,
                    hitbox.hitbox_size + ((/^\d+\.\d$/).test(hitbox.hitbox_size) ? 'u' : '.0u'),
                ];

                let ext_row_data = [
                    hitbox.hitlag_mul ? hitbox.hitlag_mul + ((/^\d+\.\d$/).test(hitbox.damage) ? 'x' : '.0x') : "1.0x",
                    hitbox.sdi_mul ? hitbox.sdi_mul + ((/^\d+\.\d$/).test(hitbox.damage) ? 'x' : '.0x') : "1.0x",
                    hitbox.shieldstun_mul ? hitbox.shieldstun_mul + ((/^\d+\.\d$/).test(hitbox.damage) ? 'x' : '.0x') : "1.0x",
                    hitbox.shield_damage ? hitbox.shield_damage : "0",
                    hitbox.add_hitstun ? hitbox.add_hitstun + "F" : "0F",
                    // hitbox.frame_advantage
                ];

                // add additional fields according to data flags
                if (!dataFlags.is_grab) {
                    row_data.splice(0, 0, hitbox.id);
                }
                if (dataFlags.has_fkb) {
                    row_data.splice(3 + !dataFlags.is_grab, 0, hitbox.fkb ? hitbox.fkb : "-");
                }
                if (dataFlags.has_fa) {
                    ext_row_data.splice(5, 0, hitbox.frame_advantage_0 ?
                        hitbox.frame_advantage_0 + "/" + hitbox.frame_advantage_100 + "F" : "-");
                }
                //console.log(row_data);
                //console.log(ext_row_data);

                // populate main table
                insertRowFromData(table_body, row_data, false, true, header_data.indexOf("Angle"));

                // populate extra table
                insertRowFromData(ext_table_body, ext_row_data);

                // append table and ext_table to div
                table.appendChild(table_head);
                table.appendChild(table_body);
                ext_table.appendChild(ext_table_head);
                ext_table.appendChild(ext_table_body);
                divs[i].appendChild(table);
                divs[i].appendChild(ext_table);
            });

            // add buttons and spacing
            let button = document.createElement('button');
            button.type = "button";
            button.className = "toggle_ext";
            button.textContent = "Show extra data";
            divs[i].appendChild(button);
            divs[i].appendChild(document.createElement('br'));
            divs[i].appendChild(document.createElement('br'));
        }
    }
}

// populate table header/row with a collection of data
function insertRowFromData(table, data, span_row = false, insert_arrow = false, index = null) {
    let row = table.insertRow();
    let offset = 0;
    data.forEach( h => {
        let cell = row.insertCell(data.indexOf(h) + offset);

        // span angle header
        if (span_row && row.cells.length == index + 1) {
            cell.colSpan = 2;
        }

        // insert angle arrow cell
        if (insert_arrow && row.cells.length == index + 1) {
            cell.className = "angle_img";
            cell.innerHTML = "-->";
            cell = row.insertCell(data.indexOf(h) + 1);
            cell.className = "angle_val"
            offset += 1;
        }

        cell.innerHTML = h;
    });
}

// populate info section with overview data
function parseInfoData(div, movePart, dataFlags) {
    if (movePart.name) {
        let name = document.createElement('p');
        name.textContent = movePart.name;
        name.style.fontSize = "16px";
        div.appendChild(name);
    }

    if (movePart.data.hitbox_start && movePart.data.hitbox_end) {
        let hitbox_duration = document.createElement('p');
        hitbox_duration.textContent = "Hitbox Duration: F" + movePart.data.hitbox_start + "-" + movePart.data.hitbox_end;
        //hitbox_duration.style.textAlign = "center";
        hitbox_duration.style.fontSize = "16px";
        div.appendChild(hitbox_duration);
    }

    if (movePart.data.faf) {
        let faf = document.createElement('p');
        faf.textContent = "FAF: " + movePart.data.faf;
        //faf.style.textAlign = "center";
        faf.style.fontSize = "16px";
        div.appendChild(faf);
    }

    if (dataFlags.has_ac) {
        let autocancel = document.createElement('p');
        autocancel.textContent = "Autocancel: F"
            + dataFlags.has_early_ac ? movePart.data.autocancel_early_start : movePart.data.autocancel_start + "-"
            + dataFlags.has_early_ac ? movePart.data.autocancel_early_end : movePart.data.autocancel_end
            + dataFlags.has_early_ac ? "/F" + movePart.data.autocancel_late_start + "-" + movePart.data.autocancel_early_end : "";
        //autocancel.style.textAlign = "center";
        autocancel.style.fontSize = "16px";
        div.appendChild(autocancel);
    }

    if (movePart.data.landing_lag) {
        let landing_lag = document.createElement('p');
        landing_lag.textContent = "Landing Lag: " + movePart.data.landing_lag + "F";
        //landing_lag.style.textAlign = "center";
        landing_lag.style.fontSize = "16px";
        div.appendChild(landing_lag);
    }

    //div.appendChild(document.createElement('br'));
}