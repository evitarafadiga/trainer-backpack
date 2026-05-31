import React from 'react'
import winners from './winners.json'
import WinnerCard from './components/WinnerCard'
import HeaderComponent from './components/HeaderComponent'

export default function Remembrance() {
    return (
        <div>
            <HeaderComponent></HeaderComponent>


            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
                <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Remembrance</p>
                            <h1 className="mt-2 text-4xl font-black md:text-5xl">RPG Victory Road</h1>
                            <p className="mt-3 max-w-2xl text-slate-300">
                                Um catálogo vivo de cada vencedor de season do RPG.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {winners.map((winner) => (
                            <WinnerCard
                                key={winner.numseason}
                                nums={winner.numseason}
                                title={winner.title}
                                desc={winner.desc}
                                narrname={winner.narrname}
                                narrpic={winner.narrpic}
                                playart={winner.playart}
                                bgseason={winner.bgseason}
                                narrdesc={winner.narrdesc}
                                playname={winner.playname}
                                playpic={winner.playpic}
                                playdesc={winner.playdesc}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
