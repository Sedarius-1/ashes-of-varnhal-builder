import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
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

function App() {
    return (
        <Router basename="/ashes-of-varnhal-builder">
            <Layout>
                <Routes>
                    <Route path="/" element={<BuilderPage />} />
                    <Route path="/factions/:factionName" element={<FactionRules />} />
                    <Route path="/scenarios" element={<ScenariosPage />} />
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="/combat" element={<CombatPage />} />
                    <Route path="/special-rules" element={<SpecialRulesPage />} />
                    <Route path="/fate-cards" element={<FateCardsPage />} />
                    <Route path="/turn-structure" element={<TurnStructurePage />} />
                    <Route path="/game-setup" element={<GameSetupPage />} />
                    <Route path="/keywords" element={<KeywordsPage />} />
                    <Route path="/fate-cards-list" element={<FateCardsListPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
