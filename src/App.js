import TrainerCard from "./components/TrainerCard"
import Dropdown from "./components/Dropdown";
import React from 'react';
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();
const footerURL = "./img/footer-texture.png";


export default function App() {

  const [playerName, setName] = React.useState(localStorage.getItem("playerName") || "Trainer");
  const [seasonsPlayed, setSeasons] = React.useState(localStorage.getItem("seasonsPlayed") || "000:00");

  const [color, setColor] = React.useState(localStorage.getItem("cardColor1") || '#0a4b64ff');
  const [color2, setColor2] = React.useState(localStorage.getItem("cardColor2") || '#407971ff');
  const [pokemonImages, setPokemonImages] = React.useState(() => {
    const saved = localStorage.getItem("pokemonImages");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [badges, setBadges] = React.useState([]);
  const [badgeCount, setBadgeCount] = React.useState(0);
  const [money, setMoney] = React.useState(0);

  React.useEffect(() => { localStorage.setItem("playerName", playerName); }, [playerName]);
  React.useEffect(() => { localStorage.setItem("seasonsPlayed", seasonsPlayed); }, [seasonsPlayed]);
  React.useEffect(() => { localStorage.setItem("cardColor1", color); }, [color]);
  React.useEffect(() => { localStorage.setItem("cardColor2", color2); }, [color2]);
  React.useEffect(() => { localStorage.setItem("pokemonImages", JSON.stringify(pokemonImages)); }, [pokemonImages]);

  const handlePokemonSelect = (pokemonName) => {
    console.log('App received pokemon:', pokemonName);
    if (!pokemonName) return;
    if (pokemonImages.length >= 6) {
      alert('Maximum of 6 Pokemon allowed!');
      return;
    }
    
    P.getPokemonByName(pokemonName)
      .then((response) => {
        const image = response.sprites.front_default;
        console.log('Fetching image:', image);
        setPokemonImages(prev => [...prev, image]);
      })
      .catch((error) => {
        console.error('Error fetching pokemon:', error);
      });
  }

  const removePokemon = (index) => {
    setPokemonImages(prev => {
      if (index === undefined || index === null) {
        return prev.slice(0, -1);
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  function getBadgeCount() {
    P.getBadgeCount()
      .then((response) => {
        setBadgeCount(response.count);
      })
  }

  function getMoney() {
    P.getMoney()
      .then((response) => {
        setMoney(response.money);
      })
  }

  return (
    <div className="flex flex-col h-screen justify-between">

      {/*header*/}
      <div className="bg-gradient-to-b from-sky-300 to-transparent ">
        <div className="flex py-10 justify-center items-center space-x-4 text-base">
          <TrainerCard
            playerName={playerName}
            playTime={seasonsPlayed}
            money={money}
            badges={badges}
            badgeCount={badgeCount}
            cardColor1={color}
            cardColor2={color2}
            pokemonImages={pokemonImages}
            onRemovePokemon={removePokemon}
          />
        </div>
        <div className="flex flex-col justify-center items-center space-x-4 text-base">
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <label className="p-2">
              Nome:
              <input className="m-1 border border-black rounded" type="text" name="playerName" value={playerName} onChange={(e) => {
                setName(e.target.value);
              }} />
            </label>
            <label className="p-2">
              Temporadas jogadas:
              <input className="m-1 border border-black rounded" type="text" value={seasonsPlayed} onChange={(e) => {
                setSeasons(e.target.value);
              }} />
            </label>

            <div className="flex flex-row w-[300px] justify-center items-center space-x-4 p-2">

              <label htmlFor="color-picker-1">
                Cor 1:
              </label>
              <input
                type="color"
                id="color-picker-1"
                value={color}
                onChange={event => {
                  setColor(event.target.value);
                }}
                className="m-1 border border-black rounded rounded-full w-[50px] h-[50px]"
              />

              <label htmlFor="color-picker-2">
                Cor 2:
              </label>
              <input
                type="color"
                id="color-picker-2"
                value={color2}
                onChange={event => {
                  setColor2(event.target.value);
                }}
                className="m-1 border border-black rounded rounded-full w-[50px] h-[50px]"
              />
            </div>

          </form>
        </div>
        <div className="flex flex-col justify-center items-center column-2">
          <div className="flex flex-col">
            Pokémon:
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Dropdown onSelect={handlePokemonSelect} pos={1} />
            <Dropdown onSelect={handlePokemonSelect} pos={2} />
            <Dropdown onSelect={handlePokemonSelect} pos={3} />
            <Dropdown onSelect={handlePokemonSelect} pos={4} />
            <Dropdown onSelect={handlePokemonSelect} pos={5} />
            <Dropdown onSelect={handlePokemonSelect} pos={6} />
          </div>
        </div>

      </div>

      {/*footer*/}
      <div className="bg-cover h-full" style={{ backgroundImage: `url(${footerURL})`, }}>

      </div>
    </div >
  )
}

