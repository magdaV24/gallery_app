import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  Paper,
  Grid,
  ButtonBase,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useState } from "react";
import EntryModal from "./EntryModal";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface Work {
  id: number;
  photo: string;
  title: string;
  creator: string;
  description: string;
  visible: string;
  count: number;
}

export default function ListElement({
  photo,
  title,
  count,
  creator,
  description,
}: Work) {
  const cld = cloudinaryFnc();

  const [showModal, setShowModal] = useState(false);
  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <Paper
        sx={{
          margin: "2vw",
          padding: "2vw",
          width: "80vw",
          height: "20vh",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
          onClick={() => setShowModal((prev: boolean) => !prev)}
        >
          <Box
            sx={{
              width: "5vw",
              height: "18vh",
              display: "flex",
              flexDirection: "center",
              alignItems: "center",
            }}
          >
            <Avatar>{count}</Avatar>
          </Box>
          <Grid
            item
            sx={{
              width: "15vw",
              height: "18vh",
              display: "flex",
              flexDirection: "center",
              alignItems: "center",
            }}
          >
            <ButtonBase>
              <AdvancedImage
                cldImg={cld.image(photo).resize(fill().width(150).height(150))}
              />
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={12}
            sm
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs sx={{ display: "flex", gap: "1vw", width: "50vw" }}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10vw",
                    textAlign: "left",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "40vw",
                    fontSize: "1.1vh",
                    borderLeft: "1px solid primary.main",
                    textAlign: "left",
                  }}
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <EntryModal
        key={count}
        photo={photo}
        title={title}
        creator={creator}
        description={description}
        open={showModal}
        handleClose={closeModal}
      />
    </>
  );
}
