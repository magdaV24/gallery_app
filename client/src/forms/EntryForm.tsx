import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function EntryForm({ open, handleClose }: Props) {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState('');
  const [visible, setVisible] = useState("Not Visible");

  const { currentUser } = useContext(AuthContext);

  const setFile = (files: any) => {
    if (files === null) {
      return;
    }
    setPhoto(files[0]);
  };

  const submitEntry = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (photo === undefined) {
      return;
    }
    formData.append("file", photo);
    formData.append("upload_preset", "hinvvedx");

    await axios
      .post("https://api.cloudinary.com/v1_1/ddfyjnala/image/upload", formData)
      .then((res) => {
        try {
          axios
            .post("http://localhost:8080/server/entries/create", {
              photo: res.data.public_id,
              creator: creator,
              title,
              description,
              visible,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(err))

      setDescription("")
      setTitle("")
      setPhoto('');
  };

  useEffect(() => {
    function assignCreator(){
      setCreator(currentUser.username)
    }
    assignCreator();
  }, [currentUser])

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box >
    <Box 
    className="form-modal"
    component="form"
      sx={{
        border: "1px solid black",
        padding: 3,
        width: "50vw",
        height: "fit-content",
        marginTop: "10vh",
        backgroundColor: 'background.paper'
      }}
      onSubmit={submitEntry}
    >
      <FormControl
        sx={{ display: "flex", flexDirection: "column", gap: '2vh' }}
      >
        <Button variant="contained" component="label">
            Upload your creation!
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files)}
            />
          </Button>
        <TextField id="filled-basic" label="Title" variant="filled" onChange={(e) => setTitle(e.target.value) } value={title}/>
        <TextField id="filled-basic" label="Description" variant="filled" multiline={true} onChange={(e) => setDescription(e.target.value) } value={description}/>
        <Box>
          <FormLabel id="demo-radio-buttons-group-label">
            Who can see your art work?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Nobody"
              onChange={() => setVisible("Not Visible")}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Everybody"
              onChange={() => setVisible("Visible")}
            />
          </RadioGroup>
        </Box>
        <Button type="submit">SUBMIT</Button>
      </FormControl>
    </Box>
    </Box>
    </Modal>
  );
}
