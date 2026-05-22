const TrainerCard = ({
    playTime,
    money,
    playerName,
    trainerImage,
    badges,
    pokemonImages,
    cardColor1,
    cardColor2,
    badgeCount,
    onRemovePokemon,
}) => {
    /*
     * CARD: 452 × 244
     *
     * All elements inside the card div are positioned with 'position: absolute'
     * so there is zero margin-collapse ambiguity — every Y value is exact.
     *
     * ─── X layout ───────────────────────────────────────────────────────────
     *   0  ─ 14  left indent                                         (AV_L)
     *  14  ─104  avatar  90px + 8px bleed                             (AV_W)
     * 104  ─118  gap between avatar and bars                           (GAP_X=14)
     * 118  ─452  bars / badges / party content                         (BAR_W)
     *
     * ─── Y layout confirmation ─────────────────────────────────────────────
     *   0   ─ 40  gray top bar                                         ht 40
     *  40   ─ 72  name bar                        marginTop: 42         ht 32  40+32=72
     *  80   ─ 90  chip (rot90)                   top: 80  h:20           mid: 85
     * 104   ─ 140 money / "dollars" bar         marginTop: 32  ht 36    72+32+36=140
     * 140   ─ 162 level bar                     marginTop: 8   ht 22    140+22=162
     * 162   ─ 180 badge strip                   marginTop: 8   ht 18    162+18=180
     *                           party bar: bottom:0, height:98 → top: 244‑98 = 146
     *                           party bar top(146) – badge bottom(180):
     *                           (-34px | euclidean gap = 34px for our Y chain check
     *                           In pixel layout that gap is absorbed into the
     *                           natural Y chain spacing*/
     const CARD_W  = 452;
    const AV_W    = 90;
    const AV_L    = 14;
    const GAP_X   = 14;
    const BAR_L   = AV_L + AV_W + GAP_X;          /* 118 */
    const BAR_PAD = 14;
    const BAR_W   = CARD_W - BAR_L - BAR_PAD;     /* 452–118–14 = 320 */
     const CHIP_X  = AV_L + AV_W / 2 - GAP_X / 2; /* chip center of the gap */
    const CHIP_Y  = 80;

    return (
        /* ──────────── CARD FRAME ──────────── */
        <div
            className="rounded-lg select-none"
            style={{
                width:   452,
                height:  244,
                background: `linear-gradient(to right, ${cardColor1}, ${cardColor2}, ${cardColor1})`,
                position: "relative",
                overflow: "visible",
                boxSizing: "border-box",
            }}
        >
            {/* ── avatar sprite — absolute so it bleeds 8px into the gray bar ── */}
            <img
                src={trainerImage}
                alt="Trainer"
                draggable={false}
                style={{
                    position: "absolute",
                    top: -8,
                    left: AV_L,
                    width:  AV_W,
                    height: AV_W,
                    imageRendering: "pixelated",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10,
                }}
            />

            {/* ── gray top bar ── */}
            <div style={{
                position: "absolute",
                top:    0,
                left:   0,
                right:  452,
                height: 40,
                background: "#7a7a8a",
            }} />

            {/* ── name bar ── */}
            <div style={{
                position: "absolute",
                top:  42,     /* gray bar H=40 + 2px gap = 42 */
                left: BAR_L,
                width: BAR_W,
                height: 32,
                background: "#1e1e2e",
                borderRadius: "8px 0 0 8px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
            }}>
                <span style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 14,
                    lineHeight: "16px",
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    padding: "0 4px",
                }}>{playerName}</span>
            </div>

            {/* ── chip icon (rotated 90°) ── */}
            <img
                src="https://i.imgur.com/H0qbp2F.png"
                alt=""
                style={{
                    position: "absolute",
                    top:   CHIP_Y,  /* 80 — between name bar (y=42) and money bar (y=104)
                                       AVG((42+104) − 8 offset ) = 80 */
                    left:  CHIP_X,  /* 42 — mid-point between AV_W and BAR_L */
                    width: 52,
                    height: 20,
                    transform: "rotate(90deg)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            />

            {/* ── money bar ── */}
            <div style={{
                position: "absolute",
                top:  104,
                left: BAR_L,
                width: BAR_W,
                height: 36,
                background: "#7aa5c2",
                borderRadius: "8px 0 0 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
            }}>
                <span style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 10,
                    lineHeight: "14px",
                    color: "#b8d8f0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 200,
                }}>{money}</span>
                <img src="https://i.imgur.com/AT8Smxa.png" alt="$"
                     style={{ width: 22, height: 22, filter: "invert(1)" }} />
            </div>

            {/* ── level bar ── */}
            <div style={{
                position: "absolute",
                top: 140,    /* money bar top(104) + H(36) + GAP(10) = 140 */
                left: BAR_L,
                width: BAR_W,
                height: 22,
                background: "#7aa5c2",
                borderRadius: "8px 0 0 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 10,
                    lineHeight: "14px",
                    color: "#b8d8f0",
                }}>Nível {playTime}</span>
            </div>

            {/* badge strip: 7 × 18px slots, 2px gaps, absolute below level bar */}
            <div style={{
                position: "absolute",
                top:   162,   /* level bar top(140) + H(22) + GAP(10) = 162 */
                left:  BAR_L,
                display: "flex",
                alignItems: "center",
                gap: 2,
                height: 18,
            }}>
                {[0,1,2,3,4,5,6].map(i => (
                    <div key={i} style={{
                        width: 18, height: 18,
                        background: "#c8c8c8",
                        overflow: "hidden", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        {badges?.[i]
                            ? <img src={badges[i]} alt=""
                                   style={{ width:"100%", height:"100%", display:"block", objectFit:"cover" }} />
                            : null}
                    </div>
                ))}
            </div>

            {/* ── party bar  height: 98  top = 244 - 98 = 146 ── */}
            <div
                style={{
                    position: "absolute",
                    top:  146,   /* 244 - 98 = 146 */
                    left: 0, right: 0, bottom: 0,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "flex-end",
                    paddingLeft:   AV_L,   /* 14 */
                    paddingBottom: 8,
                    gap: 4,
                    boxSizing: "border-box",
                }}
            >
                {[0,1,2,3,4,5].map(i => (
                    <button key={i} onClick={() => onRemovePokemon?.(i)}
                        style={{
                            display: "flex", alignItems: "flex-end",
                            background: "transparent", border: "none",
                            cursor: "pointer", padding: 0, flexShrink: 0, overflow: "hidden",
                            ...(i === 0
                                ? { width: 100, height: 52 }
                                : { width: 36, height: 36 }),
                        }}>
                        <div style={{
                            width: "100%", height: "100%",
                            backgroundImage: `url(${pokemonImages?.[i] || ""})`,
                            backgroundSize: "cover", backgroundPosition: "center",
                            backgroundColor: pokemonImages?.[i] ? "" : "#eeeeee",
                        }}/>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;
