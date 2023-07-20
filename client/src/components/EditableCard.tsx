import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Card,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface Work {
  id: number;
  photo: string;
  title: string;
  creator: string;
  description: string;
  visible: string;
}

export default function EditableCard({
  id,
  photo,
  title,
  description,
  visible,
}: Work) {
  const [isEditing, setIsEditing] = useState(false);
  const cld = cloudinaryFnc();

  const [newPhoto, setNewPhoto] = useState(photo);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newVisible, setNewVisible] = useState(visible);

  const setFile = (files: any) => {
    if (files === null) {
      return;
    }
    setNewPhoto(files[0]);
  };

  const submitEdit = async (e: any) => {
    e.preventDefault();
    if (newPhoto === photo) {
      axios.post(
        `http://localhost:8080/server/entries/edit/${id}`,
        {
          newDescription,
          newTitle,
          newVisible,
        }
      );
    } else {
      const formData = new FormData();
      if (newPhoto === undefined) {
        return;
      }
      formData.append("file", newPhoto);
      formData.append("upload_preset", "hinvvedx");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/ddfyjnala/image/upload",
          formData
        )
        .then((res) => {
          try {
            axios
              .post(`http://localhost:8080/server/entries/edit/${id}`, {
                newDescription,
                newTitle,
                newVisible,
                newPhoto: res.data.public_id,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteEntry = async (id: any, e: any) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8080/server/entries/delete/${id}`, id);
  };
  return (
    <Card
      sx={{
        display: "flex",
        mt: "9vh",
        alignItems: "center",
        p: "1vh",
        gap: "2vh",
        minHeight: "44vh",
        width: "95vw",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "30vw",
          minHeight: "40vh",
          height: "fit-content",
          position: "absolute",
          top: 0,
          left: 0,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "40vh",
            gap: "1vh",
            position: "relative",
          }}
        >
          <AdvancedImage
            cldImg={cld.image(photo).resize(fill().width(200).height(200))}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "2vw",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ width: "11vw" }}
              variant="outlined"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              EDIT
            </Button>
            <Button
              sx={{ width: "11vw" }}
              variant="outlined"
              onClick={(e) => deleteEntry(id, e)}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: "40vh",
          height: "fit-content",
          width: "65vw",
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          marginLeft: "30vw",
        }}
      >
        <Typography sx={{ fontSize: "2.8vh", textAlign: "left", mt: "1vh" }}>
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8vh",
            textAlign: "left",
            minHeight: "28vh",
            height: "fit-content",
          }}
        >
          {description}
        </Typography>
        {isEditing && (
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              height: "fit-content",
              minHeight: "40vh",
              backgroundColor: "background.paper",
              width: "61vw",
              p: 2,
              ml: 2,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
              borderRadius: 2
            }}
          >
            <Button variant="contained" component="label">
              Change the photo!
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files)}
              />
            </Button>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
            <TextField
              id="filled-basic"
              label="Description"
              variant="filled"
              multiline={true}
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            />
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
                  onChange={() => setNewVisible("Not Visible")}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Everybody"
                  onChange={() => setNewVisible("Visible")}
                />
              </RadioGroup>
            </Box>
            <Button type="submit" variant="outlined" onClick={submitEdit}>
              SUBMIT
            </Button>
          </FormControl>
        )}
      </Box>
    </Card>
  );
}
