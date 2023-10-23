import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout, { getCountriesDataLoader } from './Layout/_MainLayout'
import { CountryDetails } from './Pages/CountryDetails'
import { Main } from './Layout/Main'
import { WrongCountryNamePage } from './Pages/WrongCountryNamePage'
import { NothingHerePage } from './Pages/NothingHerePage'

const router = createBrowserRouter(createRoutesFromElements(

    <Route path='/' element={<Layout></Layout>} loader={getCountriesDataLoader}>
            <Route index element={<Main></Main>} ></Route>
            <Route path='/:countryName' errorElement={<WrongCountryNamePage></WrongCountryNamePage>} element={<CountryDetails></CountryDetails>} >
            </Route>
            <Route path='*' element={<NothingHerePage></NothingHerePage>}></Route>
    </Route>

))

export function Router (): JSX.Element {
  return <RouterProvider router={router}></RouterProvider>
}
