
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { ChekingAuth } from '../ui'
import { useCheckAuth } from '../hooks'


export const AppRouter = () => {
  const {status} = useCheckAuth();

  if(status === 'checking'){
   return <ChekingAuth/>
  }
  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path='/*' element={<JournalRoutes/>}/>
        : <Route path='/auth/*' element={<AuthRoutes/>}/>
      }
        <Route path='/*' element={<Navigate to='/auth/login' />}/>

        {/* Login y Registro */}
        {/* <Route path='/auth/*' element={<AuthRoutes/>}/> */}

        {/* Diario o Journal App */}
        {/*  <Route path='/*' element={<JournalRoutes/>}/> */}

    </Routes>
  )
}
