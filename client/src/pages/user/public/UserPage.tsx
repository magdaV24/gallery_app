import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import UserCard from "../../../components/UserCard";
import { Container, Grid } from "@mui/material";
import PublicEntry from "../../../components/PublicEntry";

interface Creator {
  id: number;
  username: string;
  email: string;
  website: string;
  avatar: string;
}

interface Entry {
  photo: string;
  title: string;
  description: string;
  creator: string;
}

export default function UserPage() {
  const location = useLocation();
  const user = location.pathname.split("/");

  const [creator, setCreator] = useState<Creator>();

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:8080/server/user/fetch/${user}`)
      .then((res) => setCreator(res.data))
      .catch((err) => console.log(err));
  };

  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchPublicEntries = async () => {
    const username = creator?.username;
    await axios
      .get(`http://localhost:8080/server/entries/public/${username}`)
      .then((res) => setEntries(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
    fetchPublicEntries();
  }, []);
  return (
    <>
      <Navbar />
      <Container sx={{ display: "flex", width: "98vw", padding: '1vh', mt: '7vh', justifyContent: 'space-between' }}>
        {creator && (
          <UserCard
            username={creator.username}
            avatar={creator?.avatar}
            email={creator?.email}
            website={creator?.website}
          />
        )}

        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 6 }} sx={{mt: '2vh', width: '65vw',}}>
          {entries &&
            entries.map((entry) => (
              <Grid item xs={6}>
                <PublicEntry
                  photo={entry.photo}
                  title={entry.title}
                  description={entry.description}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
