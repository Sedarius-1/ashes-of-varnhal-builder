import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type {Warband} from '../types/warband';

const Layout = ({
                    children,
                }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col h-screen min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Gothic background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none z-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
                }}></div>
            </div>
            <Topbar />
            <div className="flex flex-1 overflow-hidden relative z-10">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
