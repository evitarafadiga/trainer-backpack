import TrainerCard from "./components/TrainerCard"
import Dropdown from "./components/Dropdown";
import React from 'react';

const footerURL = "./img/footer-texture.png";


export default function App() {

  const [playerName, setName] = React.useState(localStorage.getItem("playerName"));
  const [seasonsPlayed, setSeasons] = React.useState(localStorage.getItem("seasonsPlayed"));

  return (
    <div className="flex flex-col h-screen justify-between">

      {/*header*/}
      <div className="bg-gradient-to-b from-sky-300 to-transparent ">
        <div className="flex py-10 justify-center items-center space-x-4 text-base">
          {/*max 25 characters for trainer name*/}
          <TrainerCard playerName={playerName} playTime={seasonsPlayed} money={"122"} badge={""} />
        </div>
        <div className="flex justify-center items-center space-x-4 text-base">
          <form>
            <label className="p-2">
              Name:
              <input className="m-1 border border-black rounded" type="text" name="playerName" value={playerName} onChange={(e) => setName(e.target.value && localStorage.setItem("playerName", e.target.value))}/>
            </label>
            <label className="p-2">
              Seasons played:
              <input className="m-1 border border-black w-[120px] rounded" type="number" name="seasonsPlayed" onChange={(e) => setSeasons((168*(e.target.value)) && localStorage.setItem("seasonsPlayed", e.target.value))}/>
            </label>
            <button className="m-1 border border-white w-[100px] bg-teal-400 text-white text-md rounded" type="submit">
              CREATE
            </button>

          </form>
        </div>
        <div className="flex py-10 justify-center items-center space-x-4 text-base">
          <Dropdown />
        </div>

      </div>

      {/*footer*/}
      <div className="bg-cover bg-center h-full flex-row flex-wrap items-center justify-center" style={{ backgroundImage: `url(${footerURL})`, }}>

      </div>
    </div>
  )
}