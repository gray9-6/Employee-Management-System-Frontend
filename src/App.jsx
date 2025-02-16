import { useState } from 'react'
import HelloWorld from './helloWorld'
// imported bootstrap css here becoz App is the entry point of the Application
import 'bootstrap/dist/css/bootstrap.min.css'  
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  return (
      <BrowserRouter>
        {/* <HelloWorld/> */}
        <HeaderComponent/>

        <Routes>
          {/* e.g :- http://localhost:3000 */}
          <Route path='/' element={<ListEmployeeComponent/>}></Route>

          {/* e.g :- http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>

          {/* e.g :- http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>

          {/* e.g :- http://localhost:3000/edit-employee */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
        </Routes>

        <FooterComponent/>
      </BrowserRouter>
  )
}

export default App
