import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import CityList from "./components/CityList.jsx";
import City from "./components/City.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx"
import {CityProvider} from "./Contexts/CityContext.jsx";
import {UserAuthProvider} from "./Contexts/UserAuthContext.jsx";
import ProtectRouter from "./Pages/ProtectRouter.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const Homepage = lazy(() => import("./Pages/Homepage/Homepage.jsx"));
const Product = lazy(() => import("./Pages/Product/Product.jsx"));
const Pricing = lazy(() => import("./Pages/Pricing/Pricing.jsx"));
const Login = lazy(() => import("./Pages/Login/Login.jsx"));
const AppLayout = lazy(() => import("./Pages/AppLayout/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound.jsx"));

export default function App (){
    return (
        <div className="app">
            <CityProvider>
                <UserAuthProvider>
                    <BrowserRouter>
                        <Suspense fallback={<SpinnerFullPage />}>
                            <Routes>
                                <Route index element={<Homepage />}/>
                                <Route path="product" element={<Product/>}/>
                                <Route path="pricing" element={<Pricing />}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path='app' element={<ProtectRouter><AppLayout /></ProtectRouter>}>
                                        <Route index element={<Navigate to="cities"/>} />
                                        <Route path='cities' element={<CityList />}/>
                                        <Route path='cities/:id' element={<City />}/>
                                        <Route path='countries' element={<CountryList /> }/>
                                        <Route path='form' element={<Form />}/>
                                </Route>

                                <Route path="*" element={<PageNotFound />}/>
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </UserAuthProvider>
            </CityProvider>
        </div>
    )
}