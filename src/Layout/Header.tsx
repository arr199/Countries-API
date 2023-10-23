import { BsFillMoonFill, BsMoon } from 'react-icons/bs'
import { useSnapshot } from 'valtio'
import { store } from '../States/store'

export function Header(): JSX.Element {
  const { darkmode } = useSnapshot(store)

  return (
    <header className={`flex items-center justify-between px-4 py-8  
        ${darkmode ? ' bg-[#2B3844]  ' : ' bg-white text-black '}`} >
      <h1 className=' font-extrabold '>Where in the world? </h1>
      {/* DARK-MODE BUTTON */}
      <button onClick={() => {
        store.darkmode = !darkmode
      }}
        className='flex items-center gap-2 font-semibold'>{darkmode ? <BsFillMoonFill /> : <BsMoon />}Dark Mode</button>
    </header>

  )
}
