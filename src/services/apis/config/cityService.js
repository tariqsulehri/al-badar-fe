
import httpClient from "../../axios";
import {showToastNotification} from "../../../helpers/notificationsHepler";

export const getAllCitiesForSelection = async () => {
    try{
        let {data} = await httpClient.get(`/city/list_for_select`);
        return data ? data : null;
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};

export const getAllCity = async (rowsPerPage, pageNo, searchBy, searchText) => {
    try{
        let {data} = await httpClient.get(`/city/list?pageSize=${rowsPerPage}&pageNo=${pageNo}&searchBy=${searchBy}&searchText=${searchText}`);
        return data ? data : { data: null, totalRecords: 0 };
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};

export const findCityById = async (id) => {
    try{
        const resp = await httpClient.get(`http://localhost:3500/api/city/find/${id}`);
        return resp?.data;
    } catch(error){ 
      console.log("Something Went wrong", "Something Went wrong");
      showToastNotification("error", "Something Went wrong..");
    }
};
  

export const createCity = async (data) => {
    try{
        const res = await httpClient.post("/city/create", {data});
        return res.data.data;
    } catch(error) {
        
     showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};

export const updateCity = async (id,data) => {
    try{
        if(!id) throw new Error("Invalid id");
        await httpClient.post(`/city/update/${id}`, {data});
        return true;

    } catch(error){ 
      showToastNotification("error", "Something Went wrong..");
      console.log("Something Went wrong", error.message);
    }
};

export const deleteCity = async (id) => {
    try{
        
        if(!id) throw new Error("Invalid id");
        
        await httpClient.get(`/city/${id}`);
        showToastNotification("success", 'Successfully deleted.');
        return true;

    } catch(error) {
      showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};