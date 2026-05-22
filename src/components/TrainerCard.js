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
    const slotBg = "#c8c8c8";        /* same grey as the original badge strip */

    return (
        /* ── CARD FRAME ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ */
        <div
            className="rounded-lg overflow-hidden select-none"
            style={{
                width: "452px",
                height: "244px",
                background: `linear-gradient(to right, ${cardColor1}, ${cardColor2}, ${cardColor1})`,
                position: "relative",
            }}
        >
            {/* ── ROW 1 — avatar + name strip ─ ─ ─ ─ ─ ─ ─ ─ ─ */}
            <div
                style={{
                    position: "relative",
                    paddingLeft: "14px",
                    paddingTop: "20px",
                    paddingBottom: "74px",
                }}
            >
                {/* Trainer sprite — absolute so it bleeds above the name bar */}
                <img
                    src={trainerImage}
                    alt="Trainer"
                    style={{
                        position: "absolute",
                        top: -8,
                        left: 14,
                        width: 90,
                        height: 90,
                        imageRendering: "pixelated",
                        imageSmoothingEnabled: false,
                    }}
                    draggable={false}
                />

                {/* Name bar */}
                <div
                    style={{
                        marginLeft: "105px",
                        height: 32,
                        background: "#1e1e2e",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "white",
                        }}
                    >
                        {playerName}
                    </span>
                </div>

                {/* Chip icon (rotated) — placed over the border between
                    the name bar and the bar below it */}
                <img
                    src={"https://i.imgur.com/H0qbp2F.png"}
                    alt=""
                    style={{
                        position: "absolute",
                        left: 58,
                        top: 42,
                        width: 52,
                        height: 20,
                        transform: "rotate(90deg)",
                        pointerEvents: "none",
                    }}
                />

                {/* Money */}
                <div
                    style={{
                        marginLeft: "118px",
                        marginTop: "20px",
                        height: 32,
                        background: "#7aa5c2",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "3px",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: "10px",
                            color: "#b8d8f0",
                        }}
                    >
                        {money}
                    </span>
                    <img
                        src="https://i.imgur.com/AT8Smxa.png"
                        alt="$"
                        style={{ width: 22, height: 22, filter: "invert(1)" }}
                    />
                </div>

                {/* Level */}
                <div
                    style={{
                        marginLeft: "118px",
                        marginTop: "8px",
                        height: 22,
                        background: "#7aa5c2",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: "10px",
                            color: "#b8d8f0",
                        }}
                    >
                        Nível {playTime}
                    </span>
                </div>
            </div>

            {/* ── ROW 2 — badge strip ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ */}
            <div
                style={{
                    marginLeft: "118px",
                    marginTop: "12px",
                    width: "215px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    height: 22,
                }}
            >
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 18,
                            height: 18,
                            background: slotBg,
                            overflow: "hidden",
                            flexShrink: 0,
                        }}
                    >
                        {badges?.[i] && (
                            <img
                                src={badges[i]}
                                alt=""
                                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* ── ROW 3 — party ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ */}
            <div
                style={{
                    position: "absolute",   /* stays inside the 452px wrapper */
                    left: 14,
                    right: 14,
                    bottom: 0,
                    height: 100,
                    background: "white",
                    borderTopLeftRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                }}
            >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        onClick={() => onRemovePokemon?.(i)}
                        title="Clique para remover"
                        style={{
                            background: "#eeeeee",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            overflow: "hidden",
                            /* slot 0 is 100×90, slots 1-5 are 36×36 */
                            ...(i === 0
                                ? { width: 100, height: 90 }
                                : { width: 36, height: 36 }),
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${pokemonImages?.[i]})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;
