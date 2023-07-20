import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  Card,
  CardActionArea,
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface Entry {
  photo: string;
  title: string;
  description: string;
}

export default function PublicEntry({ photo, title, description }: Entry) {
  const cld = cloudinaryFnc();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Box sx={{mt: 2}}>
          <AdvancedImage
            cldImg={cld.image(photo).resize(fill().width(300).height(300))}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
