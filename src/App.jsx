import { useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { PATH } from './routes/path'
import HomeModule from './modules/home'
import MovieLayout from './layouts/MovieLayout'
import NotFound from './modules/not-found'
import Details from './modules/details'
import Booking from './modules/booking'
import SignIn from './modules/auth/Signin/SignIn'
import SignUp from './modules/auth/Signup/SignUp'
import { UserProvider } from './contexts/UserContext/UserContext'
function App() {
  const props = useParams()
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.HOME} element={<MovieLayout />}>
            <Route index element={<HomeModule />} />
            <Route path="movie/:movieId" element={<Details />} />
            <Route
              path="purchase/:showTimesID"
              element={<Booking props={props} />}
            />
            <Route path={PATH.SIGN_IN} element={<SignIn />} />
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
