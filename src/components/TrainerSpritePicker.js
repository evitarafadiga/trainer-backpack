import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'
import TRAINERS from '../trainers.json'

export default function TrainerSpritePicker({ value, onChange }) {

  const handleSelect = (e) => {
    if (onChange && e) {
      const selected = Array.isArray(e) ? e[0] : e
      if (selected) onChange(selected.value)
    }
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Trainer Sprite</label>
      <SimpleDropdown
        options={TRAINERS}
        clearable
        searchable
        placeholder="Selecione um treinador"
        configs={{ position: { y: 'top', x: 'center' } }}
        onChange={handleSelect}
      />
      {value && (
        <img src={value} alt="Trainer sprite" className="w-10 h-10 object-contain rounded bg-gray-100" crossOrigin="anonymous" />
      )}
    </div>
  )
}
