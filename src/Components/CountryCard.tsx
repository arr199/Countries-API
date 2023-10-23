import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { store } from '../States/store'

export function CountryCard({ country, index }: { country: Countries, index: number }): JSX.Element {
  const { darkmode } = useSnapshot(store)
  const [ params ] = useSearchParams()
  return (
    <motion.div data-id="country-card" className={` border-[1px] ${darkmode ? ' border-[#474747] ' : ' border-[#a8a8a8] '}`} key={index} whileHover={{ boxShadow: `0px 0px 10px 2px ${darkmode ? 'white' : 'black'}` }}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}  >
      <Link state={{ params: params.toString() }} to={country.name.common}
        className={`h-full flex flex-col gap-6  pb-8  rounded-lg  
           ${darkmode ? ' bg-[#2B3844] ' : ' bg-white '}`} >
        {/* FLAG IMAGE */}
        <img className='h-40' src={country.flags.png} alt='a country flag' loading='lazy'></img>
        <h1 className='px-4 text-[18px] font-extrabold'>{country.name.common}</h1>
        <ul className={'px-4 flex flex-col gap-'}>

          <li>Population: <span className='opacity-75 '>{country.population.toLocaleString()}</span> </li>
          <li>Region: <span className='opacity-75'>{country.region}</span> </li>
          <li>Capital: <span className='opacity-75'>{country.capital}</span></li>
        </ul>
      </Link>
    </motion.div>
  )
}
