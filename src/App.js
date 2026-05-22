import TrainerCard from "./components/TrainerCard"
import TrainerBackgroundPicker from "./components/TrainerBackgroundPicker"
import Dropdown from "./components/Dropdown"
import TrainerSpritePicker from "./components/TrainerSpritePicker"
import React from 'react'
import Pokedex from 'pokedex-promise-v2'
import html2canvas from 'html2canvas'
import Alert from "./components/Alert"
import BadgePicker from "./components/BadgePicker"
import backgrounds from "./backgrounds.json"

const P = new Pokedex();
const footerURL = "./img/footer-texture.png";


export default function App() {

  const [playerName, setName] = React.useState(localStorage.getItem("playerName") || "Trainer");
  const [seasonsPlayed, setSeasons] = React.useState(localStorage.getItem("seasonsPlayed") || "0");
  const [backgroundImg, setBackgroundImg] = React.useState(localStorage.getItem("backgroundImg") || "");
  const [backgroundLabel, setBackgroundLabel] = React.useState(
    localStorage.getItem("backgroundLabel") ||
    backgrounds.find(b => b.image === backgroundImg)?.label ||
    ""
  );
  const cardRef = React.useRef(null);

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

  const [badges, setBadges] = React.useState(() => {
    const saved = localStorage.getItem("badges");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [badgeCount, setBadgeCount] = React.useState(0);
  const [money, setMoney] = React.useState(localStorage.getItem("money") || "00.00");
  const [allPokemons, setAllPokemons] = React.useState([]);
  const [trainerImage, setTrainerImage] = React.useState(localStorage.getItem("trainerImage") || 'https://play.pokemonshowdown.com/sprites/trainers/aaron.png');

  React.useEffect(() => {
    const loadPokemons = async () => {
      const cached = localStorage.getItem('allPokemons');
      if (cached) {
        setAllPokemons(JSON.parse(cached));
        return;
      }

      try {
        // Fetch all pokemons (safe upper limit)
        const response = await P.getPokemonsList({ limit: 2000, offset: 0 });
        const formatted = response.results.map((p, index) => ({
          label: p.name,
          value: index
        }));
        localStorage.setItem('allPokemons', JSON.stringify(formatted));
        setAllPokemons(formatted);
      } catch (error) {
        console.error("Failed to load pokemons", error);
      }
    };

    loadPokemons();
  }, []);

  React.useEffect(() => { localStorage.setItem("playerName", playerName); }, [playerName]);
  React.useEffect(() => { localStorage.setItem("seasonsPlayed", seasonsPlayed); }, [seasonsPlayed]);
  React.useEffect(() => { localStorage.setItem("money", money); }, [money]);
  React.useEffect(() => { localStorage.setItem("cardColor1", color); }, [color]);
  React.useEffect(() => { localStorage.setItem("cardColor2", color2); }, [color2]);
  React.useEffect(() => { localStorage.setItem("pokemonImages", JSON.stringify(pokemonImages)); }, [pokemonImages]);
  React.useEffect(() => { localStorage.setItem("badges", JSON.stringify(badges)); }, [badges]);
  React.useEffect(() => { localStorage.setItem("trainerImage", trainerImage); }, [trainerImage]);
  React.useEffect(() => { localStorage.setItem("backgroundImg", backgroundImg); }, [backgroundImg]);
  React.useEffect(() => { localStorage.setItem("backgroundLabel", backgroundLabel); }, [backgroundLabel]);

  const handleBackgroundSelect = (imageUrl) => {
    setBackgroundImg(imageUrl);
    const matched = backgrounds.find(b => b.image === imageUrl);
    setBackgroundLabel(matched?.label || "Personalizado");
  };

  const handlePokemonSelect = (pokemonName) => {
    console.log('App received pokemon:', pokemonName);
    if (!pokemonName) return;
    if (pokemonImages.length >= 6) {
      alert('Máximo de 6 Pokémons permitido!');
      return;
    }

    P.getPokemonByName(pokemonName)
      .then((response) => {
        const image = response.sprites.front_default;
        setPokemonImages(prev => [...prev, image]);
      })
      .catch((error) => {
        console.error('Erro ao buscar Pokémons:', error);
      });
  }

  const addBadge = (badgeUrl, pos) => {
    setBadges(prev => {
      const updated = [...prev]
      updated[pos - 1] = badgeUrl
      return updated
    })
  }

  const removeBadge = (index) => {
    setBadges(prev => {
      if (index === undefined || index === null) {
        return prev.slice(0, -1)
      }
      const updated = [...prev]
      updated[index] = null
      return updated
    })
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

  const [alertMessage, setAlertMessage] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const handleDownloadImage = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          useCORS: true,
          allowTaint: true,
          crossOrigin: 'anonymous',
          scale: 2, // Higher resolution
          backgroundColor: null,
        });

        canvas.toBlob(blob => {
          if (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]).then(() => {
              setAlertMessage("Cartão de treinador copiado para a área de transferência!");
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            }).catch(err => {
              console.error("Failed to copy: ", err);
              alert("Falha ao copiar. Tente novamente.");
            });
          }
        });
      } catch (error) {
        console.error("Error creating image:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
      <Alert message={alertMessage} show={showAlert} />

      {/* Main Content Area */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">

          {/* Left Column: Trainer Card Preview */}
          <div className="lg:sticky lg:top-8 w-full lg:w-auto flex flex-col items-center">
            <h2 className="text-xl font-bold text-slate-700 mb-6 hidden lg:block">Prévia</h2>
            <div className="transform transition-transform hover:scale-105 duration-300 shadow-2xl rounded-lg">
              <div ref={cardRef}>
<TrainerCard
                   playerName={playerName}
                   trainerImage={trainerImage}
                   playTime={seasonsPlayed}
                   money={money}
                   badges={badges}
                   badgeCount={badgeCount}
                   cardColor1={color}
                   cardColor2={color2}
                   pokemonImages={pokemonImages}
                   onRemovePokemon={removePokemon}
                   onRemoveBadge={removeBadge}
                   backgroundImg={backgroundImg}
                 />
              </div>
            </div>
            <button
              onClick={handleDownloadImage}
              className="mt-6 flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-700 transition-colors shadow-lg active:scale-95 transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copiar Cartão
            </button>
            <p className="mt-4 text-sm text-slate-500 text-center max-w-xs">
              Este é como seu cartão de treinador aparecerá para os outros.
            </p>
          </div>

          {/* Right Column: Configuration Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">

              {/* Section: Trainer Info */}
              <section>
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 py-1 px-2 rounded text-sm">01</span> Informações do Treinador
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-slate-600 mb-1">Nome de Treinador</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                      type="text"
                      placeholder="Ash Ketchum"
                      name="playerName"
                      value={playerName}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={47}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-slate-600 mb-1">Poké-Dollars</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                      type="text"
                      placeholder="00.00"
                      maxLength={10}
                      value={money}
                      onChange={(e) => setMoney(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-slate-600 mb-1">Tempo de Jogo (total de temporadas jogadas)</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                      type="text"
                      placeholder="0"
                      maxLength={10}
                      value={seasonsPlayed}
                      onChange={(e) => setSeasons(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* Section: Card Style */}
              <section>
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-600 py-1 px-2 rounded text-sm">02</span> Estilo do Cartão
                </h3>
                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center gap-4">
                    <label htmlFor="color-picker-1" className="text-sm font-medium text-slate-600">Cor Primária</label>
                    <div className="relative overflow-hidden rounded-full w-10 h-10 shadow-sm ring-2 ring-offset-2 ring-gray-200 cursor-pointer hover:scale-110 transition-transform">
                      <input
                        type="color"
                        id="color-picker-1"
                        value={color}
                        onChange={event => setColor(event.target.value)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label htmlFor="color-picker-2" className="text-sm font-medium text-slate-600">Cor Secundária</label>
                    <div className="relative overflow-hidden rounded-full w-10 h-10 shadow-sm ring-2 ring-offset-2 ring-gray-200 cursor-pointer hover:scale-110 transition-transform">
                      <input
                        type="color"
                        id="color-picker-2"
                        value={color2}
                        onChange={event => setColor2(event.target.value)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-none cursor-pointer"
                      />
                    </div>
                  </div>                  

                  {/* Visual background picker cards */}
                  <div className="w-full mt-4">
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Escolher Fundo</label>
                    <TrainerBackgroundPicker
                      backgrounds={backgrounds}
                      selectedLabel={backgroundLabel}
                      onSelect={handleBackgroundSelect}
                    />
                  </div>
                </div>
              </section>

              {/* Section: Pokémon Team */}
              <section>
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 py-1 px-2 rounded text-sm">03</span> Equipe Pokémon
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Slot {num}</label>
                      <Dropdown onSelect={handlePokemonSelect} pos={num} options={allPokemons} />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">Selecione um Pokémon para adicioná-lo ao time. Clique no sprite, no cartão, para removê-lo.</p>
              </section>

              {/* Section: Badges */}
              <section>
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="bg-yellow-100 text-yellow-600 py-1 px-2 rounded text-sm">04</span> Insígnias
                </h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {[1, 2, 3, 4, 5, 6].map((num) => (
                     <div key={num} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors">
                       <BadgePicker
                         pos={num}
                         onSelect={addBadge}
                         disabled={badges[num - 1]}
                       />
                     </div>
                   ))}
                 </div>
              </section>

              {/* Section: Trainer Sprite */}
              <section>
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="bg-green-100 text-green-600 py-1 px-2 rounded text-sm">05</span> Sprite do Treinador
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <TrainerSpritePicker value={trainerImage} onChange={setTrainerImage} />
                </div>
              </section>

            </form>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="h-32 bg-cover bg-center border-t border-gray-200 mt-auto" style={{ backgroundImage: `url(${footerURL})` }}></div>

    </div>
  )
}

