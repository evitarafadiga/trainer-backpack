import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

const interval = {
    limit: 1010,
    offset: 0
}

P.getPokemonsList(interval)
    .then((response) => {
      console.log(response);
    })

const data = [
    { label: 'Ex opt 1', value: 1 },
    { label: 'Ex opt 2', value: 2 },
    { label: 'Ex opt 3', value: 3 },
    { label: 'Ex opt 4', value: 4 },
]

export function Dropdown() {
    return (
        <div className='flex'>
            <div className='justify-center text-sm'>

                Pokémon:
                <SimpleDropdown
                    options={data}
                    clearable
                    searchable
                    configs={
                        { position: { y: 'bottom', x: 'center' } }
                    }
                />

            </div>
            <div className='w-10'></div>
            <div className='justify-center text-sm'>
                Badge:
                <SimpleDropdown
                    options={data}
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