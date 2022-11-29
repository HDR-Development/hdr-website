#  UNIVERSAL CHANGES 



- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) New Controls:
  - Added new control options which can be mapped to most buttons:
    - Short Hop
    - Taunt/Footstool
    - Smash Attack
    - Tilt Attack

  - Jab Locks
    - Getup attack is disabled, choice of direction is locked in during hitlag
      - No direction will perform neutral getup
  - Tripping
    - Random tripping removed; either a move trips 100% of the time or never
  - Grab Invulnerability Timer
    - 60F 🠚 35F
  - Teching
    - Tech window 12F 🠚 20F
    - Tech lockout window 28F 🠚 40F


  - C-Stick aerials no longer move you forward or backward





- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Rolling / Teching:
  - Rolling/Spotdodging
    - Intangibility, startup, duration, and endlag for all rolls and spotdodges have been standardized as follows:
      - Forward Roll: frames 4-16, FAF 33
      - Backward Roll: frames 4-16, FAF 33
      - Spotdodge: frames 3-17, FAF 26
      - Bat Within and Foresight have been moved to frames 4-7 with subsequent intangibility matching that of the rest of the cast
    - Spotdodge Canceling Removed; Attack FAF matched with IASA
    - Spotdodge sensitivity decreased; 4 🠚 3
    - Distance and Speed Staling
      - Removed
        - Frame Staling: 60F 🠚 1F
        - Maximum Penalty Count: 5 🠚 1
        - Recovery Time: 120F 🠚 1F
        - Speed Multiplier Decrease per Penalty Count (Spotdodge/Forward Roll/Backward Roll): 0.06/0.06/0.1 🠚 0/0/0
  - Shield Grabs
    - Delay after Shieldstun: 4F 🠚 0F
  - Teching
    - The first 15 frames of airdodge out of tumble will trigger a tech when near ground
    - When not in hitstun, you are unable to hold shield infinitely to tech. It must be within the 20 frame tech window

- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Footstools:
  - Footstools are now performed by pressing taunt instead of jump
  - Footstool Velocity (Fullhop/Shorthop): 1.3/0.7 🠚 0.8/0.5
  - Footstool Invincibility Removed 
    - Invincibility frames 4 🠚 0
  - ` `Footstool lockout window after hitstun increased ?? 🠚 8F
  - You can no longer airdodge out of a footstool until after F20
  - Footstool vertical jump speed multiplier normalized for all characters

- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Item Mechanics:
  - Roll 🠚 Item Toss Window: 2F 🠚 6F
  - Characters no longer have a 30% chance to drop items when hit

- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png)Staling:
  - Stale-move negation damage reduction factors altered to match Melee
    - Queue Position 2: 0.08545 🠚 0.08
    - Queue Position 3: 0.07635 🠚 0.07
    - Queue Position 4: 0.0679 🠚 0.06
    - Queue Position 5: 0.05945 🠚 0.05
    - Queue Position 6: 0.05035 🠚 0.04
    - Queue Position 7: 0.04255 🠚 0.03
    - Queue Position 8: 0.03345 🠚 0.02
    - Queue Position 9: 0.025 🠚 0.01

- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Inputs:
  - Tap Buffer: 9F 🠚 5F
    - Input Buffer Extension: 2F 🠚 0F
  - Mostly removed vanilla Ultimate’s hold buffer
    - Hold buffer is preserved during certain states such as jumpsquat or Nana’s spotdodge
    - During hitstun and shieldstun, there is a 5 frame tap extension buffer
  - Buffer is now active during new cancels (land cancel/hammers etc)
  - Removed the forced shorthop when buffering an aerial
    - This change retains the ability to attack cancel while allowing the ability to buffer full hop aerials, allowing you to buffer frame-perfect fullhop aerials as well as fullhop attack cancels
  - Stick sensitivity has been adjusted as follows:
    - Low: Smash attacks can occur until frame 2 of analog press
    - Normal: Smash attacks can occur until frame 4 of analog press
    - High: Smash attacks can occur until frame 6 of analog press
    - As a reference, vanilla Ultimate’s normal stick sensitivity is frame 6
  - C-Stick drift has been completely removed and the macro has been reprogrammed from scratch to mitigate inconsistencies and provide cleaner Bidou/Aidou implementation
  - Buffered airdodges out of hitstun have been disabled
  - Buffered spotdodges/rolls out of wavedash have been disabled, making consecutive wavedashes and buffering shield out of wavedash more consistent
  - Perfect/buffered wavedashes out of jumpsquat now transition you directly into landing, allowing for much smoother movement
  - Jump cancels now work properly with tap jump
  - Pivot horizontal stick detection window increased 0.0 🠚 0.075
- Command inputs		
  - Special command life increased 10F 🠚 12F
  - Super Special (Final Smash) command life increased: 22F

- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png)Camera: 
  - Stage cameras have been reworked across the board to have faster player tracking and zoom to compensate for lack of balloon knockback and faster overall movement
  - Frames to trigger weak camera shake
    - 50 🠚 125
  - Frames to trigger strong camera shake
    - 70 🠚 155
  - Camera shake on medium/strong hits removed
  - Medium screen shake KB threshold: ?? 🠚 50
  - Strong screen shake KB threshold ?? 🠚90
  - Screen shake hitstun threshold for weak and strong screen shake increased (85/95 🠚 125/155) 
  - Fixed visual rotation angles on certain direction-reversion actions
  - Added unrestricted camera to all stages

- ### ![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Other:
  - Characters’ double jumps are now returned upon being grabbed
  - Characters’ voice clips for sustaining heavy knockback now play on frame 1 of hitstun instead of frame 6

- ### ` `![](images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png)User Interface and Graphics:
  - The main menu has a brand-new theme (courtesy of MilkiiJugs)
  - The pre-match load screen now has an HDR logo, and the match load screen sparkles are green (also courtesy of MilkiiJugs)
  - There is an optional HDR skin pack that revamps colors of characters and kill sparks packaged in a separate install folder /<need link/>
  - The Character Select Screen has a green theme (courtesy of JoBen)
  - HDR-Tips: Many tips have been added or edited to reflect HDR's changes and features, and are marked with "[HDR]" (courtesy of H3ra)


## Main CSS Changes
- Character selection is preserved between matches
- Random now previews the character before the match starts. Hold Z/ZR for traditional random

## Respawn Platform
- Can taunt on respawn platform as well as out of dash, run, and run brake