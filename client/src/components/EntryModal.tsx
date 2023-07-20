import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Link, Modal } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";

interface Work {
  photo: string;
  title: string;
  creator: string;
  description: string;

  open: boolean;
  handleClose: () => void;
}

export default function EntryModal({
  photo,
  title,
  description,
  creator,
  open,
  handleClose,
}: Work) {
  const cld = cloudinaryFnc();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ width: "50vw", height: "50vh" }}
    >
      <Card className="entry-modal">
        <CardActionArea sx={{ display: "flex" }}>
          <Box
            sx={{
              height: "50vh",
              width: "25vw",
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AdvancedImage
              cldImg={cld.image(photo).resize(fill().width(250).height(250))}
            />
            <Link href={creator} sx={{ fontSize: "1.5vh" }}>
              Artist: {creator}
            </Link>
          </Box>
          <CardContent
            sx={{
              height: "50vh",
              width: "25vw",
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ height: "30%", width: '100%', display: 'flex', alignItems: 'center' }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: "70%", width: '100%', display: 'flex', alignItems: 'flex-start' }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Modal>
  );
}
