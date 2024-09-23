import youScanLogo from './assets/logo.svg'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <a href="https://youscan.io" target="_blank">
                <img src={youScanLogo} className="logo" alt="Youscan logo" />
            </a>
            <h1 className="title">Brand Index</h1>
        </div>
    )
}

export default Header