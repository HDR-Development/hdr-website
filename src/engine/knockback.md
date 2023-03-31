# Knockback

## ![](../images/SmashBall.png) Hitstun
- Hitstun is now calculated with a linear formula (as it has been in every previous game)
  - In vanilla Ultimate, hitstun is logarithmically scaled with knockback, which means hitstun per unit of knockback drops off as knockback increases. This has been reverted to that hitstun scales linearly with knockback, so higher percents should have more hitstun without affecting low percents
  - As a consequence, balloon knockback is no longer present. This was inherently tied to how hitstun was calculated, and we would rather have hitstun that works correctly that does not drop off at mid to high percents than keep balloon knockback
- Global Knockback to Hitstun Multiplier
  - 0.40 🠚 0.42

## ![](../images/SmashBall.png) Tumble
- Characters can no longer airdodge or attack directly out of tumble for at least 60F; wiggling the stick will cause a character to exit tumble faster
- Tumble Hitstun Threshold
  - 32F 🠚 34F
- Tumble Knockback Threshold
  - 90 🠚 80
- Maximum Grounded Initial Launch Speed
  - 8.3 🠚 100

## ![](../images/SmashBall.png) Hitlag
- The hitlag reduction depending on the number of players in a match has been removed
- Multihit hitlag has been standardized based on a move's number of hits
- Minimum hitlag
  - 5F 🠚 4F
- Damage to hitlag multiplier
  - 0.65x 🠚 0.45x
- Electric hitlag multiplier
  - 1.5x 🠚 1.25x
- Shield hitlag multiplier
  - 0.67x 🠚 0.85x

## ![](../images/SmashBall.png) Damage
- Removed the shorthop damage reduction multiplier
- Removed the 1v1 damage multiplier
- Reverse Hits
  - Most hitboxes that are either behind a character's base position or collide with an opponent that is behind said position will have their knockback angle flipped horizontally

## ![](../images/SmashBall.png) Launching
- Removed the rage mechanic
- Removed the threshold that caused high-knockback launches to be untechable
- Sakurai Angle
  - 38 🠚 44
- Crouch Canceling knockback multiplier
  - 0.85x 🠚 0.7x
- Ground Bounce knockback multiplier
  - 0.8x 🠚 1.0x

## ![](../images/SmashBall.png) Knockback Gravity / Fallspeed
- Removed Launch Speed Influence (LSI)
- Removed the threshold that caused the lower blastzone to become higher during a spike
- Hitstun Gravity has a lower and upper cap for all characters
  - This is to make comboing fastfallers and floaties less annoying and to make being comboed less frustrating and one-sided
- Launch speed of vertical knockback no longer overrides fallspeed/gravity and will speed up accordingly on a per-character basis
- Gravity-based horizontal launch speed boost formula
  - 1.5\*(g-0.05) 🠚 3.0\*(g-0.085)
- Gravity-based vertical launch speed boost formula
  - 3\*(g-0.085) 🠚 0\*(g-0)

## ![](../images/SmashBall.png) Killscreen
- Removed the final kill screen
  - False flashes were too egregious with the new survivability mechanics

<script src="../js/arrow.js">
</script>