$(document).ready(function() {
    // toggle extra table on button click
    $('button.toggle_ext').on('click', function() {
        var ext_table = $(this).prev();
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
            if (angle > 361) {
                arrow[0].childNodes[0].data = "*";
            }
            else {
                if (angle == 361) {
                    arrow[0].childNodes[0].data = "*->";
                    angle = 44;
                }

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
                "is_normal": move.is_normal,                    // if move is a normal or special
                "is_smash": move.is_smash,                      // if move is a smash attack
                "is_aerial": move.is_aerial,                    // if move is an aerial
                "is_projectile": movePart.data.is_projectile,   // if move is a projectile
                "is_throw": movePart.data.is_throw,             // if move is a throw
                "has_fkb": false,                               // if move has FKB
                "has_fa": false,                                // if move has documented frame advantage
                "has_ac": movePart.data.has_ac,                 // if move has autocancel windows
                "has_fall": movePart.data.has_fall,             // if move transitions to special fall
            };

            // construct move info
            parseInfoData(divs[i], movePart, dataFlags);

            // obtain individual hitbox data
            for(let x = 0; x < movePart.data.hitboxes.length; x++) {
                let hitbox = movePart.data.hitboxes[x];
                
                // check if certain data is present
                dataFlags.has_fkb = (hitbox.fkb && hitbox.fkb != 0) ? true : dataFlags.has_fkb;
                dataFlags.has_fa = (null != hitbox.fa_0 && null != hitbox.fa_100) ? true : dataFlags.has_fa;

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
            
            // construct and populate table headers
            let header_data = [];
            let ext_header_data = [];
            
            constructTableHeaders(header_data, ext_header_data, dataFlags);
            insertRowFromData(table_head, header_data, true, false, 1 + !dataFlags.is_throw);
            insertRowFromData(ext_table_head, ext_header_data);

            // construct hitbox set
            hitboxSets.forEach( hitbox => {
                let row_data = [];
                let ext_row_data = [];

                // populate tables
                populateHitboxSet(row_data, ext_row_data, hitbox, dataFlags);
                calculateShieldSafety(row_data, hitbox, movePart.data.hitbox_start, movePart.data.faf, dataFlags, movePart.data.landing_lag);
                insertRowFromData(table_body, row_data, false, true, header_data.indexOf("Angle"));
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
    if (movePart.movepart_name) {
        let name = document.createElement('p');
        name.textContent = movePart.movepart_name;
        name.style.fontSize = "18px";
        div.appendChild(name);
    }

    if (movePart.data.hitbox_start && movePart.data.hitbox_end) {
        let hitbox_duration = document.createElement('p');
        hitbox_duration.textContent = parseFrameWindow(movePart.data.hitbox_start, movePart.data.hitbox_end, "Hitbox Duration");
        hitbox_duration.style.fontSize = "16px";
        div.appendChild(hitbox_duration);
    }

    if (movePart.data.faf) {
        let faf = document.createElement('p');
        faf.textContent = "FAF: " + movePart.data.faf;
        faf.style.fontSize = "16px";
        div.appendChild(faf);
    }

    if (dataFlags.has_ac) {
        let autocancel = document.createElement('p');
        autocancel.textContent = parseFrameWindow(movePart.data.autocancel_start, movePart.data.autocancel_end, "Autocancel");
        autocancel.style.fontSize = "16px";
        div.appendChild(autocancel);
    }

    if (movePart.data.landing_lag) {
        let landing_lag = document.createElement('p');
        landing_lag.textContent = "Landing Lag: " + movePart.data.landing_lag + "F";
        landing_lag.style.fontSize = "16px";
        div.appendChild(landing_lag);
    }
}

// detects fields as single or multiple and formats to a combined ordered string
function parseFrameWindow(start, end, headerString) {
    if (start.length && end.length) {
        let str = headerString + ": F";
        for(let i = 0; i < start.length; i++) {
            str += start[i] + "-" + end[i];
            if (i < start.length - 1) {
                str += "/F";
            }
        }
        return str;
    }
    else {
        return headerString + ": F" + start + "-" + end;
    }
}

function constructTableHeaders(header_data, ext_header_data, dataFlags) {
    /*
    *   <Table Header>
    *   [Hitbox ID]
    *   Damage
    *   Angle
    *   BKB
    *   [FKB]
    *   KBG
    *   Hitbox Size
    *   Shield Safety
    */

    if (!dataFlags.is_throw) {
        header_data.push("Hitbox ID");
    }
    header_data.push("Damage", "Angle", "BKB");
    if (dataFlags.has_fkb) {
        header_data.push("FKB");
    }
    header_data.push("KBG", "Hitbox Size", "On Shield");

    /*
    *   <Ext Table Header>
    *   Hitlag Multiplier
    *   SDI Multiplier
    *   Shieldstun Multiplier
    *   Shield Damage
    *   Additional Hitstun
    *   [Frame Advantage]
    */

    ext_header_data.push(
        "Hitlag Multiplier",
        "SDI Multiplier",
        "Shieldstun Multiplier",
        "Shield Damage",
        "Additional Hitstun");
    if (dataFlags.has_fa) {
        ext_header_data.push("Frame Advantage (0/100%)");
    }
}

function populateHitboxSet(row_data, ext_row_data, hitbox, dataFlags) {
    if(!dataFlags.is_throw) {
        row_data.push(hitbox.id);
    }
    row_data.push(
        hitbox.damage + ((/^\d+\.\d$/).test(hitbox.damage) ? '%' : '.0%'),
        hitbox.angle,
        hitbox.bkb ? hitbox.bkb : 0,
    );
    if (dataFlags.has_fkb) {
        row_data.push(hitbox.fkb ? hitbox.fkb : 0);
    }
    row_data.push(
        hitbox.kbg ? hitbox.kbg : 0,
        hitbox.hitbox_size + ((/^\d+\.\d$/).test(hitbox.hitbox_size) ? 'u' : '.0u'),
    );
    

    ext_row_data.push(
        hitbox.hitlag_mul ? hitbox.hitlag_mul + ((/^\d+\.\d$/).test(hitbox.hitlag_mul) ? 'x' : '.0x') : "1.0x",
        hitbox.sdi_mul ? hitbox.sdi_mul + ((/^\d+\.\d$/).test(hitbox.sdi_mul) ? 'x' : '.0x') : "1.0x",
        hitbox.shieldstun_mul ? hitbox.shieldstun_mul + ((/^\d+\.\d$/).test(hitbox.shieldstun_mul) ? 'x' : '.0x') : "1.0x",
        hitbox.shield_damage ? hitbox.shield_damage : 0,
        hitbox.add_hitstun ? hitbox.add_hitstun + "F" : "0F",
    );
    if (dataFlags.has_fa) {
        (null != hitbox.fa_0 && null != hitbox.fa_100) ? 
            ext_row_data.push((hitbox.fa_0 >= 0 ? "+" : "") + hitbox.fa_0 
            + "/" + (hitbox.fa_100 >= 0 ? "+" : "") + hitbox.fa_100 + "F")
        : ext_row_data.push("-");
    }
    //console.log(row_data);
    //console.log(ext_row_data);
}

// use internal shieldstun formula to manually calculate shield safety
function calculateShieldSafety(row_data, hitbox, start_frame, faf, dataFlags, landing_lag = null) {
    let shieldstun = calculateShieldStun(hitbox, dataFlags);
    let start = start_frame.length ? start_frame[0] : start_frame;

    if (!dataFlags.has_fall) {
        let safety;
        if (landing_lag > 0) {
            safety = landing_lag + shieldstun;
        }
        else {
            safety = start - faf + shieldstun + 1.0;
        }
        row_data.push((safety >= 0 ? "+" : "") + safety + "F");
    }
    else {
        row_data.push("-");
    }
}

function calculateShieldStun(hitbox, dataFlags) {
    let mul_const = 0.55;
    let shieldstun_mul = hitbox.shieldstun_mul ? hitbox.shieldstun_mul : 1.0;
    let calc_mul;

    if (dataFlags.is_smash || dataFlags.is_normal) {
        calc_mul = 1.0;
    }
    else if (dataFlags.is_aerial) {
        calc_mul = 1.0;
    }
    else if (dataFlags.is_projectile) {
        calc_mul = 0.5156;
    }
    
    return Math.floor((hitbox.damage * mul_const * calc_mul * shieldstun_mul)) + 2.0;
}