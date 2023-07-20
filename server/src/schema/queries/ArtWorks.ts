import { ArtWorks } from "../entities/ArtWorks";

export const create_entry = async (req: any, res: any) => {
  const photo = req.body.photo;
  const creator = req.body.creator;
  const title = req.body.title;
  const description = req.body.description;
  const visible = req.body.visible;

  await ArtWorks.insert({
    photo,
    title,
    creator,
    description,
    visible,
  })
    .then(() => console.log("Success!"))
    .catch((err) => console.log(err));
};

export const fetch_works_by_creator = async (req: any, res: any) => {
  const creator = req.body.user;

  const response = await ArtWorks.find({ where: { creator } });
  if (response.length === 0) {
    return
  }

  return res.json(response);
};

export const edit_entry = async (req: any, res: any) => {
  const id = req.body.id;

  const newPhoto = req.body.newPhoto;
  const newTitle = req.body.newTitle;
  const newDescription = req.body.newDescription;
  const newVisible = req.body.newVisible;

  const response = await ArtWorks.findOne({ where: { id } });
  if (!response) {
    return;
  }

  response.photo = newPhoto;
  response.title = newTitle;
  response.description = newDescription;
  response.visible = newVisible;

  return ArtWorks.save(response);
};

export const delete_entry = async (req: any, res: any) => {
  const id = req.body.id;
  const entry = await ArtWorks.findOne({ where: { id } });
  if (entry) {
    await ArtWorks.delete(entry.id);
  }
  return res.json();
};

export const fetch_if_public = async (req: any, res: any) => {
    const entries = await ArtWorks.find({where: {visible: "Visible"}})

    if (entries.length === 0) {
        return;
      }
    
      return res.json(entries);
}

export const fetch_user_public_works = async (req: any, res: any) =>{
  const creator = req.body.username
  const entries = await ArtWorks.find({where: {visible: "Visible", creator}})

  if (entries.length === 0) {
    return;
  }

  return res.json(entries);
}