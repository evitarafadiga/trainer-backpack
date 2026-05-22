import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

export function Dropdown({ onSelect, pos, options }) {


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
                {pos && pos == 1 && <span>Pokémon Inicial</span>}

                <SimpleDropdown
                    options={options || []}
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