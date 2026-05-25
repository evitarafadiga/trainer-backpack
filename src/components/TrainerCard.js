const TrainerCard = ({
    playTime, money, playerName, trainerImage,
    badges, pokemonImages, cardColor1, cardColor2,
    badgeCount, onRemovePokemon, onRemoveBadge, backgroundImg,
}) => {
    const Wc = 452; const Hc = 244;
    const AW = 100; const AL = 24;
    const GX = 12; const BL = AL + AW + GX;
    const BP = 14; const BW = Wc - BL - BP;

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

            <img
                src={backgroundImg || ""}
                style={{ backgroundSize: "cover", width: "100%", height: "100%"}}
                alt={backgroundImg.toString()}
            />
            {/* trainer sprite — absolute so it bleeds 8px above the gray bar */}
            <img
                src={trainerImage}
                alt={trainerImage.toString()}
                draggable={false}
                style={{
                    position: "absolute",
                    top: 18,   /* 8px above the gray bar */
                    left: 18,
                    width: 80,
                    height: 80,
                    borderRadius: '2px',
                    margin: '5px',
                    border: '1px solid #ffffff20',
                    imageRendering: "pixelated",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10,
                }}
            />

            {/* name bar — top = 42, gray bar bottom edge */}
            <div style={{
                position: "absolute",
                top: 10, left: BL + 32,
                width: BW, height: 30,
                background: "#1e1e2e30",
                borderRadius: "8px 0 0 8px",
                border: "1px solid #1e1e2e",
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

            {/* money bar — top = 42+32 = 74 */}
            <div style={{
                position: "absolute",
                top: 42, left: BL + 32,
                width: BW, height: 30,
                background: "#7aa5c230",
                borderRadius: "8px 0 0 8px",
                border: "1px solid #7aa5c2",
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
                top: 74, left: BL + 32,
                width: BW, height: 22,
                background: "#7aa5c230",
                borderRadius: "8px 0 0 8px",
                border: "1px solid #7aa5c2",
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
                top: 106, left: BL + 140,
                display: "flex",
                alignItems: "center",
                gap: 5,
                minHeight: 18,
                width: BW,
                zIndex: 5,
            }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <button key={i}
                        onClick={() => onRemoveBadge?.(i)}
                        title="Clique para remover"
                        style={{
                            width: 18, height: 18,
                            background: "#c8c8c850",
                            overflow: "visible",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #ffffff20",
                            justifyContent: "center",
                            borderRadius: "4px",
                            padding: 0,
                            margin: 0,
                            cursor: badges?.[i] ? "pointer" : "default",
                        }}
                    >
                        {badges?.[i]
                            ? <img src={badges[i]} alt=""
                                style={{
                                    width: "100%", height: "100%",
                                    display: "block", objectFit: "cover",
                                    imageRendering: "pixelated"
                                }} />
                            : null}
                    </button>
                ))}
            </div>

            {/* party bar — top = H-98 = 146 */}
            <div style={{
                position: "absolute",
                top: Hc - 68, left: 0, right: 0, bottom: 0,
                height: 68, background: "#ffffff50",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                paddingLeft: 14, paddingRight: 14, paddingBottom: 8,
                gap: 2, zIndex: 1,
                overflow: "visible"
            }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <button key={i}
                        onClick={() => onRemovePokemon?.(i)}
                        title="Clique para remover"
                        style={{
                            display: "flex",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 1,
                            flexShrink: 0,
                            ...(i === 0
                                ? { width: 100, height: 100 }
                                : { width: 64, height: 100 }),
                        }}
                    >
                        <div style={{
                            width: "100px", height: "100px",
                            backgroundImage: `url(${pokemonImages?.[i] || ""})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: pokemonImages?.[i] ? "" : "#cccccc50",
                            imageRendering: "pixelated",
                            border: i === 0 ? "" : "1px solid #ffffff",
                            overflow: "visible",
                        }} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;
