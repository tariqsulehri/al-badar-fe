
import httpClient from "../../axios";
import {showToastNotification} from "../../../helpers/notificationsHepler";


export const getAllAreasForSelection = async () => {
    try{
        let {data} = await httpClient.get(`/area/list_for_select`);
        return data ? data : null;
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};


export const getAllArea = async (rowsPerPage, pageNo, searchBy, searchText) => {
    try{
        let {data} = await httpClient.get(`/area/list?pageSize=${rowsPerPage}&pageNo=${pageNo}&searchBy=${searchBy}&searchText=${searchText}`);
        return data ? data : { data: null, totalRecords: 0 };
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};

export const findAreaById = async (id) => {
    try{
        const resp = await httpClient.get(`/area/find/${id}`);
        return resp?.data;
    } catch(error){ 
      console.log("Something Went wrong", "Something Went wrong");
      showToastNotification("error", "Something Went wrong..");
    }
};
  

export const createArea = async (data) => {
    try{
        const res = await httpClient.post("/area/create", {data});
        return res.data.data;
    } catch(error) {
        
     showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};

export const updateArea = async (id,data) => {
    try{
        if(!id) throw new Error("Invalid id");
        await httpClient.post(`/area/update/${id}`, {data});
        return true;

    } catch(error){ 
      showToastNotification("error", "Something Went wrong..");
      console.log("Something Went wrong", error.message);
    }
};

export const deleteArea = async (id) => {
    try{
        
        if(!id) throw new Error("Invalid id");
        
        await httpClient.get(`/area/${id}`);
        showToastNotification("success", 'Successfully deleted.');
        return true;

    } catch(error) {
      showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};