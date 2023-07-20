import { Modal, Box, TextField, Button, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "20%",
  left: "30%",
  width: 600,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  bgcolor: "secondary.light",
  boxShadow: 24,
  p: 4,
  borderRadius: "2px",
};

const btnStyles = {
  width: "100%",
  height: "3rem",
  fontSize: "1.1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  bgcolor: "primary.dark",
  color: "secondary.dark",
};

export default function Login({ open, handleClose }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();

  const navigate = useNavigate();

  const input = {
    username,
    password,
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(input)
    try {
      await login(input);
    } catch (error) {
      console.log(error);
    }
    setUsername("");
    setPassword("");
    navigate("/gallery")

  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component='form' onSubmit={(e) => handleLogin(e)}>
          <Typography variant="h6">Welcome back!</Typography>
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
          />
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoFocus
          />

          <Button sx={btnStyles} type="submit" onClick={(e) => handleLogin(e)}>
            LOGIN
          </Button>
          <Typography color="error">{err}</Typography>
        </Box>
      </Modal>
    </>
  );
}
