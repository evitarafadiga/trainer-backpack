import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

const BADGES = [
  { label: 'Rock Music Badge', value: 'https://i.imgur.com/5JCBXbU.png' },
  { label: 'Stateside Badge',  value: 'https://i.imgur.com/Rq8VgKX.png' },
  { label: 'Debí Badge',       value: 'https://i.imgur.com/4pBp5BA.png' },
  { label: 'Fate Badge',       value: 'https://i.imgur.com/s34mw1r.png' },
  { label: 'Diet Badge',       value: 'https://i.imgur.com/mpcnOKU.png' },
  { label: 'Cure Badge',       value: 'https://i.imgur.com/39JtZZf.png' },
]

export function BadgePicker({ onSelect, pos, disabled }) {
  const handleSelect = (e) => {
    if (onSelect && e) {
      const selected = Array.isArray(e) ? e[0] : e
      if (selected && selected.value) {
        onSelect(selected.value, pos)
      }
    }
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      {pos && <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Slot {pos}</span>}
      <SimpleDropdown
        options={BADGES}
        clearable
        searchable
        placeholder="Selecione uma insígnia"
        configs={{ position: { y: 'top', x: 'center' } }}
        onChange={handleSelect}
        disabled={disabled}
      />
    </div>
  )
}

export default BadgePicker
