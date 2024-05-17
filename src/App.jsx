import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import News1 from './Pages/News';
import List from './Pages/Health';
import Review from './Pages/Review';
import GNews from './Pages/Gnews';
import WNews from './Pages/Weather';
import HideAppBar from './NavBar';
import { useState } from 'react';
import NewsVideos from './Pages/BNews';
import Sports from './Pages/Sports';
import NewsIndia from './Pages/India';
import Scores from './Pages/Score';
import LiveNews from './Pages/LiveNews';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Router>
      <HideAppBar/>  
          <Routes>
            <Route exact path="/" element={<News1 />}/>
            <Route exact path="/Sc" element={<Scores/>}/>
            <Route exact path="/India" element={<NewsIndia/>}/>
            <Route exact path="/Health" element={<List/>}/>
            <Route exact path="/Top" element={<Review/>}/>
            <Route exact path="/Usa" element={<GNews/>}/>
            <Route exact path="/Weather" element={<WNews/>}/>
            <Route exact path="/Wnews" element={<NewsVideos/>}/>
            <Route exact path="/Sports" element={<Sports/>}/>
            <Route exact path="/Live" element={<LiveNews/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
