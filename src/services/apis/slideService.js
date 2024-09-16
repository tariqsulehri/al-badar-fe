
import httpClient from "../axios";
import {showToastNotification} from "../../helpers/notificationsHepler"

export const getAllSlides = async (rowsPerPage, pageNo, searchBy, searchText) => {
    try{
        let {data} = await httpClient.get(`/slide/list?pageSize=${rowsPerPage}&pageNo=${pageNo}&searchBy=${searchBy}&searchText=${searchText}`);
        return data ? data : { data:null, totalRecords: 0 };
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};

export const findSlideById = async (id) => {
    try{
        const resp = await httpClient.get(`http://localhost:3500/api/slide/find/${id}`);
        return resp?.data;
    } catch(error){ 
      console.log("Something Went wrong", "Something Went wrong");
      showToastNotification("error", "Something Went wrong..");
    }
};
  

export const createSlide = async (data) => {
    try{
        const res = await httpClient.post("/slide/create", {data});
        return res.data.data;
    } catch(error) {
        
     showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};

export const updateSlide = async (id,data) => {
    try{
        if(!id) throw new Error("Invalid id");
        await httpClient.post(`/slide/update/${id}`, {data});
        return true;

    } catch(error){ 
      showToastNotification("error", "Something Went wrong..");
      console.log("Something Went wrong", error.message);
    }
};

export const deleteSlide = async (id) => {
    try{
        
        if(!id) throw new Error("Invalid id");
        
        await httpClient.get(`/slide/${id}`);
        showToastNotification("success", 'Successfully deleted.');
        return true;

    } catch(error) {
      showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};