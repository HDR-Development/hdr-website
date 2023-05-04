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

    for (let i = 0; i < divs.length; i++) {
        let move = charJSON.moveset[i];
        let dataFlags;
        let move_ext_collection = [];
        
        // obtain each hitbox set of the move
        for (let j = 0; j < move.data.length; j++) {
            let hitboxSets = [];
            let movePart = move.data[j];

            dataFlags = {
                "is_normal": movePart.data.is_normal,           // if move is a normal or special
                "is_smash": movePart.data.is_smash,             // if move is a smash attack
                "is_aerial": movePart.data.is_aerial,           // if move is an aerial
                "is_projectile": movePart.data.is_projectile,   // if move is a projectile
                "is_grab": movePart.data.is_grab,               // if move is a command grab
                "is_throw": movePart.data.is_throw,             // if move is a throw
                "is_lock": movePart.data.is_lock,               // if move is a jablock
                "has_fall": movePart.data.has_fall,             // if move transitions to special fall
                "open_end": movePart.data.open_end,             // if move has arbitrary hitbox duration
                "has_fkb": false,                               // if move has FKB
                "has_fa": false,                                // if move has documented frame advantage
                "has_ac": movePart.data.autocancel_start,       // if move has autocancel windows
                "has_shieldstun_mul": false,                    // if move has a shieldstun multiplier
                "has_shield_damage": false,                     // if move has a hitbox with additional shield damage
                "has_add_hitstun": false,                       // if move has a hitbox with additional hitstun
                "has_ga": false,                                // if move has a hitbox that hits ground-only or air-only
                "hide_faf": movePart.data.hide_faf,             // if move should hide faf display (very rare)
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
            for (let x = 0; x < movePart.data.hitboxes.length; x++) {
                let hitbox = movePart.data.hitboxes[x];
                
                // set certain data flags
                dataFlags.has_fkb = (hitbox.fkb && hitbox.fkb != 0) ? true : dataFlags.has_fkb;
                dataFlags.has_fa = (null != hitbox.fa_0 && null != hitbox.fa_100) ? true : dataFlags.has_fa;
                dataFlags.has_shieldstun_mul = (hitbox.shieldstun_mul && hitbox.shieldstun_mul != 1.0) ? true : dataFlags.has_shieldstun_mul;
                dataFlags.has_shield_damage = (hitbox.shield_damage && hitbox.shield_damage != 0) ? true : dataFlags.has_shield_damage;
                dataFlags.has_add_hitstun = (hitbox.add_hitstun && hitbox.add_hitstun != 0) ? true : dataFlags.has_add_hitstun;
                dataFlags.has_ga = (hitbox.ground_air && hitbox.ground_air != "") ? true : dataFlags.has_ga;
                
                if (hitbox.id.length) {
                    unwrapHitboxArray(hitboxSets, hitbox);
                }
                else {
                    hitboxSets.push(hitbox);
                }
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
            let prev_ext_data = [];
            let distinct_ids_applied = false;
            let flag_id_groups = 0;
            let ext_row_data_collection = {
                "rows": [],
                "ids": [],
            };

            constructTableHeaders(header_data, ext_header_data, dataFlags, (movePart.data.faf > 0 || movePart.data.landing_lag > 0));
            insertRowFromData(table_head, header_data, false, true, false, dataFlags.is_grab, header_data.indexOf("Angle"));
            insertRowFromData(ext_table_head, ext_header_data);

            // construct hitbox set
            hitboxSets.forEach( hitbox => {
                let row_data = [];
                let ext_row_data = [];

                // populate tables
                populateHitboxSet(row_data, ext_row_data, hitbox, movePart, dataFlags);
                insertRowFromData(table_body, row_data, false, false, true, false, header_data.indexOf("Angle"));
                ext_row_data_collection.rows.push(ext_row_data);
                ext_row_data_collection.ids.push(hitbox.id);

                // simplify ext_data
                if (prev_ext_data.length == 0 || distinctExtData(prev_ext_data, ext_row_data)) {
                    // add hitbox ids to ext_data
                    if (!distinct_ids_applied && flag_id_groups == 1) {
                        let cell = ext_table_head.childNodes[0].insertCell(0);
                        cell.innerHTML = "Hitbox ID";
                        distinct_ids_applied = true;
                    }

                    insertRowFromData(ext_table_body, ext_row_data, true);
                    prev_ext_data.push(ext_row_data);
                    flag_id_groups++;
                }

                // append table and ext_table to div
                table.appendChild(table_head);
                table.appendChild(table_body);
                ext_table.appendChild(ext_table_head);
                ext_table.appendChild(ext_table_body);
                divs[i].appendChild(table);
                divs[i].appendChild(ext_table);
            });

            move_ext_collection.push(ext_row_data_collection);

            if (ext_table_body.childNodes[0].cells.length > 0) {
                // add buttons and spacing
                let button = document.createElement('button');
                button.type = "button";
                button.className = "toggle_ext";
                button.textContent = "Show extra data";
                divs[i].appendChild(button);
                divs[i].appendChild(document.createElement('br'));
            }

            // display any non-persisting footer data
            if (j < move.data.length - 1) {
                parseInfoPartialFooterData(divs[i], movePart, dataFlags);
            }
        }

        insertExtIDGroups(divs[i], move_ext_collection);

        // construct move footer info
        parseInfoFooterData(divs[i], move.data[move.data.length - 1], dataFlags);
        divs[i].appendChild(document.createElement('br'));
    }
}

// populate table header/row with a collection of data
function insertRowFromData(table, data, is_ext_data = false, span_row = false, insert_arrow = false, is_grab = false, arrow_index = null) {
    let row = table.insertRow();
    let offset = 0;
    data.forEach( h => {
        let cell = row.insertCell(offset);

        if (!is_grab) {
            // span angle header
            if (span_row && row.cells.length == arrow_index + 1) {
                cell.colSpan = 2;
            }

            // insert angle arrow cell
            if (insert_arrow && row.cells.length == arrow_index + 1) {
                cell.className = "angle_img";
                cell.innerHTML = h == "various" ? "*" : "-->";
                offset++;
                cell = row.insertCell(offset);
                cell.className = "angle_val"
            }
        }

        if (is_ext_data) {
            cell.className = "ext_row_data";
        }

        cell.innerHTML = h;
        offset++;
    });
}

// combine identical sets of ext_data
function distinctExtData(prev_ext_data, ext_row_data) {
    let duplicates = Array(prev_ext_data.length).fill(false);
    let duplicate_index = -1;
    
    for (let i = 0; i < prev_ext_data.length; i++) {
        let distinct = false;
        prev_ext_data[i].forEach( prev => {
            if (prev != ext_row_data[prev_ext_data[i].indexOf(prev)]) {
                distinct = true;
            }
        });
        
        if (!distinct) {
            duplicates[i] = true;
            duplicate_index = i;
        }
    }

    // if ext does not match with *any* prev, return distinct
    if (!duplicates.some(x => x == true)) {
        return true;
    }
    else {
        // add hitbox id to collection of duplicate ids
        return false;
    }
}

// insert hitbox IDs for each grouping of ext_data
function insertExtIDGroups(div, move_ext_collection) {
    let ext_divs = $(div).children('#ext_data');

    // iterate through ext_data for each movePart and push each index of stored index collection
    for (let i = 0; i < ext_divs.length; i++) {
        // only run if more than one distinct ext_data is present
        if (ext_divs[i].childNodes[1].childNodes.length > 1) {
            let id_groups = [];

            for (let j = 0; j < ext_divs.length; j++) {
                let ext_table_rows = ext_divs[j].childNodes[1].childNodes;

                // compare ext data to each index of ext_table_body
                for (let h = 0; h < ext_table_rows.length; h++) {
                    let hitbox_ids = [];
                    let compiled_row = [];
                    let index = 0;

                    //let test = $(ext_table_rows[h]).find('.ext_row_data');

                    for (let x = 0; x < ext_table_rows[h].cells.length; x++) {
                        compiled_row.push(ext_table_rows[h].cells[x].textContent);
                    }

                    move_ext_collection[j].rows.forEach( hitbox => {
                        // add to corresponding group index if matching
                        if (JSON.stringify(hitbox) == JSON.stringify(compiled_row)) {
                            hitbox_ids.push(move_ext_collection[j].ids[index]);
                        }

                        index++;
                    });

                    id_groups.push(hitbox_ids);
                }
            }

            // add hitbox ids to ext_data groupings
            for (let j = 0; j < ext_divs[i].childNodes[1].childNodes.length; j++) {
                let cell = ext_divs[i].childNodes[1].childNodes[j].insertCell(0);
                let str = "";

                id_groups[j].forEach( id => {
                    str += id + "/";
                });

                str = str.slice(0, -1);
                cell.innerHTML = str;
            }
        }
    }
}

// copies over persisting info data
function AddPersistDataFields(movePart, moveNext, dataFlags) {
    if (!moveNext.data.hitbox_start && movePart.data.hitbox_start) {
        moveNext.data["hitbox_start"] = movePart.data.hitbox_start;
        moveNext.data["hitbox_end"] = movePart.data.hitbox_end;
    }

    if (!moveNext.data.faf && movePart.data.faf) {
        moveNext.data["faf"] = movePart.data.faf;
        dataFlags.has_faf = true;
    }
    else if (moveNext.data.faf != movePart.data.faf) {
        dataFlags.split_faf = true;
    }

    if (!moveNext.data.faf_2nd && movePart.data.faf_2nd) {
        moveNext.data["faf_2nd"] = movePart.data.faf_2nd;
        moveNext.data["faf_str"] = movePart.data.faf_str;
    }
    else if (moveNext.data.faf_2nd != movePart.data.faf_2nd) {
        dataFlags.split_faf = true;
    }

    if (!moveNext.data.hide_faf && movePart.data.hide_faf) {
        moveNext.data["hide_faf"] = movePart.data.hide_faf;
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

// construct sets of hitboxes from a single hitbox with an array of ids
function unwrapHitboxArray(hitboxSets, arrayHitbox) {
    let fields = [
        "id",
        "damage",
        "angle",
        "bkb",
        "fkb",
        "kbg",
        "hitlag_mul",
        "sdi_mul",
        "shieldstun_mul",
        "shield_damage",
        "add_hitstun",
        "hitbox_size",
        "ground_air",
        "no_reverse"
    ];

    for (let y = 0; y < arrayHitbox.id.length; y++) {
        let hitbox = JSON.parse(JSON.stringify(arrayHitbox));
        hitbox.id = arrayHitbox.id[y];

        fields.forEach( prop => {
            if (arrayHitbox[prop] && arrayHitbox[prop].length) {
                hitbox[prop] = arrayHitbox[prop][y];
            }
        });

        hitboxSets.push(hitbox);
    }
}

function parseInfoHeaderData(div, movePart, dataFlags) {
    if (movePart.movepart_name) {
        let name = document.createElement('p');
        name.textContent = movePart.movepart_name;
        name.style.fontSize = "20px";
        div.appendChild(name);
    }

    if (movePart.data.hitbox_start) {
        let hitbox_duration = document.createElement('p');
        hitbox_duration.textContent = parseFrameWindow(movePart.data.hitbox_start, movePart.data.hitbox_end, "Hitbox Duration", false, dataFlags.open_end);
        hitbox_duration.style.fontSize = "16px";
        div.appendChild(hitbox_duration);
    }
}

// populate info section with overview data
function parseInfoFooterData(div, movePart, dataFlags) {
    if (movePart.data.faf && !dataFlags.hide_faf) {
        let faf = document.createElement('p');
        if (!movePart.data.faf_2nd) {
            faf.textContent = "FAF: " + movePart.data.faf;
        }
        else {
            faf.textContent = "FAF (" +  movePart.data.faf_str + "): " + movePart.data.faf + "/" + movePart.data.faf_2nd;
        }
        faf.style.fontSize = "16px";
        div.appendChild(faf);
    }

    if (dataFlags.has_ac) {
        let autocancel = document.createElement('p');
        autocancel.textContent = parseFrameWindow(movePart.data.autocancel_start, movePart.data.autocancel_end, "Autocancel", true);
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
        if (!movePart.data.faf_2nd) {
            faf.textContent = "FAF: " + movePart.data.faf;
        }
        else {
            faf.textContent = "FAF (" + movePart.data.faf_str + "): " + movePart.data.faf + "/" + movePart.data.faf_2nd;
        }
        
        faf.style.fontSize = "16px";
        div.appendChild(faf);
    }

    if (dataFlags.split_ac && dataFlags.has_ac) {
        let autocancel = document.createElement('p');
        autocancel.textContent = parseFrameWindow(movePart.data.autocancel_start, movePart.data.autocancel_end, "Autocancel", true);
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
function parseFrameWindow(start, end = false, headerString, ac = false, open_end = false) {
    if (end && start != end) {
        if (start.length && end.length) {   // multiple durations
            let str = headerString + ": F";
            for (let i = 0; i < start.length; i++) {
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
        if (open_end) {
            return headerString + ": F" + start + "+";
        }
        else {
            return headerString + ": F" + start + (ac ? "+" : "");
        }
    }
}

function constructTableHeaders(header_data, ext_header_data, dataFlags, has_faf = false) {
    /*
    *   <Table Header>
    *   [Hitbox ID]
    *   [Damage]
    *   [Angle]
    *   [BKB]
    *   [FKB]
    *   [KBG]
    *   [Hitbox Size]
    *   [Shield Safety]
    */

    if (!dataFlags.is_throw) {
        header_data.push("Hitbox ID");
    }
    if (!dataFlags.is_grab) {
        header_data.push("Damage", "Angle");

        if (dataFlags.has_fkb) {
           header_data.push("FKB");
        }
        else {
            header_data.push("BKB");
        }

        header_data.push("KBG");
    }
    if (!dataFlags.is_throw) {
        header_data.push("Hitbox Size");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw && !dataFlags.is_lock && !dataFlags.has_fall && has_faf) {
        header_data.push("On Shield");
    }

    /*
    *   <Ext Table Header>
    *   [Ground/Air]
    *   [Hitlag Multiplier]
    *   [SDI Multiplier]
    *   [Shieldstun Multiplier]
    *   [Shield Damage]
    *   [Additional Hitstun]
    *   [Reverse Hit]
    *   [Frame Advantage]
    */

    if (dataFlags.has_ga) {
        ext_header_data.push("Ground/Air");
    }
    if (!dataFlags.is_grab) {
        ext_header_data.push("Hitlag Multiplier");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw) {
        ext_header_data.push("SDI Multiplier");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw && dataFlags.has_shieldstun_mul) {
        ext_header_data.push("Shieldstun Multiplier");
    }
    if (dataFlags.has_shield_damage) {
        ext_header_data.push("Shield Damage");
    }
    if (dataFlags.has_add_hitstun) {
        ext_header_data.push("Additional Hitstun");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw && !dataFlags.is_lock) {
        ext_header_data.push("Reverse Hit");
    }
    if (dataFlags.has_fa) {
        ext_header_data.push("Frame Advantage (0/100%)");
    }
}

function populateHitboxSet(row_data, ext_row_data, hitbox, movePart, dataFlags) {
    if (!dataFlags.is_throw) {
        row_data.push(hitbox.id.toString());
    }
    if (!dataFlags.is_grab) {
        if (dataFlags.is_throw && hitbox.damage.length) {
            // parse array of damage values for throws
            let damageStr = "";
            for (let i = 0; i < hitbox.damage.length; i++) {
                damageStr += hitbox.damage[i] + ((/^\d+\.\d+$/).test(hitbox.damage[i]) ? '' : '.0') + '/';
            }

            damageStr = damageStr.slice(0, -1);
            row_data.push(damageStr + '%')
        }
        else {
            row_data.push(hitbox.damage + ((/^\d+\.\d+$/).test(hitbox.damage) ? '%' : '.0%'));
        }

        row_data.push(hitbox.angle.toString());
    }
    if (!dataFlags.is_grab) {
        if (dataFlags.has_fkb) {
            row_data.push(hitbox.fkb ? hitbox.fkb.toString() : 0);
        }
        else {
            row_data.push(hitbox.bkb ? hitbox.bkb.toString() : 0);
        }
        row_data.push(hitbox.kbg ? hitbox.kbg.toString() : 0);
    }
    if (!dataFlags.is_throw) {
        row_data.push(hitbox.hitbox_size == "various" ? "various" : hitbox.hitbox_size + ((/^\d+\.\d+$/).test(hitbox.hitbox_size) ? 'u' : '.0u'));
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw && !dataFlags.is_lock && !dataFlags.has_fall && (movePart.data.faf > 0 || movePart.data.landing_lag > 0)) {
        let safety = calculateShieldSafety(hitbox, movePart.data.hitbox_start, movePart.data.faf, dataFlags, movePart.data.landing_lag);
        let safety_2nd = "/";

        if (movePart.data.faf_2nd) {
            safety_2nd += calculateShieldSafety(hitbox, movePart.data.hitbox_start, movePart.data.faf_2nd, dataFlags, movePart.data.landing_lag) + "F";
        }
        else {
            if (hitbox.ground_air && hitbox.ground_air.toUpperCase() == "A") {
                // do nothing
            }
            else {
                safety += "F";
            }
        }

        row_data.push(safety + (safety_2nd != "/" ? safety_2nd : ""));
    }

    if (dataFlags.has_ga) {
        ext_row_data.push(hitbox.ground_air ? (
            hitbox.ground_air.toUpperCase() == "G" ? "Ground" : hitbox.ground_air.toUpperCase() == "A" ? "Air" : "Ground/Air"
        ) : "Ground/Air");
    }
    if (!dataFlags.is_grab) {
        ext_row_data.push(hitbox.hitlag_mul ? hitbox.hitlag_mul + ((/^\d+\.\d+$/).test(hitbox.hitlag_mul) ? 'x' : '.0x') : "1.0x");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw) {
        ext_row_data.push(hitbox.sdi_mul ? hitbox.sdi_mul + ((/^\d+\.\d+$/).test(hitbox.sdi_mul) ? 'x' : '.0x') : "1.0x");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw && dataFlags.has_shieldstun_mul) {
        ext_row_data.push(hitbox.shieldstun_mul ? hitbox.shieldstun_mul + ((/^\d+\.\d+$/).test(hitbox.shieldstun_mul) ? 'x' : '.0x') : "1.0x");
    }
    if (dataFlags.has_shield_damage) {
        ext_row_data.push(hitbox.shield_damage ? hitbox.shield_damage + ((/^\d+\.\d+$/).test(hitbox.shield_damage > 0 ? hitbox.shield_damage : hitbox.shield_damage.toString().substring(1)) ? '%' : '.0%') : "0%");
    }
    if (dataFlags.has_add_hitstun) {
        ext_row_data.push(hitbox.add_hitstun ? hitbox.add_hitstun + "F" : "0F");
    }
    if (!dataFlags.is_grab && !dataFlags.is_throw && !dataFlags.is_lock) {
        ext_row_data.push(hitbox.no_reverse ? "No" : "Yes");
    }
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
function calculateShieldSafety(hitbox, start_frame, faf = null, dataFlags, landing_lag = null) {
    let shieldstun = calculateShieldStun(hitbox, dataFlags);
    let start = start_frame.length ? start_frame[0] : start_frame;
    let shieldstun_offset = hitbox.shieldstun_mul == 1.0 ? 1.0 : 0.0;

    if (hitbox.ground_air && hitbox.ground_air.toUpperCase() == "A") {
        return "**";
    }
    if (!dataFlags.has_fall) {
        let safety;
        if (landing_lag > 0) {
            safety = shieldstun - landing_lag;
        }
        else {
            safety = start - faf + shieldstun + shieldstun_offset;
        }
        return (safety >= 0 ? "+" : "") + safety;
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