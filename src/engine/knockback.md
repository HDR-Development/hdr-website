# Knockback

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Hitstun
- Hitstun is now calculated with a linear formula (as it has been in every previous game)
  - In vanilla Ultimate, hitstun is logarithmically scaled with knockback, which means hitstun per unit of knockback drops off as knockback increases. This has been reverted to that hitstun scales linearly with knockback, so higher percents should have more hitstun without affecting low percents
  - As a consequence, balloon knockback is no longer present. This was inherently tied to how hitstun was calculated, and we would rather have hitstun that works correctly that does not drop off at mid to high percents than keep balloon knockback
- Global Knockback to Hitstun Multiplier
  - 0.40 🠚 0.42

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Tumble
- Characters can no longer airdodge or attack directly out of tumble for at least 60F; wiggling the stick will cause a character to exit tumble faster
- Tumble Hitstun Threshold
  - 32F 🠚 34F
- Tumble Knockback Threshold
  - 80 🠚 90
- Maximum Grounded Initial Launch Speed
  - 8.3 🠚 100

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Hitlag
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

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Damage
- Removed the shorthop damage reduction multiplier
- Removed the 1v1 damage multiplier

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Launching
- Removed the rage mechanic
- Removed the threshold that caused high-knockback launches to be untechable
- Crouch Canceling knockback multiplier
  - 0.85x 🠚 0.7x
- Ground Bounce knockback multiplier
  - 0.8x 🠚 1.0x

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Knockback Gravity / Fallspeed
- Removed Launch Speed Influence (LSI)
- Removed the threshold that caused the lower blastzone to become higher during a spike
- Hitstun Gravity has a lower and upper cap for all characters
  - This is to make comboing fastfallers and floaties less annoying and to make being comboed less frustrating and one-sided
- Launch speed of vertical knockback no longer overrides fallspeed/gravity and will speed up accordingly on a per-character basis
- Gravity-based launch speed boost formula
  - 1.5\*(g-0.05) 🠚 3.0\*(g-0.085)
- Gravity-based vertical launch speed boost formula
  - 3\*(g-0.085) 🠚 0\*(g-0)
  - damage\_fly\_speed\_y\_mul\_base\_accel: 0.085 🠚 0
  - damage\_fly\_speed\_y\_mul: 3 🠚 0

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Killscreen
- Removed the final kill screen
  - False flashes were too egregious with the new survivability mechanics