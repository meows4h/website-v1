// this is attempting to simulate DSR Phase 4 from the MMORPG Final Fantasy XIV
// this code is incredibly inefficient but i honestly have 0 clue as to how i would at all truncate all these
// 'if this condition then this outcome' type mechanics for this phase into nice for loops

// player character role
var role_type = 0; // 0 for dps, 1 for supp
var role_category = 1; // 0 for melee, 1 for ranged
var role_position = 1; // position type as it pertains to raid plan, 1 or 2 (0 = 1, 1 = 2)

// i.e. a player with type 1, category 0, position 0, is main tank for 'support melee pos1' whereas 0,1,1 is typically caster, but any ranged dps works, the r2 position

// game rule variables
var stage = 0; // stage means at what step is the mechanic
var failed = false; // disables evaluation and progressing screen when true
var chain_type = 0; // 1 for red, 2 for blue

var dives_position = 0; // 0 -> inside eye, 1-4 cw starting N
var first_hit = 0; // 0 no hit, 1 cw-first, 2, ccw-first

// general use functions
function game_reset() {
    stage = 0;
    failed = false;
    chain_type = 0;
}

// selection functions
// changes class type (i.e. dps/supp + melee/ranged)
function change_role(type, category) {
    
    role_type = type;
    role_category = category;

}

// changes the position (i.e. r1 -> r2, m1 -> m2, h2 -> h1, etc..)
function position_swap() {

    if (role_position == 0) {
        role_position = 1;
    }

    else if (role_position == 1) {
        role_position = 0;
    }

    else {
        role_position = 0;
    }
}


// gameplay functions
// swaps chain type
function chain_swap() {
    if (chains == 1) {
        chains = 2;
    } else if (chains == 2) {
        chains = 1; 
    }
}

// makes 50/50 coin toss for your chains
function generate_chains() {
    let random_int = Math.floor(Math.random * 2);
    if (random_int == 0) {
        chain_type = 1;
    } else {
        chain_type = 2;
    }
}

// makes decision for dives
function generate_dive_hits() {
    
    possible_hits = [1,2,3,4];

    let random_int = Math.floor(Math.random * 4);
    possible_hits.splice(random_int, 1);

    random_int = Math.floor(Math.random * 3);
    possible_hits.splice(random_int, 1);

    for (let i = 0; i < possible_hits.length(); i++) {} // this is where i left off
}

function evaluate_choice(choice) {

    if (failed == true) {
        return 0;
    }

    // chains assignment
    if (stage == 0) {

        // red chains
        if (chains == 1) {
            if (role_category == 0) {
                // dont swap = correct (melee)
            } else {
                // swap = correct (ranged)
            }

        // blue chains
        } else if (chains == 2) {
            if (role_category == 0) {
                // swap = correct (melee)
            } else {
                // dont swap = correct (ranged)
            }
        }
    }

    // bubbles positioning
    if (stage == 1) {

        if (role_category == 0) { // melee
            if (role_type == 0) { // dps
                // left orb (blue eye orb)
            }
            else { // tank
                // right orb (red eye orb)
            }
        }
    
        else { // ranged
            if (role_type == 0) { // dps
                if (role_position == 0) { // r1
                    // NW orb
                }
                else { // r2
                    // SW orb
                }
            }
            else { // healer
                if (role_position == 0) { // h1
                    // NE orb
                }
                else { // h2
                    // SE orb
                }
            }
        }
    }

    // bubble pop (melee)
    if (stage == 2) {

        if (role_category == 0) { // melee
            if (role_type == 0) { // melee dps
                // inside left orb (blue eye orb)
            }
            else { // tank
                // inside right orb (red eye orb)
            }
        }
    
        else { // ranged (staying in place)
            if (role_type == 0) { // phys + caster
                if (role_position == 0) { // r1
                    // NW orb
                }
                else { // r2
                    // SW orb
                }
            }
            else { // healer
                if (role_position == 0) { // h1
                    // NE orb
                }
                else { // h2
                    // SE orb
                }
            }
        }
    }

    // chain swaps
    if (stage == 3) {

        if (role_type == 0) { // dps
            if (role_position == 0) { // m1 + r1
                // NW orb
            }
            else { // m2 + r2
                // SW orb
            }
        }
        else { // supports
            if (role_position == 0) { // mt (t1) + h1
                // NE orb
            }
            else { // ot (t2) + h2
                // SE orb
            }
        }
    }

    // bubble pop (ranged)
    if (stage == 4) {

        if (role_category == 1) { // ranged
            if (role_type == 0) { // phys + caster
                if (role_position == 0) { // r1
                    // inside NW orb
                }
                else { // r2
                    // inside SW orb
                }
            }
            else { // healers
                if (role_position == 0) { // h1
                    // inside NE orb
                }
                else { // h2
                    // inside SE orb
                }
            }
        }
        else { // melee
            // just somewhere NOT near orbs for this...
        }

    }

    // dives positioning
    if (stage == 5) {

        if (role_category == 1) { // ranged
            if (role_type == 0) { // phys + caster
                if (role_position == 0) { // r1
                    // NW of eye
                }
                else { // r2
                    // SW of eye
                }
            }
            else { // healers
                if (role_position == 0) { // h1
                    // NE of eye
                }
                else { // h2
                    // SE of eye
                }
            }
        }
        else { // melee
            // inside blue eye
        }

    }

    // dives 1
    if (stage == 6) {

        // needs some way to track which role is getting hit, where each other role is at
        // maybe tracking role positions and just automating it outside of the player
        // then if player mismatches the auto play, make that a fail ..?
        // tanks replacing

    }

    // dives 2
    if (stage == 7) {

        // melee replacing

    }

    // dives 3
    if (stage == 8) {

        // first two hit replacing, cw-first replacing cw-first, ccw-first replacing ccw-first

    }

    stage += 1;

}