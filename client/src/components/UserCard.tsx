import { Box, Container, Link, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface User {
  username: string;
  avatar: string;
  email: string;
  website: string;
}

export default function UserCard({ avatar, username, email, website }: User) {
  const cld = cloudinaryFnc();
  return (
    <Container sx={{ mt: "2vh", width: "30vw" }}>
      <Box sx={{ position: "fixed",display: 'flex', flexDirection: "column", gap: '1vh' }}>
        <Box>
          <AdvancedImage
            cldImg={cld.image(avatar).resize(fill().width(220).height(220))}
          />
        </Box>

        <Box sx={{}}>
          <Typography variant="h5">{username}</Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: "column", alignItems: 'flex-start'}}>
          <Typography>Contact:</Typography>
          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5vw'}}>
            <EmailOutlinedIcon /> {email}
          </Typography>
          <Link href="#" sx={{ textDecoration: "none",  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5vw' }}>
            <HomeOutlinedIcon /> {website}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
