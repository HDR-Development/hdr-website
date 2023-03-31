# Ledges

## ![](../images/SmashBall.png) Ledge Grabbing and Snapping
- Characters can no longer grab the ledge while rising during an airborne state. You can now only grab ledge while either falling or with zero vertical velocity, rather than strictly falling (exceptions to these rules unchanged)
- 2-Framing has been completely removed; ledgegrab animations are a consistent intangible 8 frames regardless of if grabbing from above or below

## ![](../images/SmashBall.png) Ledge Hogging and Intangibility
- Ledge Hogging
  - Characters can no longer grab ledge while another character is occupying the ledge
  - Tether recoveries are forced into a ledge trump upon reeling to an occupied ledge; after getting trumped, the character is allowed one action before going into special fall, and is forced into special fall landing upon hitting the ground
- Ledge Intangibility
  - The remainder of iframes persist throughout any action after a ledgedrop
  - Landing on the ground will clear the iframes, meaning *intangible ledgedashes are not possible*
  - Ledge intangibility duration
    - 47F 🠚 37F
- You cannot grab ledge during the first few frames after running off a ledge
- Input buffer is cleared when missing a tech and sliding off a ledge or platform to prevent accidental airdodges
- Tether rewind ledge wait FAF
  - 20F 🠚 7F
- Ledge Grab FAF
  - 20 🠚 7
- Maximum ledge snap duration
  - 2F 🠚 3F
- Regrab Timer
  - Drop/After Hit: 44F/30F 🠚 25F
- Ledge Trump FAF
  - 28 🠚 30
- Ledge Trump Horizontal Speed
  - 0.9 🠚 -0.2
- Max ledge tethers per airtime
  - 3 🠚 5

<script src="../js/arrow.js">
</script>