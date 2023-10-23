import { FilterByRegionMenu } from '../Components/FilterByRegionMenu'
import { useEffect, useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { store } from '../States/store'

import { CountryCard } from '../Components/CountryCard'
import { SearchCountryInput } from '../Components/SearchCountryInput'
import { useSearchParams } from 'react-router-dom'

export function Main(): JSX.Element {
  const { darkmode, query, regionFilter, countries } = useSnapshot(store)
  const [ params ,setParams] = useSearchParams()
  const items = Number(params.get("items"))


  const filterQuery = useMemo(() => {
    // FILTER BY REGION FIRST
    let newCountries = countries
    if (regionFilter !== '') {
      newCountries = countries.filter(e => e.region.toLowerCase() === regionFilter.toLowerCase())
    }
    if (query !== '') {
      // FILTER USING THE USER INPUT , IF A REGION IS SPECIFIED WE ONLY FILTER COUNTRIES FROM THAT REGION
      newCountries = newCountries.filter(e => e.name.common.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.name.common.localeCompare(b.name.common)) ?? []
      return newCountries.filter( (_,index) =>  index < items )
    } else return newCountries.filter( (_,index) =>  index < items )
  }, [query, regionFilter , items])
    
  // INFINITY SCROLL
  useEffect(() => {

    const showMoreItems = document.querySelector('#more-items');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const debounce = setTimeout(() => {
            setParams(old => {
              const items = Number(params.get("items")) + 10
              old.set("items", String(items))
              return old
            })
          }, 200)
          return () => clearTimeout(debounce)
        }
      })
    }, observerOptions)

    if (showMoreItems !== null) {
      observer.observe(showMoreItems)
    }
    return () => observer.disconnect()

  }, [params,query])


  return (
    <main className={`flex flex-col gap-6 px-4 pb-12
        ${darkmode ? '' : ' bg-[#FAFAFA] text-black'}`} >
      <div className='flex flex-col gap-4 sm:flex-row justify-between w-full mt-6'>
        <SearchCountryInput></SearchCountryInput>
        <FilterByRegionMenu></FilterByRegionMenu>
      </div>
      {/* COUNTRIES SECTION */}
      <section className='mt-10 grid gap-8   sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:px-10  '>
        {filterQuery?.map((e, index) =>
         <CountryCard key={index} country={e as Countries} index={index} ></CountryCard> )}
      </section>
      {/* SHOW MORE */}
     { filterQuery.length >= items && 
     <div className='h-20' id='more-items' >
      
      </div>}
    </main>

  )
}
