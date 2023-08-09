
const TrainerCard = ({ playTime, money, playerName }) => {
    return (
        <div className="rounded-lg bg-slate-300 w-[352px] h-[201px]">

            <div className="pb-[149px] pt-[20px]">
                <div className="bg-gray-700 w-[352px] h-[32px]">
                    <div className="pb-[112px] pt-[-16px] pl-[14px]">
                        <div className="rounded-full bg-white w-[90px] h-[90px]">                        
                        <div className="pb-[154px] pt-[5px] pl-[105px]">
                        <div className="rounded-lg rounded-e-none bg-slate-300 w-[233px] h-[22px]">
                            <div className="font-mono pl-2">
                                {playerName}
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