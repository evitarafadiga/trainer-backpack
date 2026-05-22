const TrainerCard = ({ playTime, money, playerName, badges, pokemonImages, cardColor1, cardColor2, badgeCount, onRemovePokemon }) => {
    return (
        <div
            className="rounded-lg w-[452px] h-[244px]"
            style={{ background: `linear-gradient(to right, ${cardColor1}, ${cardColor2}, ${cardColor1})` }}
        >

            <div className="pb-[149px] pt-[20px] flex flex-col justify-center items-end">
                <div className="bg-gray-700 w-full h-[42px]">
                    <div className="pb-[112px] pt-[-16px] pl-[14px]">
                        <div className="rounded-full bg-white w-[90px] h-[90px] bg-cover bg-center">
                            <div className="pb-[154px] pt-[5px] pl-[105px]">
                                <div className="rounded-lg rounded-e-none bg-slate-900 w-[333px] h-[32px] flex justify-center items-end pb-1">
                                    <div className="font-pixel text-[14px] text-white leading-none p-1">
                                        {playerName}
                                    </div>
                                </div>
                                <div className="pl-[118px] pt-[20px]">
                                    <div className="rounded-lg rounded-e-none bg-slate-700 w-[215px] h-[32px] flex justify-center items-end pb-1">
                                        <div className="font-pixel text-[12px] text-black pl-2 leading-none p-1">
                                            <span className="text-black text-[12px] text-gray-300">{money}</span>
                                        </div>
                                        <img src="https://i.imgur.com/AT8Smxa.png" alt="PokéDollars" className="w-[22px] object-cover invert"></img>
                                    </div>
                                </div>
                                <div className="absolute rotate-90 -translate-x-1/2 -translate-y-1/2 pl-[44px] pb-[111px]">
                                    <img src={'https://i.imgur.com/H0qbp2F.png'} alt="Trainercard Chip" className="w-[52px] object-cover"></img>
                                </div>
                                <div className="pl-[118px] pt-[5px]">
                                    <div className="rounded-lg rounded-e-none bg-slate-700 w-[215px] h-[22px] flex justify-center items-end pb-1">
                                        <div className="font-pixel text-[12px] text-black pl-2 leading-none">
                                            <span className="text-black text-[12px] text-gray-300">Nível {playTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pl-[118px] pt-[12px]">
                                     <div className="flex bg-white w-[215px] grid grid-cols-7 h-[2px] flex-wrap justify-center items-center gap-1">
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[0]} className="absolute" />}
                                             </div>
                                         </div>
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[1]} className="absolute" />}
                                             </div>
                                         </div>
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[2]} className="absolute" />}
                                             </div>
                                         </div>
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[3]} className="absolute" />}
                                             </div>
                                         </div>
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[4]} className="absolute" />}
                                             </div>
                                         </div>
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[5]} className="absolute" />}
                                             </div>
                                         </div>
                                         <div className="bg-gradient-to-r from-white w-[18px] h-[18px] overflow-hidden">
                                             <div className="font-pixel text-[8px] text-black items-center justify-center pb-2 pl-2">
                                                 {badges && <img src={badges[6]} className="absolute" />}
                                             </div>
                                         </div>
                                     </div>
                                </div>


                                <div className="pt-[26px] pb-[14px]">
                                    <div className="flex w-[552px] h-[36px]">
                                        <button className="bg-white w-[100px] h-[52px] overflow-hidden" onClick={() => onRemovePokemon && onRemovePokemon(0)}>
                                            <div
                                                className="w-full h-full bg-center bg-no-repeat"
                                                style={{ backgroundImage: `url(${pokemonImages && pokemonImages[0]})` }}
                                            />
                                        </button>
                                        <div className="p-1"></div>
                                        <button className="bg-white w-[36px] h-[36px] overflow-hidden" onClick={() => onRemovePokemon && onRemovePokemon(1)}>
                                            <div
                                                className="w-full h-full bg-center bg-no-repeat bg-cover"
                                                style={{ backgroundImage: `url(${pokemonImages && pokemonImages[1]})` }}
                                            />
                                        </button>
                                        <div className="p-1"></div>
                                        <button className="bg-white w-[36px] h-[36px] overflow-hidden" onClick={() => onRemovePokemon && onRemovePokemon(2)}>
                                            <div
                                                className="w-full h-full bg-center bg-no-repeat bg-cover"
                                                style={{ backgroundImage: `url(${pokemonImages && pokemonImages[2]})` }}
                                            />
                                        </button>
                                        <div className="p-1"></div>
                                        <button className="bg-white w-[36px] h-[36px] overflow-hidden" onClick={() => onRemovePokemon && onRemovePokemon(3)}>
                                            <div
                                                className="w-full h-full bg-center bg-no-repeat bg-cover"
                                                style={{ backgroundImage: `url(${pokemonImages && pokemonImages[3]})` }}
                                            />
                                        </button>
                                        <div className="p-1"></div>
                                        <button className="bg-white w-[36px] h-[36px] overflow-hidden" onClick={() => onRemovePokemon && onRemovePokemon(4)}>
                                            <div
                                                className="w-full h-full bg-center bg-no-repeat bg-cover"
                                                style={{ backgroundImage: `url(${pokemonImages && pokemonImages[4]})` }}
                                            />
                                        </button>
                                        <div className="p-1"></div>
                                        <button className="bg-white w-[36px] h-[36px] overflow-hidden" onClick={() => onRemovePokemon && onRemovePokemon(5)}>
                                            <div
                                                className="w-full h-full bg-center bg-no-repeat bg-cover"
                                                style={{ backgroundImage: `url(${pokemonImages && pokemonImages[5]})` }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )

}

export default TrainerCard;