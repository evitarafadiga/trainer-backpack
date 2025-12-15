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
            response.results.forEach(results => {
                let temp = {};
                temp.label = results.name;
                temp.value = dex.length;
                if (dex.length < 6) {
                    dex.push(temp);
                }
            })
        })
};

NationalDex();

export function Dropdown({ onSelect, pos }) {


    const handleSelect = (e) => {
        console.log('Dropdown selected:', e);
        if (onSelect && e) {
            const selected = Array.isArray(e) ? e[0] : e;
            if (selected && selected.label) {
                onSelect(selected.label);
            }
        }
    }


    return (
        <div className='flex'>
            <div className='justify-center text-sm'>
                {pos && pos == 1 && <span>Inicial:</span>}
                {pos && pos == 2 && <span>Segundo:</span>}
                {pos && pos == 3 && <span>Terceiro:</span>}
                {pos && pos == 4 && <span>Quarto:</span>}
                {pos && pos == 5 && <span>Quinto:</span>}
                {pos && pos == 6 && <span>Sexto:</span>}
                <SimpleDropdown
                    options={dex}
                    clearable
                    searchable
                    configs={
                        { position: { y: 'bottom', x: 'center' } }
                    }
                    onChange={handleSelect}
                />
            </div>
        </div>
    );
}

export default Dropdown;