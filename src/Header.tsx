import youScanLogo from './assets/favicon.svg';

function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
            <div className="container mx-auto px-4 py-3 flex justify-center items-center">
                <a href="https://youscan.io" target="_blank" rel="noopener noreferrer" className="mr-4">
                    <img src={youScanLogo} className="h-8 w-auto" alt="Youscan logo" />
                </a>
                <h1 className="text-2xl font-bold text-gray-800">Brand Index</h1>
            </div>
        </header>
    );
}

export default Header;