import { getData } from "../firebase/utils";

const getTags = async() => {
  const tagsSnapshot = await getData(`tags`);

  if (!tagsSnapshot.exists()) return [];

  const tagsVal = tagsSnapshot.val();

  return Object.keys(tagsVal).map((tagId) => ({
    id: tagId,
    name: tagsVal[tagId]['tag'],
    type: tagsVal[tagId]['type']
  }));
};

export default getTags;