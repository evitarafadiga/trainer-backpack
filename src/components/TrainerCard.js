const TrainerCard = ({
    playTime, money, playerName, trainerImage,
    badges, pokemonImages, cardColor1, cardColor2,
    badgeCount, onRemovePokemon,
}) => {
    const Wc   = 452; const Hc   = 244;
    const AW   = 90;  const AL   = 14;
    const GX   = 14;  const BL   = AL + AW + GX;
    const BP   = 14;  const BW   = Wc - BL - BP;
    const CX   = BL - GX / 2 - 26;
    const CY   = 44;

    return (
        <div
            style={{
                width: Wc, height: Hc,
                background: `linear-gradient(to right, ${cardColor1}, ${cardColor2}, ${cardColor1})`,
                boxSizing: "border-box",
                fontFamily: "'Press Start 2P', monospace",
                userSelect: "none",
                overflow: "hidden",
                borderRadius: 8,
                position: "relative",
            }}
        >
            {/* white circle backplate — card origin, covers Y=0 to Y=90 */}
            <div style={{
                position: "absolute",
                top: 0, left: AL,
                width: AW, height: AW,
                borderRadius: "50%",
                background: "#ffffff",
            }} />

            {/* trainer sprite — card origin, zIndex:1 above white circle backplate */}
            <img
                src={trainerImage} alt=""
                draggable={false}
                crossOrigin="anonymous"
                style={{
                    position: "absolute",
                    top: 0, left: AL,
                    width: AW, height: AW,
                    objectFit: "contain",
                    imageRendering: "pixelated",
                    zIndex: 1,
                    display: "block",
                    pointerEvents: "none",
                }}
            />

            {/* gray top bar — zIndex:2 partially covers the white circle (circle Y=0..90 + gray bar Y=0..42 overlap) */}
            <div style={{
                position: "relative", zIndex: 2,
                top: 0, left: 0, right: 0,
                width: Wc, height: 42,
                background: "#787878",
            }} />

            {/* name bar — top = 42, gray bar bottom edge */}
            <div style={{
                position: "absolute",
                top: 42, left: BL,
                width: BW, height: 32,
                background: "#1e1e2e",
                borderRadius: "8px 0 0 8px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
            }}>
                <span style={{
                    fontSize: 13, lineHeight: "18px",
                    color: "#ffffff",
                    whiteSpace: "nowrap", overflow: "hidden",
                    textOverflow: "ellipsis", maxWidth: "100%",
                    padding: "0 4px",
                }}>{playerName}</span>
            </div>

            {/* chip icon — centered at gray bar bottom midline (top=42) */}
            <div style={{
                position: "absolute",
                top: CY, left: CX,
                width: 52, height: 20,
                transform: "rotate(90deg)",
                pointerEvents: "none",
            }}>
                <img
                    src="https://i.imgur.com/H0qbp2F.png" alt=""
                    style={{ width: "100%", height: "100%",
                             imageRendering: "pixelated", display: "block" }}
                />
            </div>

            {/* money bar — top = 42+32 = 74 */}
            <div style={{
                position: "absolute",
                top: 42 + 32, left: BL,
                width: BW, height: 32,
                background: "#7aa5c2",
                borderRadius: "8px 0 0 8px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
            }}>
                <span style={{
                    fontSize: 10, lineHeight: "14px",
                    color: "#b8d8f0", overflow: "hidden",
                    textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{money}</span>
                <img
                    src="https://i.imgur.com/AT8Smxa.png" alt="$"
                    style={{ width: 22, height: 22, filter: "invert(1)" }}
                />
            </div>

            {/* level bar — top = 74+32 = 106 */}
            <div style={{
                position: "absolute",
                top: 74 + 32, left: BL,
                width: BW, height: 22,
                background: "#7aa5c2",
                borderRadius: "8px 0 0 8px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{
                    fontSize: 10, lineHeight: "14px",
                    color: "#b8d8f0",
                }}>Nivel {playTime}</span>
            </div>

            {/* badge strip — top = 106+22 = 128, height=18, bottom = 146 = party bar top, zIndex:5 above party bar */}
            <div style={{
                position: "absolute",
                top: 106 + 22, left: BL,
                display: "flex",
                alignItems: "center",
                gap: 2,
                minHeight: 18,
                width: BW,
                zIndex: 5,
            }}>
                {[0,1,2,3,4,5,6].map(i => (
                    <div key={i} style={{
                        width: 18, height: 18,
                        background: "#c8c8c8",
                        overflow: "hidden",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {badges?.[i]
                            ? <img src={badges[i]} alt=""
                                   style={{ width:"100%", height:"100%",
                                            display:"block", objectFit:"cover",
                                            imageRendering:"pixelated" }} />
                            : null }
                    </div>
                ))}
            </div>

            {/* party bar — top = H-98 = 146 */}
            <div style={{
                position: "absolute",
                top: Hc - 98, left: 0, right: 0, bottom: 0,
                height: 98, background: "#ffffff",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                paddingLeft: 14, paddingRight: 14, paddingBottom: 8,
                gap: 2, zIndex: 1,
            }}>
                {[0,1,2,3,4,5].map(i => (
                    <button key={i}
                        onClick={() => onRemovePokemon?.(i)}
                        title="Clique para remover"
                        style={{
                            display: "flex",
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
                        <div style={{
                            width: "100%", height: "100%",
                            backgroundImage: `url(${pokemonImages?.[i] || ""})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: pokemonImages?.[i] ? "" : "#cccccc",
                            imageRendering: "pixelated",
                        }}/>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;