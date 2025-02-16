import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    // const dummyData = [
    //     {
    //         id : 1,
    //         firstName : "Ajay",
    //         lastname : "yadav",
    //         email : "ajay@gmail.com"
    //     },
    //     {
    //         id : 2,
    //         firstName : "Abhay",
    //         lastname : "yadav",
    //         email : "abhay@gmail.com"
    //     },
    //     {
    //         id : 3,
    //         firstName : "Ruby",
    //         lastname : "yadav",
    //         email : "ruby@gmail.com"
    //     }
    // ]

    const[employees,setEmployees] = useState([]);
    const navigator = useNavigate();

    // we are using useEffect hook to show all employees when component did mount
    useEffect(()=>{
        getAllEmployees();
    },[]);

    const getAllEmployees = () =>{
        listEmployees().then((response)=>{
            console.log("Fetched Employees:", response.data);
            setEmployees(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }


    // so when ever user click on add emp button, user will be navigate to the '/add-employee' url
    const addNewEmployee = () =>{
        navigator('/add-employee');
    }

    // update the employee
    const updateEmployee = (id) =>{
        navigator(`/edit-employee/${id}`)
    }

    // delete the employee
    const removeEmployee = (id) =>{
        console.log(id);

        deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error =>{
            console.error(error);
        })
    }

  return (
    <div className='container'>

      <h2 className='text-center'>List Of Employees</h2>

      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>


      <table className='table table-striped ' >
        <thead>
            <tr>
                <th>Employee id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {
                employees.map(employee => 
                    <tr key={employee.id}>
                        
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.address}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>{
                                updateEmployee(employee.id)
                            }}>Update</button>


                            <button className='btn btn-danger' onClick={()=>{
                                removeEmployee(employee.id)
                            }} style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>
                )
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent;
