const HeaderComponent = () => {
    return (
        <>
            <div>
                <ul className="grid grid-flow-col justify-center gap-4 font-bold bg-cyan w-full drop-shadow-lg rounded-xl h-10 align-middle place-content-center">
                    <li>
                        <a href='/' className="hover:text-sky-500">Trainercard</a>
                    </li>
                    <li>
                        <a href='/remembrance' className="hover:text-sky-500">Remembrance</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default HeaderComponent;