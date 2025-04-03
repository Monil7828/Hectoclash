import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import Compete from "./pages/compete/multiplayer";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import SpectatePage from "./pages/spectate/SpectatePage";
import Profile from "./pages/Profile/profile";

function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Routes>
        <Route path='/' element={<OverviewPage />} />
        <Route path='/compete' element={<Compete />} />
        <Route path='/leaderboard' element={<LeaderboardPage />} />
        <Route path='/spectate' element={<SpectatePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}