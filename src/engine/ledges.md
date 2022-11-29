# ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Ledges

## Ledge Grabbing and Snapping
- Characters can no longer grab the ledge while rising during an airborne state. You can now only grab ledge while either falling or with zero vertical velocity, rather than strictly falling (exceptions to these rules unchanged)
- 2-Framing has been completely removed; ledgegrab animations are a consistent intangible 8 frames regardless of if grabbing from above or below

## Ledge Hogging and Intangibility
- Ledge Hogging
  - Characters can no longer grab ledge while another character is occupying the ledge. Tethers are an exception, and will cause a ledge trump when the tethered character pulls themself toward the ledge
- Ledge Intangibility
  - Ledge intangibility duration: 47F 🠚 37F
  - The remainder of iframes persist throughout any action after a ledgedrop
  - Landing on the ground will clear the iframes, meaning *intangible ledgedashes are not possible*
- You cannot grab ledge during the first few frames after running off a ledge
- Buffering is cleared when missing a tech and sliding off a ledge or platform toprevent accidental airdodges
- Tether recoveries no longer occupy ledge until the characters rewinds to ledge
- Tether recoveries are now forced into a ledge trump upon rewinding to anoccupied ledge; after getting trumped, the character is allowed one action beforegoing into special fall, and is forced into special fall landing upon hitting theground
- Max ledge tethers normalized with normal ledge grab limit 5 🠚 6
- Tether rewind ledge wait FAF decreased 20F 🠚 7F
- Ledge Grab FAF: 20 🠚 7
- Maximum ledge snap duration: 2F 🠚 3F
- Regrab Timer
  - Drop/After Hit: 44F/30F 🠚 25F/25F
- Ledge Trump FAF: 28 🠚 30
- Ledge Trump Horizontal Speed: 0.9 🠚 -0.2
- Ledge snap windows for all special moves pushed further toward end of move
- Max ledge tethers per airtime (air\_lasso\_catch\_num): 3 🠚 5