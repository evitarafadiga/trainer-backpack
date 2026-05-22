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
     * ROW 1 · STATS STRIP
     * ─────────────────────────────────────────────────────────
     * All px measured from card's top-left corner (0,0).
     *
     * Y-axis layout:
     *   0   ─ 42   gray top bar
     *   42  ─ 74   name bar
     *   68  ─ 100  money bar (+26px gap below name bar)
     *   84  ─ 106  level bar (+8px gap below money bar)
     *   110 ─ 128  badge strip (+6px gap)
     *   party bar  sits at bottom: absolute bottom:0, height:100
     *
     * X-axis offsets:
     *   left 14   → avatar circle + trainer sprite  (top:-8, so it bleeds 8px above the gray bar)
     *   left 118  → bars / badge strip  (90px avatar + 14px left-pad + 14px gap)
     *   right: 452 (card edge — bars are 333px wide, so right edge = 118 + 333 = 451)
     */
            }

            {/* ── trainer sprite — absolute so it bleeds 8px above the gray bar ── */}
            <img
                src={trainerImage}
                alt=""
                draggable={false}
                style={{
                    position: "absolute",
                    top: -8,   /* 8px above the gray bar */
                    left: 14,
                    width: 90,
                    height: 90,
                    imageRendering: "pixelated",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10,
                }}
            />

            {/* ── name bar ── */}
            <div style={{
                marginLeft: 118,   /* no relative parent needed — Y is handled bottom margin chain */
                width: 333,
                height: 32,
                background: "#1e1e2e",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
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
                    maxWidth: 315,
                    padding: "0 4px",
                }}>{playerName}</span>
            </div>

            {/* ── money bar ── */}
            <div style={{
                marginLeft: 118,
                marginTop: 20,   /* 28px below name bar (42+32+20 = 94 → name bar ends at 74, 74+20 = 94) */
                width: 215,
                height: 32,
                background: "#7aa5c2",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
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
                    maxWidth: 165,
                }}>{money}</span>
                <img
                    src="https://i.imgur.com/AT8Smxa.png"
                    alt="$"
                    style={{ width: 22, height: 22, filter: "invert(1)" }}
                />
            </div>

            {/* ── chip icon (rotated 90°, placed over the boundary between name+money bars) ── */}
            <img
                src="https://i.imgur.com/H0qbp2F.png"
                alt=""
                style={{
                    position: "absolute",
                    top: 110,
                    left: 42,
                    width: 52,
                    height: 20,
                    transform: "rotate(90deg)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            />

            {/* ── level bar ── */}
            <div style={{
                marginLeft: 118,
                marginTop: 8,   /* 8px below money bar → 94+32+8 = 134 */
                width: 215,
                height: 22,
                background: "#7aa5c2",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
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

            {/* ── badge strip (7 slots, 18px each, 2px gap) ── */}
            <div style={{
                marginLeft: 118,
                marginTop: 12,
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

            {/* ════════ ROW 2 · PARTY BAR ════════ */}
            {/* absolute to card bottom; width fills card body (no side padding) */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 100,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "flex-end",
                    paddingLeft: 14,
                    paddingBottom: 8,
                    boxSizing: "border-box",
                    gap: 0,
                }}
            >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        onClick={() => onRemovePokemon?.(i)}
                        title="Clique para remover"
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            flexShrink: 0,
                            overflow: "visible",
                            /* slot 0 slot-sized; slots 1-5 are 36×36 */
                            ...(i === 0
                                ? { width: 100, height: 52 }   /* b2ed968: w-[100px] h-[52px] */
                                : { width: 36, height: 36 }),
                        }}
                    >
                        {i === 0 ? (
                            /* slot 0 — pokemon sprite, full slot */
                            <div style={{
                                width: 100,
                                height: 52,
                                backgroundImage: `url(${pokemonImages?.[0] || ""})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundColor: "#eeeeee",
                            }} />
                        ) : (
                            /* slots 1-5 — square sprites */
                            <div style={{
                                width: 36,
                                height: 36,
                                backgroundImage: `url(${pokemonImages?.[i] || ""})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundColor: "#eeeeee",
                            }} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;
