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

        // toggle extra table on button click
        $('button.toggle_ext').on('click', function() {
            var ext_table = $(this).prev();
            ext_table.is(":visible") ? $(this).html('Show extra data') : $(this).html('Hide extra data');
            $(this).prev().toggle();
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
        let dataFlags;
        
        // obtain each hitbox set of the move
        for(let j = 0; j < move.data.length; j++) {
            let hitboxSets = [];
            let movePart = move.data[j];

            dataFlags = {
                "is_normal": movePart.data.is_normal,           // if move is a normal or special
                "is_smash": movePart.data.is_smash,             // if move is a smash attack
                "is_aerial": movePart.data.is_aerial,           // if move is an aerial
                "is_projectile": movePart.data.is_projectile,   // if move is a projectile
                "is_throw": movePart.data.is_throw,             // if move is a throw
                "is_lock": movePart.data.is_lock,               // if move is a jablock
                "has_fkb": false,                               // if move has FKB
                "has_fa": false,                                // if move has documented frame advantage
                "has_ac": movePart.data.autocancel_start,       // if move has autocancel windows
                "has_fall": movePart.data.has_fall,             // if move transitions to special fall
                "split_faf": false,                             // if move has parts with different FAF
                "split_ac": false,                              // if move has parts with different autocancels
                "split_ll": false,                              // if move has parts with different landing lag
            };

            // copy persisting info data
            if (j < move.data.length - 1) {
                AddPersistDataFields(movePart, move.data[j + 1], dataFlags);
            }

            // construct move header info
            parseInfoHeaderData(divs[i], movePart, dataFlags);

            // obtain individual hitbox data
            for(let x = 0; x < movePart.data.hitboxes.length; x++) {
                let hitbox = movePart.data.hitboxes[x];
                
                // set certain data flags
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
            
            constructTableHeaders(header_data, ext_header_data, dataFlags, (movePart.data.faf > 0 || movePart.data.landing_lag > 0));
            insertRowFromData(table_head, header_data, true, false, 1 + !dataFlags.is_throw);
            insertRowFromData(ext_table_head, ext_header_data);

            // construct hitbox set
            hitboxSets.forEach( hitbox => {
                let row_data = [];
                let ext_row_data = [];

                // populate tables
                populateHitboxSet(row_data, ext_row_data, hitbox, dataFlags);
                if(!dataFlags.is_throw && !dataFlags.is_lock && (movePart.data.faf > 0 || movePart.data.landing_lag > 0)) {
                    calculateShieldSafety(row_data, hitbox, movePart.data.hitbox_start, movePart.data.faf, dataFlags, movePart.data.landing_lag);
                }
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

            // display any non-persisting footer data
            if (j < move.data.length - 1) {
                parseInfoPartialFooterData(divs[i], movePart, dataFlags);
            }
        }

        // construct move footer info
        parseInfoFooterData(divs[i], move.data[move.data.length - 1], dataFlags);
        divs[i].appendChild(document.createElement('br'));
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

// copies over persisting info data
function AddPersistDataFields(movePart, moveNext, dataFlags) {
    if (!moveNext.data.hitbox_start && movePart.data.hitbox_start) {
        moveNext.data["hitbox_start"] = movePart.data.hitbox_start;
    }
    if (!moveNext.data.hitbox_end && movePart.data.hitbox_end) {
        moveNext.data["hitbox_end"] = movePart.data.hitbox_end;
    }

    if (!moveNext.data.faf && movePart.data.faf) {
        moveNext.data["faf"] = movePart.data.faf;
        dataFlags.has_faf = true;
    }
    else if (moveNext.data.faf != movePart.data.faf) {
        dataFlags.split_faf = true;
    }

    if (!moveNext.data.autocancel_start && movePart.data.autocancel_start) {
        moveNext.data["autocancel_start"] = movePart.data.autocancel_start;
        dataFlags.has_ac = true;
    }
    else if (moveNext.data.autocancel_start != movePart.data.autocancel_start) {
        dataFlags.split_ac = true;
    }
    if (!moveNext.data.autocancel_end && movePart.data.autocancel_end) {
        moveNext.data["autocancel_end"] = movePart.data.autocancel_end;
        dataFlags.has_ac = true;
    }
    else if (moveNext.data.autocancel_end != movePart.data.autocancel_end) {
        dataFlags.split_ac = true;
    }

    if (!moveNext.data.landing_lag && movePart.data.landing_lag) {
        moveNext.data["landing_lag"] = movePart.data.landing_lag;
    }
    else if (moveNext.data.landing_lag != movePart.data.landing_lag) {
        dataFlags.split_ll = true;
    }
}

function parseInfoHeaderData(div, movePart) {
    if (movePart.movepart_name) {
        let name = document.createElement('p');
        name.textContent = movePart.movepart_name;
        name.style.fontSize = "18px";
        div.appendChild(name);
    }

    if (movePart.data.hitbox_start) {
        let hitbox_duration = document.createElement('p');
        hitbox_duration.textContent = parseFrameWindow(movePart.data.hitbox_start, movePart.data.hitbox_end, "Hitbox Duration");
        hitbox_duration.style.fontSize = "16px";
        div.appendChild(hitbox_duration);
    }
}

// populate info section with overview data
function parseInfoFooterData(div, movePart, dataFlags) {
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

// for use with split movepart data
function parseInfoPartialFooterData(div, movePart, dataFlags) {
    if (dataFlags.split_faf && movePart.data.faf) {
        let faf = document.createElement('p');
        faf.textContent = "FAF: " + movePart.data.faf;
        faf.style.fontSize = "16px";
        div.appendChild(faf);
    }

    if (dataFlags.split_ac && dataFlags.has_ac) {
        let autocancel = document.createElement('p');
        autocancel.textContent = parseFrameWindow(movePart.data.autocancel_start, movePart.data.autocancel_end, "Autocancel");
        autocancel.style.fontSize = "16px";
        div.appendChild(autocancel);
    }

    if (dataFlags.split_ll && movePart.data.landing_lag) {
        let landing_lag = document.createElement('p');
        landing_lag.textContent = "Landing Lag: " + movePart.data.landing_lag + "F";
        landing_lag.style.fontSize = "16px";
        div.appendChild(landing_lag);
    }

    div.appendChild(document.createElement('br'));
}

// detects durations as single or multiple and formats to a combined ordered string
function parseFrameWindow(start, end = false, headerString) {
    if (end && start != end) {
        if (start.length && end.length) {   // multiple durations
            let str = headerString + ": F";
            for(let i = 0; i < start.length; i++) {
                if (end[i]) {
                    if (start[i] != end[i]) {   // duration of more than one frame
                        str += start[i] + "-" + end[i];
                    }
                    else {  // duration of one frame
                        str += start[i];
                    }
                    if (i < start.length - 1) { // if not final duration
                        str += "/F";
                    }
                }
                else {  // open autocancel
                    str += start[i] + "+";
                }
            }
            return str;
        }
        else {  // single duration of more than one frame
            return headerString + ": F" + start + "-" + end;
        }
    }
    else {  // single duration of one frame
        return headerString + ": F" + start;
    }
}

function constructTableHeaders(header_data, ext_header_data, dataFlags, has_faf = false) {
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
    header_data.push("Damage", "Angle");
    if (!dataFlags.has_fkb) {
        header_data.push("BKB");
    }
    else {
        header_data.push("FKB");
    }
    header_data.push("KBG", "Hitbox Size");
    if(!dataFlags.is_throw && !dataFlags.is_lock && has_faf) {
        header_data.push("On Shield");
    }

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
        row_data.push(hitbox.id.toString());
    }
    row_data.push(
        hitbox.damage + ((/^\d+\.\d+$/).test(hitbox.damage) ? '%' : '.0%'),
        hitbox.angle.toString(),
    );
    if (!dataFlags.has_fkb) {
        row_data.push(hitbox.bkb ? hitbox.bkb.toString() : 0);
    }
    else {
        row_data.push(hitbox.fkb ? hitbox.fkb.toString() : 0);
    }
    row_data.push(
        hitbox.kbg ? hitbox.kbg.toString() : 0,
        hitbox.hitbox_size + ((/^\d+\.\d+$/).test(hitbox.hitbox_size) ? 'u' : '.0u'),
    );

    ext_row_data.push(
        hitbox.hitlag_mul ? hitbox.hitlag_mul + ((/^\d+\.\d+$/).test(hitbox.hitlag_mul) ? 'x' : '.0x') : "1.0x",
        hitbox.sdi_mul ? hitbox.sdi_mul + ((/^\d+\.\d+$/).test(hitbox.sdi_mul) ? 'x' : '.0x') : "1.0x",
        hitbox.shieldstun_mul ? hitbox.shieldstun_mul + ((/^\d+\.\d+$/).test(hitbox.shieldstun_mul) ? 'x' : '.0x') : "1.0x",
        hitbox.shield_damage ? hitbox.shield_damage.toString() : 0,
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
function calculateShieldSafety(row_data, hitbox, start_frame, faf = null, dataFlags, landing_lag = null) {
    let shieldstun = calculateShieldStun(hitbox, dataFlags);
    let start = start_frame.length ? start_frame[0] : start_frame;
    let shieldstun_offset = hitbox.shieldstun_mul == 1.0 ? 1.0 : 0.0;

    if (!dataFlags.has_fall) {
        let safety;
        if (landing_lag > 0) {
            safety = (landing_lag * -1.0) + shieldstun;
        }
        else {
            safety = start - faf + shieldstun + shieldstun_offset;
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