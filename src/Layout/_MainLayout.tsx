import { Header } from './Header'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { store } from '../States/store'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export async function getCountriesDataLoader(): Promise<Countries[]> {
  // GETTING THE COUNTRY DATA FROM THE API
  async function getCountriesData(): Promise<Countries[]> {
    const res = await fetch('https://restcountries.com/v3.1/all')
    if (!res.ok){
      throw new Error("Bad response from the server")
    }
    const data = await res.json()
    return data
  }
  // IF THE DATA IS UNDEFINED  RETURN AN EMPTY ARRAY 
  const data = await getCountriesData()
  .catch(err => { console.error('Error fetching with loader getCountriesData', err) }) as Countries[]
   return data || []
}

function MainLayout(): JSX.Element {
  const data = useLoaderData() as Countries[]
  store.countries = data
  const { darkmode } = useSnapshot(store)
  const [_, setParams] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
  
     // CHANGE THE BODY BG COLOR DEPENDING ON THE DARK-MODE
    if (darkmode) {
      document.body.style.background = '#202C36'
    } else {
      document.body.style.background = '#FAFAFA'
    }
  }, [darkmode])

  useEffect( () => {
      // SET THE ITEMS PARAMS TO 10 
     if (location.pathname === "/") {
       window.scrollTo({top :Infinity , behavior : "instant"})
       setParams(old => {
           old.delete("items")
           old.set("items","10")
           return old
       })

     } 
  } , [])
  return (
    <>
        <Header></Header>
      { store.countries.length > 0 
      ? <Outlet></Outlet>
      : 
      // ALERT THE USER SOMETHING IS WRONG
      <div className={` h-screen flex items-center flex-col mt-20  gap-10 ${darkmode ? ' text-white ' : ' text-black '}`}>
         <img width={'200px'} src='/favicon/icons8-world-color-96.png' alt='logo'></img>
        <h1 className='font-bold  text-3xl '>Failed to retrieve the countries data.</h1>  
      </div>}
    </>
  )
}

export default MainLayout
