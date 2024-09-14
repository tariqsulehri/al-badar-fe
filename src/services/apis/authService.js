import { createNotification } from "../../helpers/notificationsHepler";
// import httpClient from "../axios";

export const login = async (data) => {
    try{
        // we will call our login here and return data accordingly
        // const res = await httpClient.post("/photos",{...data});
        return {username: data.username, password: data.password };
    } catch(error) {
      createNotification("error", error.message);
      console.log("Something Went wrong", error.message);
    }
};