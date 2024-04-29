import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';

import Navbar from './components/Navbar';
import { SavedRecipes } from './pages/SavedRecipe';

function App() {
  return (
    <div className="App">

      <Router>

      <Navbar />

        <Routes>
         
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/createrecipe' element={<CreateRecipe />} />
          <Route path='/savedrecipe' element={<SavedRecipes />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
