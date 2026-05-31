import React from 'react'

function PersonCard({ label, name, pic, desc, accentClass }) {
    if (!name && !pic && !desc) return null

    return (
        <div className={`rounded-xl border p-4 shadow-sm ${accentClass}`}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">{label}</div>
            {pic ? (
                <img
                    src={pic}
                    alt={name || label}
                    className="h-44 w-full rounded-lg object-cover bg-slate-100 mb-4"
                />
            ) : null}
            <div className="font-semibold text-slate-900">{name || '?'}</div>
            {desc ? <div className="text-sm text-slate-600 mt-1">{desc}</div> : null}
        </div>
    )
}

export default function WinnerCard({
    nums,
    title,
    desc,
    narrname,
    narrpic,
    playart,
    bgseason,
    narrdesc,
    playname,
    playpic,
    playdesc,
}) {
    return (
        <article className="w-full max-w-6xl mx-auto px-4 py-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="grid lg:grid-cols-[480px_minmax(0,1fr)_0px] gap-1">
                    {playart ? (
                        <div
                            className="min-h-56 bg-cover bg-center"
                            style={{ backgroundImage: `url(${playart})` }}
                            title="Arte do vencedor"
                        />
                    ) : null}
                    <div className='p-2'>
                        {bgseason ? (
                            <div
                                className="min-h-56 bg-cover bg-top rounded-xl"
                                style={{ backgroundImage: `url(${bgseason})` }}
                                title="Tema da season"
                            />
                        ) : (
                            <div className="hidden lg:block bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500" />
                        )}
                        <div className="p-4 md:p-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                Season {nums}
                            </p>
                            <h2 className="mt-2 text-2xl md:text-3xl font-black text-slate-900">{title}</h2>
                            {desc ? <p className="mt-3 text-slate-600">{desc}</p> : null}

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <PersonCard
                                    label="Vencedor"
                                    name={playname}
                                    pic={playpic}
                                    desc={playdesc}
                                    accentClass="border-rose-100 bg-rose-50/60"
                                />
                                <PersonCard
                                    label="Narrador"
                                    name={narrname}
                                    pic={narrpic}
                                    desc={narrdesc}
                                    accentClass="border-emerald-100 bg-emerald-50/60"
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </article>
    )
}