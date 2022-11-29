# ![](../images/Aspose.Words.f93ce4e3-25f6-48dc-9813-fc237aafe008.002.png) Shielding

## Shielding
- Removed vanilla mechanic where opponents were unable to be grabbed while experiencing blockstun from a non-projectile move
- Removed vanilla mechanic where shieldstun could be canceled after 10 consecutive hits
- Shieldstun formula: floor(d \* 0.8 \* m + 2) 🠚 floor(d \* 0.45 \* m+ 2)
  - Where d = move damage and m = shieldstun multiplier
- Minimum Hold Time
  - 3F 🠚 2F
- Maximum Health
  - 50 🠚 60
- Depletion per frame
  - 0.15 🠚 0.255
- Recovery per frame
  - 0.08 🠚 0.07
- Shield release duration
  - 11F 🠚 10F
- Global shield damage multiplier
  - 1.2x 🠚 1.4x
- Base shieldstun multiplier
  - 0.8x 🠚 0.45x
- Projectile shieldstun multiplier
  - 0.29x 🠚 0.5156x
- Smash attack shieldstun multiplier
  - 0.725x 🠚 1.0x
- Aerial attack shieldstun multiplier
  - 0.33x 🠚 1.0x
- Minimum shield hold frames
  - 2F 🠚 4F

## Parrying
- **Parrying projectiles will now reflect them**
  - Power Multiplier: 1.2x 🠚 0.6x
  - Speed Multiplier: 1.5x 🠚 1.0x
  - Maximum Reflection Amount: 3 🠚 7
  - Damage Multiplier: * 🠚 0.5x
- Activation Window after dropping Shield
  - 5F 🠚 3F
- Frame Advantage
  - +3F 🠚 +10F
- Shield pushback multiplier
  - 0.15x 🠚 0.01x
- Extra hitlag from parry
  - 14F 🠚 24F

 ## Shield Dropping
- Tilt down while in shield to drop through platforms (threshold is in between shield tilt and spotdodge)
- Alternatively, use the (shield + special) or (shield + shield) or (shield + taunt) shield lock shortcut and tilt/tap downwards to shield drop
- Spotdodge/platdrop stick thresholds changed to match Melee/ProjectM
  - Platdrop stick y threshold: -0.9875 🠚 -0.71
- Reinstated Axe method for shield dropping
- Added Melee/ProjectM UCF shield dropping
  - If your shield is angled using the Axe method, the platdrop stick threshold will move higher, and the spotdodge stick threshold will move much lower, so the range for a shield drop is much more accessible
  - The thresholds shift as follows:
    - Spotdodge stick y threshold: -0.75 🠚 -0.8
    - Platdrop stick y threshold: -0.71 🠚 -0.675