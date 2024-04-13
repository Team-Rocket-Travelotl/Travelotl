import { Link } from 'react-router-dom';

const Header = () => {

return (
    <div className="header-container">
        <div>
            <h1>Travelotl</h1>
        </div>
        <div>
            <Link to='/about'>About</Link>
        </div>
        <div>
            <Link to='/login'>Login</Link>
        </div>  
    </div>
  )
}

export default Header;