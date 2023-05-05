# Glossary

## Hitbox Duration
- The frames that a hitbox is active. Different parts of a move (such as an early and late hit) are separated by a "/"

## Damage
- How much damage a move or particular hitbox deals to an opponent. Assumes no staling or freshness bonus and default damage multipliers

## Angle
- What direction an opponent will be sent flying. Angles above 360 are special angles and function as follows:
  - 361: Known as the Sakurai Angle. Keeps grounded opponents on the ground if the knockback taken is less than the global tumble threshold. Launches at an angle of 44 if above said threshold or against aerial opponents
  - 362: Always launches away from the center of the hitbox
  - 363: Launches opponents in the direction that the attacker is moving. Does not have any launch speed modifications
  - 365: Launches opponents in the direction that the attacker is moving, setting their launch speed to 50% of the attacker's momentum
  - 366: Launches opponents based on the direction the attacker is moving as well as the position of the opponent relative to the hitbox
  - 367: Behaves similarly to 366 except it also modifies the opponent's launch speed based on the attacker's momentum and the position of the opponent relative to the hitbox
    - Grounded opponents are always launched at an angle of 80
  - 368: Launches an opponent to a specified position in a defined amount of frames

## Base Knockback (BKB)
- How far a move will send an opponent at 0%. Also controls the amount of hitstun at 0% when used in conjunction with FKB or an autolink angle

## Fixed Knockback (FKB)
- The set distance that a move will send an opponent at any percent. Overrides the values of BKB/KBG

## Knockback Growth (KBG)
- Determines how much a move scales in knockback distance with the opponent's percent. Also controls the amount of hitstun scaling when used in conjunction with FKB or an autolink angle

## Hitlag Multiplier
- Hitlag is the state when an attack hits and both players are frozen in place, and the multiplier affects the overall duration. This is the point where Smash DI is able to be utilized

## SDI Multiplier
- Affects how effective each Smash DI input is during the hitlag of the move

## Additional Hitstun
- How many frames of additional hitstun the hitbox has

## Shield Damage
- How much additional damage a hitbox deals specifically to shields. Negative values will result in the move doing less shield damage than normal

## Shield Safety
- The difference in frames between the attacker and the opponent's actionability when hitting the opponent's shield
  - For moves without landing lag, assumes hitting shield with the earliest active frame of the move
  - For moves with landing lag, assumes hitting shield the frame before landing

## First Actionable Frame (FAF)
- The first frame that a character becomes fully actionable after performing a move

## Autocancel
- Landing during or after an autocancel frame will incur the character's empty landing lag (usually 4-5 frames) instead of the move's landing lag

## Landing Lag
- The amount of inactionable frames a character has when landing with aerials or certain specials (while not in an autocancel window)