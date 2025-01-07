import { Button } from 'react-bootstrap';
import "./styles.css";
import logo from '../../assets/icons/logo.png'
import { useNavigate } from 'react-router-dom';

export default function HeaderComponent() {
  const navigate = useNavigate();
  const moveToDashboard =()=>{
    navigate('/');
  }
  
  return (
    <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
       <img
        src={logo}
        className='img-fluid rounded logo-align'
        alt='example'
      />
      <div className="fw-bold app-name"  onClick={moveToDashboard}>bp M&C Operations</div>
      <span className="user-icon fw-bold"><i className="bi bi-person"></i></span>
    </header>
  );
}
