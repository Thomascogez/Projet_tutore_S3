import axios from "axios";

const APIgetAlluserModule = userID => {
  console.log(userID);
  return axios.get(`https://schoolshare.tools/api/users/${userID}/modules`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export { APIgetAlluserModule };
