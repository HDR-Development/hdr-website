# HDR Data Contributor's Guide

Greetings! If you're interested in helping out with making changes to HDR Data, then here's everything you'll need to know


## The Environment
Setting up the development environment is much simpler than that of HDR. All you need is VSCode and Github Desktop (or a similar program such as GitKraken). Then simply fork the repo and open it within VSCode


## Install Rust
If you have previously set up the HDR dev environment, you should have Rust installed already. If not, please go to <a href="https://www.rust-lang.org/tools/install">this link</a> and click the download button that pertains to your OS

## Install cargo and mdbook
In the Extensions tab in VSCode, search for `cargo` and install it. Once you have cargo installed, open a new terminal in VSCode and run the following command: `cargo install mdbook`


## The Very Handy Command
From the home directory of the repository, you can type `mdbook serve --open` in the VSCode terminal to launch a locally hosted web session. It will update and refresh every time you save any changes to a file, making previewing changes quick and easy. You can also hit `Ctrl+F5` to fully reload the session, which can help with refreshing styles and if the data doesn't seem to be pulling correctly


## Submitting the Pull Request
Once you have made your changes, simply commit your changes in Github Desktop and create a pull request. I should see it immediately and will merge it after review and any further needed adjustments


## Making Changes
To update characters with new changes, you'll need to look at two locations: the character page (`<char>.md`) and that character's data file (`<char>.json`). Both can be found in the characters folder, separated by game. The data file is located in the same directory as the character page under the data folder


## The Character Page (`<char>.md`)
This is the skeleton that gets populated with all the character's data on page load
<br><br><br>
To add a new move, use the following template:

```html
<p>Move Name</p><div class="charTable"></div>
<br>
```
<br>
To include textual info about the move (such as unique properties or mechanic explanations), you will need to format as follows:

```html
<p>Move Name</p>
<ul>
  <li>Here is an example move property</li>
</ul>
<div class="charTable"></div>
<br>
```
<br>
You can also split the move into separate moves in the data file in order to provide information for specific moves parts like so:

```html
<p>Move Name</p>
<p class="info_movepart">Move Part 1</p>
<ul>
  <li>Some info pertaining only to this part of the move</li>
</ul>
<div class="charTable"></div>
<p class="info_movepart">Move Part 2</p>
<ul>
  <li>Some other info pertaining only to this part of the move</li>
</ul>
<div class="charTable"></div>
<br>
```
<br>
** Note that the character page needs to have the exact number of divs with the `charTable` label as the data file does move entries, or you will either be missing tables or the page may not load anything at all


## The Character Data File (`<char>.json`)

The moveset template (`basetemplate.json`) and move template (`movetemplate.json`) can be found in the `templates` folder on the root of the repo

Data fields do not need to be present if they are the same as the default values found in the template. Data fields do not technically need to be in order, but I do reserve the right to yell at you for not having them in order

All possible data fields are as follows, with a brief explanation for each:

### Header Data
- `moveset` - This does not need to be touched
- `move_name` - The identifier for the move (ie `Up Tilt`, `Down Air`, etc). Does not get pulled into the web page, this is solely for visibility when working in the data file
- `movepart_name` - The identifier for the move part (ie `Early`, `Launcher`, etc). This will show up in the move part's info if not empty, used for distinguishing between different move parts

### Data Flags
- `is_normal` - Classifies the move part as a normal (which is most of the time). This should only be false for smash attacks, aerials, projectiles, command grabs, and throws
- `is_smash` - Classifies the move part as a smash attack
- `is_aerial` - Classifies the move part as an aerial
- `is_projectile` - Classifies the move part as a projectile
- `is_grab` - Classifies the move part as a command grab (normal grabs should be handled solely on the character page)
- `is_throw` - Classifies the move part as a throw
- `is_lock` - Classifies the move part as a jablock hitbox. Used when a move contains hitboxes specifically for locking (ie certain jabs)
- `has_fall` - Used when the move transitions into special fall

** Only one of these flags should be `true` per move part, with the exception of `has_fall`. Data flags need to be defined per move part, as each part can have different data flags

### Info Data
** Info data only needs to be defined in the first move part of each move if no subsequent move parts contain different values

- `hitbox_start` - The starting frame of activity for the move part's hitboxes. If multiple hits, use array notation
- `hitbox_end` - The ending frame of activity for the move part's hitboxes. If multiple hits, use array notation. For durations of a single frame, you can either set start and end to the same frame or only use start (if the last/only value)
- `open_end` - Used if the hitbox has an arbitrary ending frame, such as being able to be interrupted at any point until some eventual period or the move continuing until it hits the ground. Two examples of this are Yoshi's Egg Roll and the falling portion of Egg Bomb
- `faf` - The first actionable frame of the move part
- `faf_2nd` - Used when the move part has a different FAF under some condition (such as ground/air or hit/whiff)
- `faf_str` - Used to specify the conditions pertaining to the first/second FAF
- `hide_faf` - Used to forgo displaying the FAF in the table footer when move parts are split across multiple tables to allow for displaying part-specific info
- `autocancel_start` - The starting frame for a move part's autocancel window. Can be array notated similar to hitbox durations
- `autocancel_end` - The ending frame for a move part's autocancel window
- `landing_lag` - The landing lag of the move

### Hitbox Data
- `id` - Hitbox ID
- `damage` - Damage
- `angle` - Angle
- `bkb` - Base Knockback. Does not need to be present when using FKB
- `fkb` - Fixed Knockback. Does not need to be present when using BKB
- `kbg` - Knockback Growth
- `hitlag_mul` - Hitlag Multiplier
- `sdi_mul` - SDI Multiplier
- `shieldstun_mul` - Shieldstun Multiplier
- `shield_damage` - Additional Shield Damage
- `add_hitstun` - Additional Hitstun
- `hitbox_size` - Hitbox Size
- `ground_air` - If the hitbox hits only ground (`"G"`) or air (`"A"`). Can also use `""` to denote both if used in array notation (see array notation section)
- `no_reverse` - If the hitbox explicitly does not reverse hit. Not used for throws
- `fa_0` - Frame Advantage at 0%. Used for certain moves such as jabs or dragdown aerials. Do not include if not properly documented
- `fa_100` - Frame Advantage at 100%


## Array Notation
A lot of hitbox sets have mostly or completely identical properties for several if not all of their hitboxes. To avoid needless redundancy and clutter, you can construct identical or semi-identical hitboxes as a single entry

```json
{
  "id": [ 0, 1, 2 ],
  "damage": [ 15.0, 15.0, 20.0 ],
  "angle": 361,
  "bkb": 30,
  "kbg": [ 100, 100, 97 ],
  "hitbox_size": [ 2.5, 3.5, 5.7 ]
}
```

All hitbox data fields in the `Hitbox Data` list be shorthanded in this manner if they differ between hitboxes within the same hitbox set

** Note that all differing fields will need to have the same amount of values as the id array, with each index of the arrays corresponding

## Damage Array Notation for Throws
Certain throws have multiple separate hitboxes before the release, in which case the damage field can be made into an array

<br>
Please don't hesitate to reach out to me via the HDR Discord if there are any questions. Happy contributing!<br>
-- Askew