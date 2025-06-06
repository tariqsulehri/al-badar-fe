
import httpClient from "../../axios";
import {showToastNotification} from "../../../helpers/notificationsHepler";

export const getAllSubAreasForSelection = async () => {
    try{
        let {data} = await httpClient.get(`/subarea/list_for_select`);
        return data ? data : null;
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};


export const getAllSubArea = async (rowsPerPage, pageNo, searchBy, searchText) => {
    try{
        let {data} = await httpClient.get(`/subarea/list?pageSize=${rowsPerPage}&pageNo=${pageNo}&searchBy=${searchBy}&searchText=${searchText}`);
        return data ? data : { data: null, totalRecords: 0 };
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};

export const findSubAreaById = async (id) => {
    try{
        const resp = await httpClient.get(`http://localhost:3500/api/subarea/find/${id}`);
        return resp?.data;
    } catch(error){ 
      console.log("Something Went wrong", "Something Went wrong");
      showToastNotification("error", "Something Went wrong..");
    }
};
  

export const createSubArea = async (data) => {
    try{
        const res = await httpClient.post("/subarea/create", {data});
        return res.data.data;
    } catch(error) {
        
     showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};

export const updateSubArea = async (id,data) => {
    try{
        if(!id) throw new Error("Invalid id");
        await httpClient.post(`/subarea/update/${id}`, {data});
        return true;

    } catch(error){ 
      showToastNotification("error", "Something Went wrong..");
      console.log("Something Went wrong", error.message);
    }
};

export const deleteSubArea = async (id) => {
    try{
        
        if(!id) throw new Error("Invalid id");
        
        await httpClient.get(`/subarea/${id}`);
        showToastNotification("success", 'Successfully deleted.');
        return true;

    } catch(error) {
      showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};