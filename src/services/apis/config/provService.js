
import httpClient from "../../axios";
import {showToastNotification} from "../../../helpers/notificationsHepler"


export const getAllProvencsForSelection = async () => {
    try{
        let {data} = await httpClient.get(`/provence/list_for_select`);
        return data ? data : null;
    } catch(error) {
        console.log("Something Went wrong", error.message);
        showToastNotification("error", "Something Went wrong..");
      }
};


export const getAllProv = async (rowsPerPage, pageNo, searchBy, searchText) => {
    try{
        let {data} = await httpClient.get(`/provence/list?pageSize=${rowsPerPage}&pageNo=${pageNo}&searchBy=${searchBy}&searchText=${searchText}`);
        return data ? data : { data: null, totalRecords: 0 };
    } catch(error) {
        showToastNotification("error", "Something Went wrong..");
        console.log("Something Went wrong", error.message);
      }
};

export const findProvById = async (id) => {
    try{
        const resp = await httpClient.get(`http://localhost:3500/api/provence/find/${id}`);
        return resp?.data;
    } catch(error){ 
      console.log("Something Went wrong", "Something Went wrong");
      showToastNotification("error", "Something Went wrong..");
    }
};
  

export const createProv = async (data) => {
    try{
        const res = await httpClient.post("/provence/create", {data});
        return res.data.data;
    } catch(error) {
        
     showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};

export const updateProv = async (id,data) => {
    try{
        if(!id) throw new Error("Invalid id");
        await httpClient.post(`/provence/update/${id}`, {data});
        return true;

    } catch(error){ 
      showToastNotification("error", "Something Went wrong..");
      console.log("Something Went wrong", error.message);
    }
};

export const deleteProv = async (id) => {
    try{
        
        if(!id) throw new Error("Invalid id");
        
        await httpClient.get(`/provence/${id}`);
        showToastNotification("success", 'Successfully deleted.');
        return true;

    } catch(error) {
      showToastNotification("error", "Something Went wrong");
      console.log("Something Went wrong", error.message);
    }
};