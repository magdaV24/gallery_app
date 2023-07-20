import { Box, Button, Container, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Thumbnail from "../../components/Thumbnail";
import ListElement from "../../components/ListElement";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

interface Work {
  id: number;
  photo: string;
  title: string;
  creator: string;
  description: string;
  visible: string;
}

export default function Gallery() {
  const [entries, setEntries] = useState<Work[]>([]);

  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);

  async function fetchWorks() {
    await axios
      .get("http://localhost:8080/server/entries/public")
      .then((res) => setEntries(res.data))
      .catch((error) => console.log(error));
  }

  const displayGrid = () => {
    setGrid(true);
    setList(false);
  };

  const displayList = () => {
    setGrid(false);
    setList(true);
  };

  useEffect(() => {
    fetchWorks();
  }, []);
  return (
    <Container className="container">
      <Navbar />
      <Box className="display-buttons-wrapper">
        <Button onClick={displayGrid}>
          <GridViewOutlinedIcon />
        </Button>
        <Button onClick={displayList}>
          <ListOutlinedIcon />
        </Button>
      </Box>
      {grid && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {entries &&
            entries.map((entry, i) => (
              <Grid item xs={2} sm={4} md={4} key={entry.id}>
                <Thumbnail
                  key={entry.id}
                  photo={entry.photo}
                  title={entry.title}
                  description={entry.description}
                  creator={entry.creator}
                  count={i}
                />
              </Grid>
            ))}
        </Grid>
      )}

      {list && (
        <Box
          sx={{
            display: "flex",
            width: "89vw",
            justifyContent: "flex-start",
            height: "fit-content",
            mb: 3,
            flexDirection: "column",
          }}
        >
          {entries &&
            entries.map((entry, i) => (
              <ListElement
                key={entry.id}
                photo={entry.photo}
                title={entry.title}
                count={i + 1}
                id={0}
                creator={entry.creator}
                description={entry.description}
                visible={entry.visible}
              />
            ))}
        </Box>
      )}
    </Container>
  );
}
