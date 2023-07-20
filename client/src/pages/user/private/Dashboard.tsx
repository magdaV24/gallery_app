import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import EditableCard from "../../../components/EditableCard";
import Navbar from "../../../components/Navbar";
import { Container } from "@mui/material";

interface Work {
    id: number,
  photo: string;
  title: string;
  creator: string;
  description: string;
  visible: string
}

export default function Dashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const { currentUser } = useContext(AuthContext);

  const user = currentUser.username;

  async function fetchWorks() {
    await axios
      .get(`http://localhost:8080/server/entries/find/${user}`, user)
      .then((res) => setWorks(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchWorks();
  }, []);
  return <>
  <Container className="container">
  {works && works.map((entry) => (
    <EditableCard key={entry.id} id={entry.id} title={entry.title} description={entry.description} creator={entry.creator} photo={entry.photo} visible={entry.visible}/>
  ))}
  </Container>
  <Navbar/>
  </>
}
