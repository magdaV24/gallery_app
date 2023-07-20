import { Modal, Box, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "10%",
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

export default function Register({ open, handleClose }: Props) {
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const navigate = useNavigate();
  function validPassword(pass_one: string, pass_two: string) {
    if (pass_one === pass_two) {
      return true;
    } else {
      return false;
    }
  }

  const setFile = (files: any) => {
    if (files === null) {
      return;
    }
    setAvatar(files[0]);
  };

  async function register() {
    if (!validPassword(password, confirmPassword)) {
      return;
    }

    const formData = new FormData();
    if (avatar === undefined) {
      return;
    }
    formData.append("file", avatar);
    formData.append("upload_preset", "hinvvedx");

    await axios
      .post("https://api.cloudinary.com/v1_1/ddfyjnala/image/upload", formData)
      .then((res) => {
        try {
          axios
            .post("http://localhost:8080/server/user/create", {
              username,
              password,
              email,
              avatar: res.data.public_id,
              website,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(err));

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setWebsite("");
    navigate("/");
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">
            Create an account and share your art with the world!
          </Typography>

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
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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

          <TextField
            id="standard-basic"
            type="password"
            label="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            variant="standard"
            autoFocus
          />

          <TextField
            id="standard-basic"
            type="standard"
            label="Where can we find you?"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
            variant="standard"
            autoFocus
          />

          <Button variant="contained" component="label">
            Upload an avatar!
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files)}
            />
          </Button>

          <Button sx={btnStyles} type="submit" onClick={register}>
            REGISTER
          </Button>
        </Box>
      </Modal>
    </>
  );
}
