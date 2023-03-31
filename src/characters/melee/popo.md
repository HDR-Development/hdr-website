# ![](../../images/Stock_IceClimbers.png) Ice Climbers

<link rel="stylesheet" type="text/css" href="../../style.css">

![](../../images/SmashBall.png) <b>Attributes</b>
  - Popo
    - Walk Speed: 1.108 🠚 0.95
    - Initial Dash Speed: 1.68 🠚 1.4
    - Run Speed: 1.53 🠚 1.4
    - Run Acceleration (base/multiplier): 0.044/0.08096 🠚 0.02/0.05
    - Ground Friction: 0.077 🠚 0.035
    - Jumpsquat: 3F 🠚 4F
    - Horizontal Jump Speed Multiplier: 0.57 🠚 0.6
    - Short Hop Height: 16.75 🠚 14.75
    - Air Acceleration (base/multiplier): 0.01/0.08 🠚 0.02/0.027
    - Air Friction: 0.015 🠚 0.02
    - Gravity: 0.082 🠚 0.1
    - Fall Speed: 1.3 🠚 1.61
    - Fast Fall Speed: 2.08 🠚 2.167
    - Combo Gravity: 0.072912 🠚 0.1
    - Combo Fall Speed: 1.8 🠚 1.61
    - Heavy Landing Lag: 7F 🠚 4F
    - Weight: 92 🠚 88
  - Nana
    - Walk Speed: 1.008 🠚 0.95
    - Initial Dash Speed: 1.68 🠚 1.4
    - Run Speed: 1.683 🠚 1.4
    - Run Acceleration (base/multiplier): 0.0484/0.089056 🠚 0.02/0.05
    - Ground Friction: 0.0847 🠚 0.035
    - Jumpsquat: 3F 🠚 4F
    - Max Horizontal Jump Speed: 0.57 🠚 0.6
    - Short Hop Height: 16.75 🠚 14.75
    - Air Speed: 0.8715 🠚 0.87375
    - Air Acceleration (base/multiplier): 0.0105/0.084 🠚 0.02/0.03105
    - Air Friction: 0.015 🠚 0.02
    - Gravity: 0.082 🠚 0.1
    - Fall Speed: 1.3 🠚 1.61
    - Fast Fall Speed: 2.08 🠚 2.167
    - Combo Gravity: 0.072912 🠚 0.1
    - Combo Fall Speed: 1.8 🠚 1.61
    - Weight: 92 🠚 88
<br><br>

![](../../images/SmashBall.png) <b>Moveset</b>
  - Nana:
    - <property>Nana can now grab and is actionable during Popo's throws</property>
      - Pressing grab when the climbers are together will only grab with Popo unless the input is performed again
      - Pummels can be buffered during Nana’s grab
      - If not pummeling, Nana will pick a random throw according to the following weights:
        - Normal
          - 50% up
          - 20% down
          - 10% forward
          - 10% back
        - Within 30 units of ledge
          - 60% towards ledge
          - 40% down
    - <property>Hold Shield + Special + Down Taunt at the start of a match to play as Sopo for the entire match</property>
    - Damage/Knockback Multiplier: <buff>1.05x 🠚 1.0x</buff>
    - Internal CPU Level Modifier: <buff>76 🠚 100</buff>
<br><br>
  - Desyncs:
    - <property>Popo’s buffer is now inactive during spotdodges and rolls, allowing Nana to buffer an action during them to desync the Ice Climbers</property>
    - <property>Spotdodge/Roll desyncs also work during ledge getup/roll</property>
<br><br>
  - Jab:
    - Jab 1
      - Popo
        - Damage: <buff>2.0% 🠚 2.5%</buff>
        - BKB: <buff>20 🠚 25</buff>
        - Hitbox Size (base/mid/tip): <buff>2.0/2.2/2.4u 🠚 2.5/3.0/3.5u</buff>
      - Nana
        - BKB: <buff>20 🠚 25</buff>
        - Hitbox Size (base/mid/tip): <buff>1.8/2.0/2.3u 🠚 2.5/3.0/3.5u</buff>
      - FAF: <buff>28 🠚 18</buff>
    - Jab 2
      - FAF: <buff>30 🠚 21</buff>
<br><br>
  - Forward Tilt:
    - Popo
      - Damage: <nerf>9.0% 🠚 8.0%</nerf>
      - KBG: <buff>100 🠚 110</buff>
    - Nana
      - Damage: <buff>6.75% 🠚 8.0%</buff>
      - KBG: <buff>100 🠚 110</buff>
    - FAF: <nerf>30 🠚 33</nerf>
<br><br>
  - Up Tilt:
    - <buff>Added scoop hitbox</buff>
    - Hitbox Duration (scoop/multihits/launcher): <buff>F8-23/F27 🠚 F7-8/F9-24/F26</buff>
    - Scoop
      - Hitbox Duration: F6-11
      - Damage: 1.0%
      - Angle: 125
      - FKB: 75
      - KBG: 100
      - Hitbox Size: 3.5u
    - Multihits
      - Damage: <nerf>0.8/0.6% 🠚 0.5%</nerf>
      - Angle: <nerf>115/125/160 🠚 110</nerf>
      - BKB: <buff>65/60/20 🠚 15</buff>
      - KBG: <adjust>10 🠚 20</adjust>
      - Hitbox Size (hilt/hammer): <nerf>4.5/6.0u 🠚 3.5/5.0u</nerf>
    - Launcher
      - Popo
        - BKB: <adjust>40 🠚 47</adjust>
        - KBG: <adjust>100 🠚 95</adjust>
        - Hitlag Multiplier: <adjust>2.0x 🠚 1.5x</adjust>
      - Nana
        - Damage: <buff>3.0% 🠚 4.0%</buff>
        - BKB: <adjust>38 🠚 47</adjust>
        - KBG: <adjust>118 🠚 95</adjust>
        - Hitlag Multiplier: <adjust>2.8x 🠚 1.5x</adjust>
      - Hitbox Size (hilt/hammer): <nerf>5.5/7.0u 🠚 4.5/6.0u</nerf>
<br><br>
  - Down Tilt:
    - Hitbox Duration: <buff>F8-11 🠚 F6-8</buff>
    - Damage (Nana): <buff>4.5% 🠚 6.0%</buff>
    - Angle (hilt/hammer): <rework>20 🠚 75/85</rework>
    - KBG: <buff>100 🠚 95</buff>
    - FAF: <buff>31 🠚 29</buff>
<br><br>
  - Dash Attack:
    - Damage: <buff>4.5% 🠚 9.0%</buff>
    - Angle: <nerf>80 🠚 70</nerf>
    - KBG: <buff>60 🠚 40</buff>
    - Hitlag Multiplier (Popo): <adjust>1.2x 🠚 1.0x</adjust>
<br><br>
  - Forward Smash:
    - <buff>Added splash hitbox when the hammer hits the ground</buff>
    - Hitbox Duration (swing/impact): <buff>F11-13 🠚 F10-12/F13</buff>
    - Swing
      - Damage: <buff>12.0/9.0% 🠚 12.5%</buff>
      - KBG: <adjust>105/126 🠚 110</adjust>
      - Hitbox Size: <nerf>5.5u 🠚 5.0u</nerf>
    - Impact
      - Damage: 11.0%
      - Angle: 361
      - BKB: 50
      - KBG: 110
      - Hitbox Size: 5.0u
    - FAF: <nerf>47 🠚 51</nerf>
<br><br>
  - Up Smash:
    - Hitbox Duration: <buff>F12-17 🠚 F9-15</buff>
    - Popo
      - KBG: <buff>105 🠚 110</buff>
    - Nana
      - Damage (hammer/body): <buff>8.25/6.75% 🠚 11.0/9.0%</buff>
      - KBG: <buff>126 🠚 110</nerf>
    - Hitbox Size (tip): <buff>4.0u 🠚 5.0u</buff>
    - FAF: <nerf>50 🠚 52</nerf>
<br><br>
  - Down Smash:
    - <buff>Animation adjusted so that Popo and Nana hit both forwards and backwards</buff>
    - Hitbox Duration: <buff>F9-11 🠚 F8-11</buff>
    - Popo
      - Damage: <nerf>13.0% 🠚 12.0%</nerf>
      - Angle: <rework>60 🠚 40</rework>
      - KBG: <buff>100 🠚 110</buff>
    - Nana
      - Damage: <buff>9.75% 🠚 12.0%</buff>
      - Angle: <rework>60 🠚 40</rework>
      - KBG: <nerf>120 🠚 110</nerf>
    - FAF: <nerf>41 🠚 45</nerf>
<br><br>
  - Neutral Air:
    - <buff>Added shoulder hitbox</buff>
    - Nana
      - Damage: <buff>5.25% 🠚 7.0%</buff>
      - KBG: <nerf>120 🠚 100</nerf>
    - Hitbox Size (tip): <buff>4.0u 🠚 4.5u</buff>
    - Landing Lag: <nerf>7F 🠚 8F</nerf>
<br><br>
  - Forward Air:
    - Hitbox Duration: <buff>F19-20 🠚 F18-21</buff>
    - Popo
      - <buff>Added sweetspot just below the hammer head</buff>
      - Sweetspot
        - Damage: 12.0%
        - Angle: 285
        - BKB: 30
        - KBG: 66
        - Hitbox Size: 3.0u
      - Sourspot
        - Damage (hilt/hammer): <nerf>12.0% 🠚 11.0/12.0%</nerf>
        - Angle: <rework>30 🠚 70</rework>
        - KBG: <buff>95 🠚 103</buff>
        - Hitbox Size (hilt/hammer): <nerf>3.0/4.5u 🠚 3.0/4.0u</nerf>
    - Nana
      - Sweetspot
        - Angle: <rework>270 🠚 285</rework>
        - KBG: <nerf>100 🠚 66</nerf>
      - Sourspot
        - Damage (hilt/hammer): <buff>9.0% 🠚 11.0/12.0%</buff>
        - Angle: <rework>30 🠚 70</rework>
        - KBG: <nerf>114 🠚 103</nerf>
        - Hitbox Size (hilt/hammer): <nerf>3.0/4.5u 🠚 3.0/4.0u</nerf>
    - Autocancel: <buff>F1-2/F49 🠚 F1-3/F49</buff>
<br><br>
  - Back Air:
    - <nerf>Hammer hitbox moved inward</nerf>
    - Popo
      - Damage: <nerf>10.0% 🠚 9.0%</nerf>
      - KBG: <buff>115 🠚 134</buff>
    - Nana
      - Damage: <buff>7.5% 🠚 9.0%</buff>
      - KBG: <nerf>138 🠚 134</nerf>
    - FAF: <buff>36 🠚 32</buff>
    - Landing Lag: <nerf>7F 🠚 9F</nerf>
<br><br>
  - Up Air:
    - <rework>Animation changed to an upward poke similar to Melee</rework>
    - Hitbox Duration (early/late): F6-8/F9-28
    - Hammer
      - Damage (early/late): 9.0/7.0%
      - Angle: 70
      - BKB: 10
      - KBG: 140
      - Hitbox Size: 3.5u
    - Hilt/Hand
      - Damage: 7.0%
      - Angle: 70
      - BKB: 10
      - KBG: 140
      - Hitbox Size: 2.5/2.5u
    - FAF: 35
    - Autocancel: F1-5/F35
    - Landing Lag: 12F
<br><br>
  - Down Air:
    - <rework>Removed stall and fall</rework>
    - <property>Bounces on hit</property>
      - Bounces less on shield
    - Hitbox Duration: <buff>F12-51 🠚 F5-38</buff>
    - Damage: <buff>8.0/6.0% 🠚 10.0%</buff>
    - Angle: <nerf>70 🠚 65</nerf>
    - BKB: <rework>40 🠚 80</rework>
    - KBG: <rework>90 🠚 41</rework>
    - Hitbox Size: <nerf>6.5u 🠚 4.0u</nerf>
    - FAF: <buff>64 🠚 62</buff>
    - Autocancel: <buff>F54 🠚 F1/F53</buff>
    - Landing Lag: <buff>20F 🠚 13F</buff>
<br><br>
  - Ice Shot (Neutral Special):
    - <buff>Added hammer hitbox</buff>
    - Hammer
      - Hitbox Duration: F18-21
      - Damage: 9.0%
      - Angle: 80
      - BKB: 80
      - KBG: 60
      - Shield Damage: -4
      - Hitbox Size: 4.0u
    - FAF: <buff>56 🠚 48</buff>
<br><br>
  - Squall Hammer (Side Special):
    - Single Climber
      - Initial Height Gain: <buff>0.6 🠚 1.3</buff>
      - Gravity: <buff>0.1 🠚 0.08</buff>
    - Double Climber
      - Initial Height Gain: <buff>1.2 🠚 1.35</buff>
      - Gravity: <buff>0.1 🠚 0.087</buff>
<br><br>
  - Belay (Up Special):
    - Distance for Nana to warp to Popo: <nerf>60 🠚 50</nerf>
<br><br>
  - Blizzard (Down Special):
    - Hitbox Duration (early/mid/late): <adjust>F1-2/F3-6/F7-9 🠚 F1-2/F3-4/F5-9</adjust>
    - Early
      - KBG: <nerf>50 🠚 60</nerf>
    - Mid
      - KBG: <nerf>50 🠚 60</nerf>
    - Late
      - Damage: <nerf>1.0% 🠚 0.5%</nerf>
    - SDI Multiplier: <nerf>1.5x 🠚 1.6x</nerf>
<br><br>
  - Up Throw:
    - Startup: <adjust>F20 🠚 F28</adjust>
<br><br>
  - Down Throw:
    - <property>Startup is weight-dependent</property>
    - BKB: <nerf>30 🠚 45</nerf>
    - KBG: <nerf>116 🠚 120</nerf>
    - FAF (100 weight): <nerf>49 🠚 54</nerf>

<script src="../../js/arrow.js">
</script>