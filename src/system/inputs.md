# Inputs and Controls

## ![](../images/SmashBall.png) New Controls
- Added new control options which can be mapped to most buttons:
  - Short Hop
  - Taunt/Footstool
  - Smash Attack
  - Tilt Attack

## ![](../images/SmashBall.png) Buffer
- Hold buffer is preserved during certain states such as jumpsquat or Nana's spotdodge, but has otherwise been removed
  - During hitstun and shieldstun, there is a 5 frame tap extension buffer
- Buffer is now active during new cancels (land cancels, jump cancels, etc)
- Removed the forced shorthop when buffering an aerial
  - This change retains the ability to attack cancel while allowing the ability to buffer full hop aerials, allowing you to buffer frame-perfect fullhop aerials as well as fullhop attack cancels
- Buffered airdodges out of hitstun have been disabled
- Buffered spotdodges/rolls out of wavedash have been disabled, making consecutive wavedashes and buffering shield out of wavedash more consistent
- Perfect/buffered wavedashes out of jumpsquat now transition you directly into landing, allowing for much smoother movement
- Tap Buffer
  - 9F 🠚 5F
- Input Buffer Extension
  - 2F 🠚 0F

## ![](../images/SmashBall.png) Stick Sensitivity
- Stick sensitivity has been adjusted as follows:
  - Low: Smash attacks can occur until frame 2 of analog press
  - Normal: Smash attacks can occur until frame 4 of analog press
  - High: Smash attacks can occur until frame 6 of analog press
  - As a reference, vanilla Ultimate’s normal stick sensitivity is frame 6
- Pivot horizontal stick detection window
  - 0.0 🠚 0.075

## ![](../images/SmashBall.png) C-Stick
- C-Stick drift has been completely removed and the macro has been reprogrammed from scratch to mitigate inconsistencies and provide cleaner Bidou/Aidou implementation
- C-Stick aerials no longer move you forward or backward

## ![](../images/SmashBall.png) Command Inputs
- Command inputs		
  - Special command window
    - 10F 🠚 12F
  - Super Special / Final Smash command window
    - 20F 🠚 22F

<script src="../arrow.js">
</script>