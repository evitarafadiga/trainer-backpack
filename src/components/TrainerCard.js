
const TrainerCard = ({ playTime, money, playerName, badge }) => {
    return (
        <div className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 w-[352px] h-[201px]">

            <div className="pb-[149px] pt-[20px]">
                <div className="bg-gray-700 w-[352px] h-[32px]">
                    <div className="pb-[112px] pt-[-16px] pl-[14px]">
                        <div className="rounded-full bg-white w-[90px] h-[90px]">
                            <div className="pb-[154px] pt-[5px] pl-[105px]">
                                <div className="rounded-lg rounded-e-none bg-slate-900 w-[233px] h-[22px]">
                                    <div className="font-mono text-white pl-2">
                                        {playerName}
                                    </div>
                                </div>
                                <div className="pl-[118px] pt-[16px]">
                                    <div className="rounded-lg rounded-e-none bg-slate-700 w-[115px] h-[22px]">
                                        <div className="font-mono text-black pl-2">
                                            {playTime}
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-[118px] pt-[5px]">
                                    <div className="rounded-lg rounded-e-none bg-slate-700 w-[115px] h-[22px]">
                                        <div className="font-mono text-black pl-2">
                                            {money}
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-[56px] pt-[12px]">
                                    <div className="flex bg-white w-[177px] h-[2px]">
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-gradient-to-r from-white w-[18px] h-[18px] rotate-45">
                                           {badge} 
                                        </div>
                                    </div>
                                </div>


                                <div className="pt-[26px] pb-[14px]">
                                    <div className="flex w-[352px] h-[36px]">
                                        <div className="bg-white w-[36px] h-[36px]">
                                            {badge}
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-white w-[36px] h-[36px]">
                                            {badge}
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-white w-[36px] h-[36px]">
                                            {badge}
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-white w-[36px] h-[36px]">
                                            {badge}
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-white w-[36px] h-[36px]">
                                            {badge}
                                        </div>
                                        <div className="p-1"></div>
                                        <div className="bg-white w-[36px] h-[36px]">
                                            {badge}
                                        </div>
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