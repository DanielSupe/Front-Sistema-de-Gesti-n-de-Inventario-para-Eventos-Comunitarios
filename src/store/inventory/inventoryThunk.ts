
import axios from "axios";
import { urlBack } from "../../helpers/url_helper";
import type { AppDispatch } from "../store";
import { getinventory, getinventoryFail, getinventorySuccess, getLoads, getLoadsFail, getLoadsSuccess } from "./inventorySlice";
import Swal from "sweetalert2";



export const fetchInventory = () => async (dispatch: AppDispatch) => {
  dispatch(getinventory());

  try {
    // const response = await axios.get(`${urlBack}/inventory`);

const response = await axios.get(`${urlBack}/items`);

    dispatch(getinventorySuccess(response.data));
  } catch (err: any) {
    dispatch(getinventoryFail(err.message || 'Error fetching inventory'));
  }
};


export const CreateItem = (item:any) => async (dispatch: AppDispatch) => {
  dispatch(getinventory());

  const body = {
  name: item.name,
  description: item.description,
  totalQuantity: item.totalQuantity,
};

  try {
    await axios.post(`${urlBack}/items`,body);
    Swal.fire('Success', 'The item was created successfully', 'success');
    dispatch(fetchInventory());
  } catch (err: any) {
    Swal.fire('Error', 'Error Create Item', 'error');
    dispatch(getinventoryFail(err.message || 'Error create inventory'));
  }
};

export const UpdateItem = (item:any) => async (dispatch: AppDispatch) => {
  dispatch(getinventory());

  const body = {
  name: item.name,
  description: item.description,
  totalQuantity: item.totalQuantity,
};

  try {
    await axios.put(`${urlBack}/items/${item.id}`,body);
    Swal.fire('Success', 'The item was Update successfully', 'success');
    dispatch(fetchInventory());
  } catch (err: any) {
    Swal.fire('Error', 'Error Update inventory', 'error');
    dispatch(getinventoryFail(err.message || 'Error Update inventory'));
  }
};

export const deleteItem = (id:any) => async (dispatch: AppDispatch) => {
  dispatch(getinventory());

  try {
    await axios.delete(`${urlBack}/items/${id}`);
    Swal.fire('Success', 'The item was delete successfully', 'success');
    dispatch(fetchInventory());
  } catch (err: any) {
    Swal.fire('Error', 'Error delete inventory', 'error');
    dispatch(getinventoryFail(err.message || 'Error delete inventory'));
  }
};

//-------------------------LOAD------------------------------------------------

export const fetchLoads = () => async (dispatch: AppDispatch) => {
  dispatch(getLoads());

  try {

const loanedItems = await axios.get(`${urlBack}/loans`);

    dispatch(getLoadsSuccess(loanedItems.data));
  } catch (err: any) {
    dispatch(getLoadsFail(err.message || 'Error fetching inventory'));
  }
};


export const CreateItemLoan = (item:any) => async (dispatch: AppDispatch) => {
  dispatch(getLoads());

  const body = {
    itemId: item.itemId,
    quantity: item.quantity,
    startDate: new Date(item.startDate).getTime(),
    endDate:new Date(item.endDate).getTime(), 
    requestedBy:item.requestedBy,
  };

  try {
    await axios.post(`${urlBack}/loans`,body);
    Swal.fire('Success', 'The Load was created successfully', 'success');
    dispatch(fetchLoads());
    dispatch(fetchInventory());
  } catch (err: any) {
    Swal.fire('Error', 'Error Create Load', 'error');
    dispatch(getinventoryFail(err.message || 'Error create inventory'));
  }
};

export const deleteItemLoan = (id:any) => async (dispatch: AppDispatch) => {
  dispatch(getLoads());

  try {
    await axios.delete(`${urlBack}/loans/${id}/cancel`);
    Swal.fire('Success', 'The loan was delete successfully', 'success');
    dispatch(fetchInventory());
  } catch (err: any) {
    Swal.fire('Error', 'Error delete loan', 'error');
    dispatch(getinventoryFail(err.message || 'Error delete loan'));
  }
};