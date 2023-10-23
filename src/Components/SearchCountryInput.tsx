import { useSnapshot } from 'valtio'
import { store } from '../States/store'
// ICONS
import { AiOutlineSearch } from 'react-icons/ai'

export function SearchCountryInput(): JSX.Element {
  const { query, darkmode } = useSnapshot(store)

  return (
    <div className='relative w-full max-w-[400px]'>
      <input data-id="search-input" value={query} onChange={(e) => { store.query = e.target.value }}
        className={`outline-none w-full py-4 pl-10   rounded-lg transition-shadow duration-300
          ${darkmode ? ' bg-[#2B3844]  hover:shadow-[0px_0px_7px_2px_#afafaf] focus:shadow-[0px_0px_7px_2px_#afafaf] ' : ' bg-white  hover:shadow-[0px_0px_7px_2px_#202C36] focus:shadow-[0px_0px_7px_2px_#202C36] '}`}
        placeholder="Search for a country...">
      </input>
      <AiOutlineSearch className="absolute w-6 h-6 inset-0 my-auto ml-2"></AiOutlineSearch>
    </div>

  )
}
