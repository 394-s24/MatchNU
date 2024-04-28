import { pushData } from "../../firebase/utils";

const createTag = async (tag) => {
  await pushData(`tags`, tag);
  const tagRef = await pushData(`tags`, tag);
  const newTagId = tagRef.key;
  return newTagId;
};

export default createTag;