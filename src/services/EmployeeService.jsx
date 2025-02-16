import axios from "axios";

// const REST_API_BASE_URL = "http://localhost:8080/api/employee";
const REST_API_BASE_URL = import.meta.env.VITE_APP_API_URL;


// to get all the employees
export const listEmployees = () =>{
    const getAllEmpUrl= `https://employee-management-system-backend-vv6q.onrender.com/api/employee`
    // return axios.get(REST_API_BASE_URL);
    return axios.get(getAllEmpUrl);
}


// create the employee, 
export const createEmployee = (employee) =>{  // the employee object holds the form data
    const postUrl = `https://employee-management-system-backend-vv6q.onrender.com/api/employee`
    // return axios.post(REST_API_BASE_URL,employee)
    return axios.post(postUrl,employee)

}



// get employee by id, 
export const getEmployee = (employeeId) =>{  // the employee object holds the form data
    const getEmpById= `https://employee-management-system-backend-vv6q.onrender.com/api/employee`
    return axios.get(`${getEmpById}/${employeeId}`)
    // return axios.get(`${REST_API_BASE_URL}/${employeeId}`)
}



// update employee by id, 
export const updateEmployee = (employeeId,employee) =>{  // the employee object holds the form data

    const updateEmpById= `https://employee-management-system-backend-vv6q.onrender.com/api/employee`
    return axios.put(`${updateEmpById}/${employeeId}`,employee);
    // return axios.put(`${REST_API_BASE_URL}/${employeeId}`,employee);
}



// delete employee by id, 
export const deleteEmployee = (employeeId) =>{ 

    const deleteEmpById= `https://employee-management-system-backend-vv6q.onrender.com/api/employee`
    return axios.delete(`${deleteEmpById}/${employeeId}`);
    // return axios.delete(`${REST_API_BASE_URL}/${employeeId}`);
}