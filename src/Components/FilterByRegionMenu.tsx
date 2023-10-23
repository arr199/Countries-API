import { useEffect, useState } from 'react'
import { API } from '../Utils/API'
import { useSnapshot } from 'valtio'
import { store } from '../States/store'
// ICONS
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'
import ani from '../assets/motions'

export function FilterByRegionMenu(): JSX.Element {
  const [open, setOpen] = useState(false)
  const snap = useSnapshot(store)
  const { darkmode } = snap
  function handleOpenClick(): void {
    setOpen(!open)
  }

  // SET REGION FILTER DEPENDING ON THE CLICKED BUTTON
  function handleSelectRegion(e: string): void {
    store.regionFilter = e
    setOpen(false)
  }

  // SET THE REGION FILTER TO EMPTY STRING WHEN WE CLICK THE ALL REGIONS BUTTON
  function handleAllRegionsClick(): void {
    setOpen(false)
    store.regionFilter = ''
  }
  
  // CLOSE THE MENU WHEN CLICK OUTSIDE OF IT
  useEffect(() => {
    const filterByRegionMenu = document.querySelector('#filter-by-region-menu')
    function handleClickOutside(e: MouseEvent): void {
      const target = e.target as HTMLElement
      if (filterByRegionMenu !== null && !filterByRegionMenu?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => { document.removeEventListener('mousedown', handleClickOutside) }
  }, [])

  return (
    <>
      <div id='filter-by-region-menu' className='relative w-[50%] flex sm:w-max  sm:min-w-[300px] '>
        {/* FILTER BY REGION BUTTON */}
        <button onClick={handleOpenClick}
          className={`sm:ml-auto flex items-center justify-between whitespace-nowrap text-start py-4 self-start px-4 w-full  rounded-lg transition-shadow duration-300
            ${darkmode ? ' bg-[#2B3844]    hover:shadow-[0px_0px_7px_2px_#afafaf]' : ' bg-white text-black hover:shadow-[0px_0px_7px_2px_#202C36]'} 
            ${open && darkmode ? 'shadow-[0px_0px_7px_2px_#afafaf]' : ''}
            ${open && !darkmode ? 'shadow-[0px_0px_7px_2px_#202C36]' : ''}`}>

          {snap?.regionFilter !== '' ? snap.regionFilter : 'Filter by Region'}
          {open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </button>
        {/* ABSOLUTE CONTAINER */}
        <AnimatePresence>
          {open &&
            <motion.div className={`flex flex-col gap-2 p-4 sm:ml-auto w-full absolute mt-16 rounded-lg items-start 
             ${darkmode ? ' bg-[#2B3844] ' : ' bg-white '}`}
              {...ani.scaleAnimationCenterExitCenter()} >
              {API.REGIONS.map((e, index) =>
                <motion.button className='hover:font-bold ' onClick={() => { handleSelectRegion(e) }}
                  key={e} {...ani.fadeAnimation(index / 10)} >{e}</motion.button>)}
              <motion.button className='hover:font-bold' onClick={handleAllRegionsClick} {...ani.fadeAnimation(0.5)}>All Regions</motion.button>
            </motion.div>}
        </AnimatePresence>
      </div>
    </>
  )
}
