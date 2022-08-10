import Button from './components/Button';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes/routes';
import { useSelector } from 'react-redux';
import Login from '~/pages/Login';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import Home from './pages/Home';
import { useLocation } from 'react-router-dom';
function App() {
    const user = useSelector((state)=>state.user.currentUser);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        if (route.path !== '/') {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } 
                            else if (route.layout === null) {
                                    Layout = Fragment;
                            }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            user?(<Layout>
                                                <Page />
                                            </Layout>):(<Navigate to="/login" />)
                                        }
                                    />
                                );
                            }
                    })}
                    <Route path='/login' element ={!user?<Login/>:<Navigate to='/'/>}/>
                    <Route
                        path="/"
                        element={
                            user ? (
                                <DefaultLayout>
                                    <Home />
                                </DefaultLayout>
                            ) : (
                                <Navigate to="/login" />
                                )
                            }
                    />
                    <Route path="/*" element={!user ? <Navigate to="/login" /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
