# ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Mechanics

## Edge Canceling
- Move toward an edge during any of the following states to slide off of the edge and cancel all grounded endlag:
  - Aerials
  - Special fall
  - Shielding
  - Dashing
  - Standing turnaround
  - Runbrake
  - Damage
  - Taunts

## Edge Slide-offs
- Edge slipping caused by shield knockback or shield slide off happens more often due to parameter changes
  - When facing towards the center of the platform you’re standing on, you enter a state of pratfall when pushed off
  - When facing outwards of the platform, you will be instantly actionable like in Melee/ProjectM

## Shield Stopping
- Shielding can now be performed during initial dash

## Platdropping
- Platforms can now be dropped through during run, initial dash, and waveland

## Jump Cancel Grab
- Press grab during jumpsquat to execute a standing grab

## Dash Attack Cancel Up Smash (DACUS)
- Input up smash, up tilt, or up and grab between frames 3-10 of a dash attack to execute an up smash with the dash attack’s momentum

## Dash Attack Cancel Down Smash (DACDS)
- Input down smash, downtilt, or down and grab between frames 3-10 of a dash attack to execute a down smash with the dash attack’s momentum

## Dash Item Toss Cancel Item Toss (DITCIT)
- Input an item toss during the first 6 frames of a dash item toss to slide forward with a lot of momentum
- Can now be performed with a throw in any direction

## Glide Toss
- Input an item toss during the first 5 frames of a roll to slide forward with a burst of momentum
- Can be performed with a throw in any direction
- Speed gained from a glide toss depends on the animation speed of the roll on the last frame before being canceled
  - Due to varying roll animations, this means the timing for a “good” glide toss will vary per character and roll direction
  - Generally, the later into the roll a glide toss is performed, the further the slide

## Aerial Glide Toss (AGT)
- Airdodges can be canceled into an item toss during the first 5 frames
- Airdodges refresh after a successful AGT but are reduced in distance by 10% for each subsequent use before landing

## Airdodge Cancels
- Airdodges can be canceled with an item toss or zair after frame 3

## Wiggle out of Tumble
- While in tumble, tap the stick to the left or right to transition into normal fall
- Inputs cannot be buffered during knockback

## Pivoting / Perfect Pivoting
- After a dash, flick the control stick in the opposite direction and let go to return to standing position
  - If performed during the first 4 frames, you will perfect pivot similar to Smash 4
  - If performed during the next 3 frames, you will pivot in place similar to Melee

## Ledge Hogging
- The ledge counts as “occupied” for the first 75% of all ledge animations (varies slightly per character)

## Double Jump Canceling
- Ness, Lucas, Mewtwo, Peach, Yoshi, and Sora can cancel the upwards momentum of their double jumps with an aerial. They can still rise with an aerial during their double jump by holding the jump button
- The leniency window for this is 5 frames
- This also works with tap jump

## Moonwalking
- Characters can now moonwalk during initial dash; perform a moonwalk by performing a half-circle back motion during initial dash (or otherwise move the stick opposite the character's facing direction without triggering a dash back)

## Crouch out of Run
- Run can be directly canceled into crouch, allowing faster access to crouch-related options

## Wiggle out of Tumble
- Wiggling the control stick to exit tumble will now allow you to exit tumble directly after hitstun ends like in Melee/ProjectM instead of a bit after the tumbling animation starts

## Teeter Canceling
- Taunts, landing lag, and dashes can all be canceled by entering the teeter animation from standing right on an edge

## Bidou / Aidou
- Added support for Bidou and Aidou control schemes
  - When overridden with a held attack/special input, C-stick registers directional inputs for two frames (up from 1 frame in Sm4sh)
  - Allows easier inputs of frame-perfect techniques such as perfect pivots, c-stick moonwalks, and RAR/IRAR
  
## Salty Runback and Quick Exit
- Input L + R + A + Y + Start to immediately restart a match
- Input L + R + A + X + Start to exit a match straight to the stage select screen

## Meter System for Terry, Ryu, and Ken
- Just like in traditional fighting games these characters have been given a meter of their own for usage in Special Cancels, EX Specials, Super Specials, and more
- Up to 5 bars of meter can be gained through dealing damage and using certain specials
  - Special moves gain meter equivalent to half their damage on hit rounded to the nearest integer unless otherwise stated
  - Ex Specials gain no meter upon use
- More details can be found on the individual character changelogs