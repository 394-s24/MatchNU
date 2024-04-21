import { pushData } from "../../firebase/utils";

const createEvent = async (event) => {
  await pushData(`events`, event);
};

export default createEvent;
