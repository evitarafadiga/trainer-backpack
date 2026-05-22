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
     * Bars and strips share the same left edge = BAR_L.
     * All Y positions are absolute from the card top (margin-top = 0 on
     * the card wrapper, bars use top: N from the natural flow chain).
     *
     * ─── X budget ───────────────────────────────────────────────
     *   0 ─ 14  left indent                         (AV_L)
     *  14 ─ 104  avatar sprite area                 (AV_W=90)
     * 104 ─ 118  gap between avatar and bars        (GAP_X=14)
     * 118 ─ 452  bars / badge strip / party content (BAR_W=320)
     *
     * ─── Y chain ───────────────────────────────────────────────
     *   Y=20   card false top (used as first bar top via margin)
     *   Y=20   gray top bar
     *   Y=62   name bar   (20+42 top + 42 ht = 62)
     *   Y=94   money bar  (62+22 gap + 32 ht = 94)
     *  ┌ chip at Y≈80 (between name=62 and money=94)
     *  Y=126  level bar   (94+10 gap + 22 ht = 126)
     *  Y=144  badge strip (126+8 gap + 18 ht = 144)
     *  Y=244  card bottom
     *  party bar: bottom:0, height=100
     *  top of party = 244 ─ 100 = 144 = badge bottom. Fits exactly.  ✓
     */
    const CARD_W  = 452;
    const AV_W    = 90;
    const AV_L    = 14;
    const GAP_X   = 14;
    const BAR_L   = AV_L + AV_W + GAP_X;           /* 118  bars left edge  */
    const BAR_PAD = 14;
    const BAR_W   = CARD_W - BAR_L - BAR_PAD;      /* 320  bars right edge → 438 */
    const GAP     = 10;
    const CHIP_X  = 42;
    const CHIP_Y  = 80;

    return (
        <div
            className="rounded-lg select-none"
            style={{
                width: 452,
                height: 244,
                background: `linear-gradient(to right, ${cardColor1}, ${cardColor2}, ${cardColor1})`,
                position: "relative",
                overflow: "visible",
                boxSizing: "border-box",
            }}
        >
            {
/*
 * Gray bar, name bar, money bar, chip icon, level bar,
 * badge strip enter the natural block flow in that order.
 * Each bar accounts for its own vertical position via margin-top
 * so the Y chain adds up exactly to the card height.
 */
            }

            {/* ── gray top bar ── */}
            <div style={{
                width: 452,
                height: 42,
                marginTop: 0,
                background: "#7a7a8a",
            }} />

            {/* ── trainer sprite — absolute so it bleeds 8px into the gray bar ── */}
            <img
                src={trainerImage}
                alt="Trainer"
                draggable={false}
                style={{
                    position: "absolute",
                    top: -8,          /* 8px bleeds above the gray bar → shows from Y=12 */
                    left: AV_L,       /* 14px from card-left */
                    width: AV_W,      /* 90ix */
                    height: AV_W,     /* 90px */
                    imageRendering: "pixelated",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10,
                }}
            />

            {/* ── name bar ── */}
            <div style={{
                marginLeft: BAR_L,
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

            {/* ── chip icon ── */}
            <img
                src="https://i.imgur.com/H0qbp2F.png"
                alt=""
                style={{
                    position: "absolute",
                    top: CHIP_Y,   /* 80: between name(62) and money(94) */
                    left: CHIP_X,  /* 42 */
                    width: 52,
                    height: 20,
                    transform: "rotate(90deg)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            />

            {/* ── money bar ── */}
            <div style={{
                marginLeft: BAR_L,
                marginTop: GAP,
                width: BAR_W,
                height: 32,
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
                <img src="https://i.imgur.com/AT8Smxa.png" alt="$" style={{ width: 22, height: 22, filter: "invert(1)" }} />
            </div>

            {/* ── level bar ── */}
            <div style={{
                marginLeft: BAR_L,
                marginTop: GAP,
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

            {/* ── badge strip (7 × 18px slots, 2px gaps) ── */}
            <div style={{
                marginLeft: BAR_L,
                marginTop: GAP,
                display: "flex",
                alignItems: "center",
                gap: 2,
                height: 18,
            }}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} style={{
                        width: 18,
                        height: 18,
                        background: "#c8c8c8",
                        overflow: "hidden",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {badges?.[i] ? (
                            <img
                                src={badges[i]}
                                alt=""
                                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                            />
                        ) : null}
                    </div>
                ))}
            </div>

            {/* ── party bar
                * 146px top section + 98px party = 244 = CARD_H ✓
                * BAR_L=14+90+14=118: party bar baseline
                * b2ed968: slot-0 = 100×52; slots 1-5 = 36×36; gap=4
                * 100 + 5×36 + 6×4 = 304 ≤ 452 ✓ */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 98,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "flex-end",
                    paddingLeft: AV_L,
                    paddingBottom: 8,
                    gap: 4,
                    boxSizing: "border-box",
                }}
            >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        onClick={() => onRemovePokemon?.(i)}
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            flexShrink: 0,
                            overflow: "hidden",
                            ...(i === 0
                                ? { width: 100, height: 52 }
                                : { width: 36, height: 36 }),
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${pokemonImages?.[i] || ""})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundColor: pokemonImages?.[i] ? "" : "#eeeeee",
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;
