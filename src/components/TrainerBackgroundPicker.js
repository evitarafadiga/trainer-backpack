import React, { useState } from 'react';

const TrainerBackgroundPicker = ({
    backgrounds,
    selectedLabel,
    onSelect,
    width=200,
    height=108,
    cardRadius=8,
}) => {
    const [customUrl, setCustomUrl] = useState("");

    const handleAddCustom = () => {
        const url = customUrl.trim();
        if (!url) return;
        onSelect?.(url);
        setCustomUrl("");
    };

    return (
        <div className="space-y-3">
            {/* Background card grid */}
            <div
                style={{
                    display: 'grid', flexWrap: 'wrap', gap: 10,
                    flexFlow: 'column',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    width,
                }}
            >
                {backgrounds.map(({ label, image }, idx) => {
                    const isSelected = selectedLabel === label;
                    return (
                        <div
                            key={`${label}-${idx}`}
                            onClick={() => onSelect?.(isSelected ? undefined : image)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') onSelect?.(isSelected ? undefined : image);
                            }}
                            style={{
                                position: 'relative',
                                width, height,
                                borderRadius: cardRadius,
                                overflow: 'hidden',
                                border: isSelected
                                    ? '3px solid #60a5fa'
                                    : '3px solid transparent',
                                boxSizing: 'border-box',
                                cursor: 'pointer',
                                transition: 'transform 0.15s, border 0.15s',
                                transform: isSelected ? 'scale(1.05)' : 'scale(0.97)',
                                boxShadow: isSelected
                                    ? '0 0 16px rgba(96,165,250,0.6)'
                                    : 'none',
                                userSelect: 'none',
                                outline: 'none',
                            }}
                        >
                            {/* Background GIF */}
                            <img
                                src={image}
                                alt={label}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />

                            {/* Dark label overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    padding: '4px 8px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Press Start 2P', monospace",
                                        fontSize: 8,
                                        color: '#ffffff',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {label}
                                </span>
                                {isSelected && (
                                    <span
                                        style={{
                                            fontSize: 10,
                                            color: '#60a5fa',
                                            fontFamily: "'Press Start 2P', monospace",
                                            marginLeft: 6,
                                        }}
                                    >
                                        ✓
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Custom URL input */}
            <div className="flex gap-2 items-center">
                <input
                    type="url"
                    placeholder="Cole o URL da imagem de fundo..."
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustom(); }}
                    className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                    onClick={handleAddCustom}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-medium"
                >
                    Adicionar
                </button>
            </div>
        </div>
    );
};

export default TrainerBackgroundPicker;
