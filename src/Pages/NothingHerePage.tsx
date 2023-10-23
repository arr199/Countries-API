import { NavLink } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { store } from '../States/store'

export function NothingHerePage(): JSX.Element {
  const { darkmode } = useSnapshot(store)
  return (
    <main className={` flex items-center h-screen flex-col mt-20 gap-3 
        ${darkmode ? ' text-white ' : ' text-black '}`}>
      <img width={'200px'} src='/favicon/icons8-world-color-96.png' alt='logo'></img>
      <h1 className="text-3xl font-bold">Nothing Here</h1>
      <NavLink className={`  rounded-3xl  px-6 py-2  font-bold mt-4
                ${darkmode
          ? ' bg-[#2B3844] shadow-[0px_0px_7px_0px_#202C36]   hover:shadow-[0px_0px_7px_2px_#afafaf]  '
          : ' bg-white shadow-[0px_0px_7px_0px_#afafaf]  hover:shadow-[0px_0px_7px_2px_#202C36]  '}`}
        to={'/'}>Go back
      </NavLink>
    </main>
  )
}
