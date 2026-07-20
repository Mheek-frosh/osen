import { useLocation, useNavigate } from 'react-router-dom';

export default function BackButton(){
  const location=useLocation();
  const navigate=useNavigate();

  if(location.pathname==='/')return null;

  const goBack=()=>{
    const historyIndex=window.history.state?.idx;
    if(typeof historyIndex==='number'&&historyIndex>0)navigate(-1);
    else navigate('/');
  };

  return <div className="page-back-bar">
    <button type="button" onClick={goBack} aria-label="Go back to the previous page">
      <span aria-hidden="true">←</span> Back
    </button>
  </div>;
}
