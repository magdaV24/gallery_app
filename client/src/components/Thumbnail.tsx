import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import EntryModal from "./EntryModal";
import { useState } from "react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface Card{
    photo: string,
    title: string,
    description: string;
    creator: string;
    count: number
}

export default function Thumbnail({photo, title, creator, description, count}: Card){
  const cld = cloudinaryFnc();
  const [showModal, setShowModal] = useState(false);
  function closeModal() {
    setShowModal(false);
  }
    return(
       <>
        <Card onClick={() => setShowModal((prev: boolean) => !prev)}>
        <CardActionArea  sx={{padding: '1vh'}}>
        <AdvancedImage
          cldImg={cld.image(photo).resize(fill().width(300).height(300))}
        />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
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
    )
}