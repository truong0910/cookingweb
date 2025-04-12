import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Abouus from './pages/Abouus'
import Recipes from './pages/Recipes'
import Occasions from './pages/Occasions'
import Ingredients from './pages/Ingredients'
import RecipesDetail from './pages/RecipesDetail'
import CookProvider from './context/CookContext'

function App() {
  return (
    <Router>
      <CookProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Abouus />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipe/:id" element={<RecipesDetail />} />
        </Routes>
        <Footer />
      </CookProvider>
    </Router>
  )
}

export default App