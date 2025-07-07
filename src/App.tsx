import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import FactionRules from './pages/FactionRules';
import ScenariosPage from './pages/ScenariosPage';
import CampaignsPage from './pages/CampaignsPage';
import SpecialRulesPage from './pages/SpecialRulesPage';
import FateCardsPage from './pages/FateCardsPage';
import GameSetupPage from './pages/GameSetupPage';
import KeywordsPage from './pages/KeywordsPage';
import FateCardsListPage from './pages/FateCardsListPage';
import LorePage, { LoreFactionsPage, LoreTimelinePage, LoreArtifactsPage, LoreTermsPage, EventsPage, LocationsPage, ArtifactsPage, TermsPage, PeoplePage } from './pages/Home';
import LocationArticle from './components/LocationArticle';
import EventArticle from './components/EventArticle';
import PeopleArticle from './components/PeopleArticle';
import CampaignRulesPage from './pages/CampaignRulesPage';
import TurnAndActionsPage from './pages/TurnAndActionsPage';
import FactionRulesPage from './pages/FactionRulesPage';
import { AuthProvider } from './contexts/AuthContext';



function App() {
    return (
        <AuthProvider>
            <Router basename={process.env.NODE_ENV === 'production' ? '/ashes-of-varnhal-builder' : '/'}>
                <ScrollToTop />
                <Layout>
                    <Routes>
                        <Route path="/" element={<CampaignsPage />} />
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
                        <Route path="/campaign-rules" element={<CampaignRulesPage />} />
                        <Route path="/special-rules" element={<SpecialRulesPage />} />
                        <Route path="/fate-cards" element={<FateCardsPage />} />
                        <Route path="/game-setup" element={<GameSetupPage />} />
                        <Route path="/keywords" element={<KeywordsPage />} />
                        <Route path="/fate-cards-list" element={<FateCardsListPage />} />
                        <Route path="/turn-actions" element={<TurnAndActionsPage />} />
                        <Route path="/factions/:factionName" element={<FactionRulesPage />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
