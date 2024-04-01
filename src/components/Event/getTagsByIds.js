import { getData } from "../../firebase/utils";

const getTagsByIds = async(tagsIds) => {
  return Promise.all(tagsIds.map(async(tagId) => ((await getData(`tags/${tagId}`)).val())));
};

export default getTagsByIds;