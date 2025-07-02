import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import BuilderPage from './pages/BuilderPage';
import FactionRules from './pages/FactionRules';
import ScenariosPage from './pages/ScenariosPage';
import CampaignsPage from './pages/CampaignsPage';
import CombatPage from './pages/CombatPage';
import SpecialRulesPage from './pages/SpecialRulesPage';
import FateCardsPage from './pages/FateCardsPage';
import TurnStructurePage from './pages/TurnStructurePage';
import GameSetupPage from './pages/GameSetupPage';
import KeywordsPage from './pages/KeywordsPage';
import FateCardsListPage from './pages/FateCardsListPage';
import LorePage, { LoreFactionsPage, LoreTimelinePage, LoreArtifactsPage, LoreTermsPage, EventsPage, LocationsPage, ArtifactsPage, TermsPage, PeoplePage } from './pages/Home';
import LocationArticle from './components/LocationArticle';
import EventArticle from './components/EventArticle';
import PeopleArticle from './components/PeopleArticle';

// 404 component
const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 mb-8 md:mb-10 tracking-wider text-center">
                    404 - Page Not Found
                </h1>
                <div className="text-center text-slate-300 text-lg md:text-2xl mb-8">
                    The page you're looking for doesn't exist.
                </div>
                <div className="text-center">
                    <a 
                        href="/"
                        className="px-6 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router basename="/">
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<BuilderPage />} />
                    <Route path="/lore" element={<LorePage />} />
                    <Route path="/lore/factions" element={<LoreFactionsPage />} />
                    <Route path="/lore/factions/:factionName" element={<FactionRules />} />
                    <Route path="/lore/locations" element={<LocationsPage />} />
                    <Route path="/lore/locations/:locationName" element={<LocationArticle />} />
                    <Route path="/lore/events" element={<EventsPage />} />
                    <Route path="/lore/events/:eventName" element={<EventArticle />} />
                    <Route path="/lore/artifacts" element={<ArtifactsPage />} />
                    <Route path="/lore/artifacts/:artifactName" element={<LoreArtifactsPage />} />
                    <Route path="/lore/terms" element={<TermsPage />} />
                    <Route path="/lore/terms/:termName" element={<LoreTermsPage />} />
                    <Route path="/lore/people" element={<PeoplePage />} />
                    <Route path="/lore/people/:personName" element={<PeopleArticle />} />
                    <Route path="/lore/characters/:personName" element={<PeopleArticle />} />
                    <Route path="/lore/timeline" element={<LoreTimelinePage />} />
                    <Route path="/scenarios" element={<ScenariosPage />} />
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="/combat" element={<CombatPage />} />
                    <Route path="/special-rules" element={<SpecialRulesPage />} />
                    <Route path="/fate-cards" element={<FateCardsPage />} />
                    <Route path="/turn-structure" element={<TurnStructurePage />} />
                    <Route path="/game-setup" element={<GameSetupPage />} />
                    <Route path="/keywords" element={<KeywordsPage />} />
                    <Route path="/fate-cards-list" element={<FateCardsListPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
