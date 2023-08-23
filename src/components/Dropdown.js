import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

const interval = {
    limit: 10,
    offset: 0
}

const dex = [];

function NationalDex() {

    P.getPokemonsList(interval)
        .then((response) => {
            response.results.map(results => {
                let temp = [];
                temp.label = results.name;
                temp.value = dex.length;
                dex.push(temp);
                return(dex)
            })
        })
};

NationalDex();

export function Dropdown() {

    return (
        <div className='flex'>
            <div className='justify-center text-sm'>
                Pokémon:
                <SimpleDropdown
                    options={dex}
                    clearable
                    searchable
                    configs={
                        { position: { y: 'bottom', x: 'center' } }
                    }
                />
            </div>
        </div>
    );
}

export default Dropdown;