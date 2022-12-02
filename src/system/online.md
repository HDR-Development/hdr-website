# Online

## ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Readjustable Latency Control (RLC)
- Background
  - In delay-based netcode, the game assigns a default amount of input delay to ensure stuttering is kept to a minimum. Ultimate in particular is extremely conservative on this to accommodate unstable connections, averaging around 4-6 frames for a perfect connection and adding additional frames based on ping (up to a technical max of 25)
- The online input delay can now be set manually, from 1 to 25 frames
  - This is equivalent to Dolphin’s buffer setting in allowing stable connections to achieve a lower latency, marking a massive improvement especially for connections within the same region
- This is a client-side adjustment. Setting the value too low will result in stuttering, but both players may set any value equal to or higher than what is found playable with no downside
- Choose the default “Auto” option to use whatever the game would normally assign you. After playing a match, said assigned delay will be displayed in parenthesis
- Extra Modes may also be toggled in online arenas by pressing Dpad down while waiting for a match
  - Note that all players must have the exact same combination of modes selected or the match will immediately desync