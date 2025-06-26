import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import BuilderPage from './pages/BuilderPage';
import FactionRules from './pages/FactionRules'; // create this as shown before
import type { Warband } from './types/warband';
import ScenariosPage from './pages/ScenariosPage';
import CampaignsPage from './pages/CampaignsPage';
import CombatPage from './pages/CombatPage';
import SpecialRulesPage from './pages/SpecialRulesPage';

function App() {
    const [warband, setWarband] = useState<Warband>({
        name: 'Untitled',
        faction: null,
        units: [],
    });

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={<BuilderPage warband={warband} setWarband={setWarband} />}
                    />
                    <Route path="/factions/:factionName" element={<FactionRules />} />
                    <Route path="/scenarios" element={<ScenariosPage />} />
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="/combat" element={<CombatPage />} />
                    <Route path="/special-rules" element={<SpecialRulesPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
