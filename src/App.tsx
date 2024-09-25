import Header from './Header'
import './App.css'
import BrandIndex from "./BrandIndex.tsx";
import {useState} from "react";
import { Menu } from 'lucide-react';
import IndustrySidePanel from "./IndustrySidePanel.tsx";

function App() {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const toggleSidePanel = () => {
        setIsSidePanelOpen(!isSidePanelOpen);
    };

    return (
        <>
            <Header />
            <div className="relative">
                <button
                    onClick={toggleSidePanel}
                    className="fixed top-20 left-4 z-50 p-2 text-gray-700 rounded-md hover:bg-gray-100 transition duration-300"
                >
                    <Menu size={20} />
                </button>
                <IndustrySidePanel isOpen={isSidePanelOpen} onClose={() => setIsSidePanelOpen(false)} />
                <BrandIndex />
            </div>
        </>
    );
}

export default App