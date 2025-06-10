import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { CreateItem, CreateItemLoan, deleteItem, deleteItemLoan, fetchInventory, fetchLoads, UpdateItem } from './store/inventory/inventoryThunk';
import DynamicTable from './custom/Components/DynamicTable';
import Modal from './custom/Components/Modal';
import DynamicForm from './custom/Components/Form';
import Swal from 'sweetalert2';
import { HiOutlineCog } from 'react-icons/hi';

function App() {

  const inicialState:any = {
    name: "",
    description: "",
    totalQuantity: 1,
    available: true
  }

        const inicialStateLoan:any = {
      itemId: 0,
      quantity: 1,
      startDate: new Date(), 
      endDate: new Date(),
      requestedBy: "" // 7 días en el futuro
  }


  const dispatch = useDispatch();
  const {loading, inventory,loans} = useSelector((state: any) => state.inventory)
  const [loansList, setLoansList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalLoan, setActiveModalLoan] = useState(false);
  const [formData, setFormData] = useState(inicialState);
  const [formDataLoan, setFormDataLoan] = useState(inicialStateLoan);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (value: any, key: string) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

    const handleChangeLoan = (value: any, key: string) => {
    setFormDataLoan({
      ...formDataLoan,
      [key]: value
    });
  };

  //------------------Load-------------------



  const loanedColumns = [
  { name: 'ID', key: 'id' },
  { name: 'Item ID', key: 'itemId' },
  { name: 'Quantity', key: 'quantity' },
  { name: 'Start Date', key: 'startDate' },
  { name: 'End Date', key: 'endDate' },
  { name: 'Requested By', key: 'requestedBy' },
];

const loanedFields: any = [
  { key: 'itemId', label: 'Item ID', type: 'number' },
  { key: 'quantity', label: 'Quantity', type: 'number', min: 1 },
  { key: 'startDate', label: 'Start Date', type: 'date' },
  { key: 'endDate', label: 'End Date', type: 'date' },
  { key: 'requestedBy', label: 'Requested By', type: 'text' },
];
//--------------------------------------------

//Items----------------------------------------------------

const columns = [
  { name: 'ID', key: 'id' },
  { name: 'Name', key: 'name' },
  { name: 'Description', key: 'description' },
  { name: 'Total Quantity', key: 'totalQuantity' },
  { name: 'Available', key: 'isAvailable' },
];

const fields:any = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'totalQuantity', label: 'Total Quantity', type: 'number' },
  // { key: 'available', label: 'Available', type: 'checkbox' },
];

//--------------------------------------------------------------
  useEffect(() => {
    setInventoryList(inventory);
  }, [inventory]);

useEffect(() => {
  const activeLoans = loans.filter((loan:any) => !loan.cancelled);
  setLoansList(activeLoans);
}, [loans]);

  useEffect(() => {
    dispatch<any>(fetchInventory())
    dispatch<any>(fetchLoads())
  }, []);

    const handleRowClick = (rowData: any) => {
      setIsEditing(true);
      setFormData(rowData);
      setActiveModal(true);
    console.log('Fila seleccionada:', rowData);
  };

    const handleRowClickLoan = (rowData: any) => {
      setIsEditing(true);
      setFormDataLoan(rowData);
      setActiveModalLoan(true);
    console.log('Fila seleccionada:', rowData);
  };

  const addButton = () => {
    setIsEditing(false);
    setActiveModal(true);
    setFormData(inicialState);
  };

    const addButtonLoan = () => {
    setIsEditing(false);
    setActiveModalLoan(true);
    setFormDataLoan(inicialState);
  };

  const onDelete = (item:any)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
          setActiveModal(false);
          dispatch<any>(deleteItem(item.id));
      }
    });
  }

    const onDeleteLoan = (item:any)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the Loan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
          setActiveModal(false);
          dispatch<any>(deleteItemLoan(item.id));
      }
    });
  }

  const onUpdate = (item:any)=>{
    if(item.name.length < 3 || item.totalQuantity < 1){
      Swal.fire('Error', 'The item could not be updated', 'error');
    }else{
      setActiveModal(false);
      dispatch<any>(UpdateItem(item));
    }
  }

  
  const onCreate = (item:any)=>{
    if(item.name.length < 3 || item.totalQuantity < 1){
      Swal.fire('Error', 'The item could not be created', 'error');
    }else{
      setActiveModal(false);
      dispatch<any>(CreateItem(item));
    }
  }

  //------------------Loan Functions-------------------------------

const onCreateLoan = (loan: any) => {
  const now = Date.now();
  const startDate = new Date(loan.startDate).getTime();
  const endDate = new Date(loan.endDate).getTime();

  if (
    !loan.itemId ||
    loan.quantity < 1 ||
    !loan.startDate || startDate < now ||
    !loan.endDate || endDate <= startDate ||
    !loan.requestedBy || loan.requestedBy.trim().length < 3
  ) {
    Swal.fire('Error', 'The loan could not be created. Please check the required fields.', 'error');
  } else {
    setActiveModalLoan(false);
    dispatch<any>(CreateItemLoan(loan));
  }
};



  return (
    <>
    <header className="w-full h-[10vh] bg-white shadow p-4 flex items-center justify-center gap-2">
      <HiOutlineCog className="text-blue-600 text-3xl" />
      <h1 className="text-3xl font-bold text-gray-800">Inventory Management System for Community Events</h1>
    </header>



    <div className="flex flex-col justify-center items-center p-4 w-[100vw] h-[90vh] bg-gray-100">
      <div className='flex flex-col lg:flex-row justify-center items-center h-full w-full overflow-auto gap-4'>
        <div className='w-full max-h-[50%] lg:w-[50%] lg:h-[70%] overflow-auto flex flex-col justify-start items-start gap-4'>

    <div className='flex justify-center items-center w-full mb-4'>
        <button id='addButtonItem' onClick={()=>{addButton()}} className="bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded shadow-md transition cursor-pointer mr-4">
          Add Item
        </button>
                <h1 className='text-2xl font-bold text-gray-800'>Inventory Management</h1>
    </div>

          <DynamicTable
            data={inventoryList}
            columns={columns}
            actionRowClick={handleRowClick}
          />
        </div>

        <div className='w-full max-h-[50%] lg:w-[50%] lg:h-[70%] overflow-auto flex flex-col justify-start items-end gap-4'>

            <div className='flex justify-center items-center w-full mb-4'>
                              <h1 className='text-2xl font-bold text-gray-800'>Loans</h1>
        <button id='addButtonItemLoad' onClick={()=>{addButtonLoan()}} className="bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded shadow-md transition cursor-pointer ml-4">
          Register loan
        </button>
    </div>
          <DynamicTable
            data={loansList}
            columns={loanedColumns}
            actionRowClick={handleRowClickLoan}
          />
        </div>
      </div>


      {activeModal && (
      <Modal title='Add item' open={activeModal} onClose={() => setActiveModal(false)}>
        <DynamicForm onCreate={onCreate} onDelete={onDelete} onUpdate={onUpdate} isEditing={isEditing} fields={fields} data={formData} onChange={handleChange} />
      </Modal>
      )}

      {activeModalLoan && (
      <Modal title='Register Loan' open={activeModalLoan} onClose={() => setActiveModalLoan(false)}>
        <DynamicForm readOnly={true} onCreate={onCreateLoan} onDelete={onDeleteLoan} isEditing={isEditing} fields={loanedFields} data={formDataLoan} onChange={handleChangeLoan} />
      </Modal>
      )}
    </div>
    </>
  )
}

export default App