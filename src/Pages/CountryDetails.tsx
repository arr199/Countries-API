import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { store } from '../States/store'
// ICONS
import { BiLeftArrowAlt } from 'react-icons/bi'

export function CountryDetails(): JSX.Element {
  const { countryName } = useParams()
  const snap = useSnapshot(store)
  const { darkmode } = snap
  const [country] = snap.countries.filter(e => e.name.common.toLowerCase() === countryName?.toLowerCase()) as Countries[]
  const navigate = useNavigate()
  const location = useLocation()
  const params = location?.state?.params || "items=10"
  const nativeNameKeys = Object.keys(country?.name?.nativeName)[0] as keyof NativeName
  const currenciesArray = Object.keys(country?.currencies)

  function getCountryFromInitials(initials: string): void {
    // GET THE COUNTRY FROM THE SPECIFIC CODE
    const [selectedCountry] = snap.countries.filter(country => country.cioc === initials || country.cca3 === initials)
    // IF THERE IS NO COUNTRY WITH THIS CODE RETURN EMPTY STRING
    const name = selectedCountry !== undefined ? selectedCountry?.name?.common : ''
    if (name !== '') navigate(`/${name}` ,{ state : { params : params } })
  }
  return (
    <>
      <div className={`lg:px-16 px-4 flex-col flex  gap-6 pb-4 
        ${darkmode ? '' : ' text-black '}`}>
        {/* BACK BUTTON */}
        <Link to={`/?${params}`} replace
          className={`flex items-center py-2 px-6 mb-10  w-max mt-10 rounded transition-shadow duration-300
            ${darkmode ? ' bg-[#2B3844] shadow-[0px_0px_7px_0px_#202C36]   hover:shadow-[0px_0px_7px_2px_#afafaf]  ' : ' bg-white shadow-[0px_0px_7px_0px_#afafaf]  hover:shadow-[0px_0px_7px_2px_#202C36]  '}`}>
          <BiLeftArrowAlt className="w-6 h-6" />
          Back
        </Link>
        <div className='lg:flex  gap-10 items-center ' >
          {/* IMAGE */}
     
             <img  className='max-w-[550px] w-full' src={country?.flags?.svg} alt='a country flag' loading='lazy' ></img>
     
          {/* COUNTRY NAME */}
          <div className='lg:flex lg:flex-col xl:ml-40'>
            {/* INFO */}
            <div className='lg:flex lg:gap-10 items-center mt-6'>
              <ul className=' [&>li>span]:opacity-75 flex flex-col gap-2 '>
                <li><h1 className='text-[1.375rem] font-bold mb-4'>{country.name.common}</h1></li>
                <li>Native Name: <span >{country.name.nativeName[nativeNameKeys]?.official}</span></li>
                <li>Population: <span>{country.population.toLocaleString()}</span></li>
                <li>Region: <span>{country.region}</span></li>
                <li>Sub Region: <span>{country.subregion}</span></li>
                <li>Capital: <span>{country.capital}</span></li>
              </ul>
              <ul className=' [&>li>span]:opacity-75 flex flex-col gap-2 mt-8 xl:ml-20'>
                <li>Top Level Domain: <span>{country.tld}</span></li>
                <li>Currencies: <span> {currenciesArray?.map((e, index) => <span key={e}>{country.currencies[e as keyof object].name}{index + 1 === currenciesArray.length ? '' : ','} </span>)}    </span></li>
                <li>Languages: <span>{Object.values(country.languages).join(', ')}</span></li>
              </ul>
            </div>
            {/* BORDERS */}
            <div className='flex flex-col lg:flex-row lg:items-center flex-wrap gap-4 mt-14 max-w-[500px] '>
              <h1 className='text-[18px]  font-bold '>Border Countries</h1>
              <div className='flex items-center gap-2 flex-wrap '>
                {country?.borders?.map(initials =>
                  <button onClick={() => { getCountryFromInitials(initials) }}
                    className={`shadow-[0px_0px_7px_0px_rgba(17, 21, 23, 0.25)] flex items-center 
                    py-1 px-8  w-max  rounded   transition-shadow duration-300
                    ${darkmode ? ' bg-[#2B3844] shadow-[0px_0px_7px_0px_#202C36]  hover:shadow-[0px_0px_7px_2px_#afafaf]  ' : ' bg-white shadow-[0px_0px_7px_0px_#afafaf] hover:shadow-[0px_0px_7px_2px_#202C36]  '}`}
                    key={initials}>{initials}</button>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      </>
  )
}
