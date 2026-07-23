import Home from './Pages/Home.jsx'
import AdminView from './Pages/AdminView.jsx'
import Login from './Pages/Login.jsx'
import ProjectDetail from './Pages/ProjectDetails.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop.jsx'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className='w-full min-h-screen flex flex-col'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Home />} />
          <Route path="/info" element={<Home />} />
          <Route path='/contact' element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dynamic Project Detail Preview Route */}
          <Route path="/project/:id" element={<ProjectDetail />} />

          <Route 
            path='/admin' 
            element={
              <ProtectedRoute>
                <AdminView />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;