import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Box, Container, Typography } from "@mui/material";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface User {
  avatar: string;
  username: string;
}

export default function UserBar({ avatar, username }: User) {
  const cld = cloudinaryFnc();
  return (
    <Container className="user-bar">
      <Box>
      <AdvancedImage
          cldImg={cld.image(avatar).resize(fill().width(100).height(100))}
        />
        <Typography variant="h2">{username}</Typography>
        <Typography variant="h3">{username}</Typography>
      </Box>
    </Container>
  );
}
