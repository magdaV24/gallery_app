import { Button } from "@mui/material";
import Photo from "../../components/Photo";
import Quote from "../../components/Quote";
import { useState } from "react";
import Login from "../../forms/Login";
import Register from "../../forms/Register";
import { useNavigate } from "react-router-dom";

interface Props {
  source: string;
  quote: string;
  credit: string;
}

export default function Welcome({ source, quote, credit }: Props) {

  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/gallery");
  }

  const [showLogin, setShowLogin] = useState(false);
  function closeLogin(){
    setShowLogin(false)
  }

  const [showRegister, setShowRegister] = useState(false);
  function closeRegister(){
    setShowRegister(false)
  }


  return (
    <div className="welcome-page">
      <Photo source={source} />
      <div className="column">
        <Quote quote={quote} credit={credit} />

        <div className="buttons-wrapper">
          <Button variant="outlined" sx={{width: '40vw'}} onClick={handleClick}>Go to the gallery</Button>
          <div className="btn-column">
            <Button variant="outlined" className="btn" onClick={() => setShowLogin(true)}>Login</Button>
            <Button variant="outlined" className="btn" onClick={() => setShowRegister(true)}>Register</Button>
          </div>
        </div>
      </div>
      <Login open={showLogin} handleClose={closeLogin} />
      <Register open={showRegister} handleClose={closeRegister} />
    </div>
  );
}
