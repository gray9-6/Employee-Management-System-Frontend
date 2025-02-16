import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    
    // define state valriables (fristname,lastName,email) in EmployeeComponent using useState Hook
    const[firstName,setFirstname] = useState('');
    const[lastName,setLastName] = useState('');
    const[email,setEmail] = useState('');
    const[address,setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const navigator = useNavigate();
    const {id} = useParams();  // using useParam , and destructuring the param

    // these are the object attributes which hold the validation w.r.t state variable
    // now we have used the useState hook to initialise the state variable , that holds the validation error
    const [errors,setErrors] = useState({   
        firstName : '',
        lastName: '',
        email: ''
    })


    const handleFirstName = (e) =>{
        setFirstname(e.target.value);  // this is how we get the value from event :- e.target.value
    }

    const handleLastName = (e) =>{
        setLastName(e.target.value);  // this is how we get the value from event :- e.target.value
    }

    const handleEmail = (e) =>{
        setEmail(e.target.value);  // this is how we get the value from event :- e.target.value
    }

    const handleAddress = (e) =>{
        setAddress(e.target.value);  // this is how we get the value from event :- e.target.value
    }

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response) =>{
                // set the data from the response to state variable
                setFirstname(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAddress(response.data.address);
            }).catch(error =>{
                console.error(error);
            })
        }
    },[id])

    const saveOrUpdateEmployee = (e) =>{
        e.preventDefault(); // it will prevent the default activities while submitting the form

        if(validateForm()){

            const employee = {firstName,lastName,email,address}
            console.log(employee);


            if(id){ // if id is present then only call the update api
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error =>{
                    alert(error);
                    console.error(error);
                })
            }else{
                // add the employee
                createEmployee(employee).then((response) => {
                    console.log(response.data);

                    // navigate the user to List Employees Page after Form Submission Done
                    navigator('/employees')
                }).catch(error =>{
                    console.error(error);
                    if (error.response && error.response.data) {
                        alert(error.response.data)
                        setErrorMessage(error.response.data); // Store backend error message
                    } else {
                        alert("An unexpected error occurred.")
                        setErrorMessage("An unexpected error occurred.");
                    }
                })
            }
            

            
        }

    
    }


    //validation function that checks the form data and returns the validation errors
    const validateForm = () =>{
        let isValid = true;

        const errorsCopy = {... errors}  // spread operator to copy error object

        if(firstName.trim()){
            errorsCopy.firstName = '';
        }else{
            errorsCopy.firstName = 'First Name is Required';
            isValid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = 'Last Name is Required';
            isValid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'Email is Required';
            isValid = false;
        }

        setErrors(errorsCopy);

        return isValid;
    }

    // change page Title Dynamically (Add , Update)
    const pageTitle = () =>{
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }



  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {/* <h2 className='text-center'>Add Employee</h2> */}

                {
                    pageTitle()
                }

                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input 
                                type='text'
                                placeholder='Enter Your First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                // so whenever user enter name we have to get value, with onChange
                                onChange={handleFirstName}
                            ></input>
                            {/* Showing the Validation error after the input text box */}
                            {
                                errors.firstName 
                                    && 
                                <div className='invalid-feedback'>
                                    {errors.firstName} 
                                </div>
                            }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input 
                                type='text'
                                placeholder='Enter Your First Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                // so whenever user enter the name we have to get that value
                                onChange={handleLastName}
                            ></input>
                            {/* Showing the Validation error after the input text box */}
                            {
                                errors.lastName 
                                    && 
                                <div className='invalid-feedback'>
                                    {errors.lastName} 
                                </div>
                            }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input 
                                type='text'
                                placeholder='Enter Your Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                // so whenever user enter the name we have to get that value
                                onChange={handleEmail}
                            ></input>
                            {/* Showing the Validation error after the input text box */}
                            {
                                errors.email 
                                    && 
                                <div className='invalid-feedback'>
                                    {errors.email} 
                                </div>
                            }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Address</label>
                            <input 
                                type='text'
                                placeholder='Enter Your Address'
                                name='address'
                                value={address}
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                // so whenever user enter the name we have to get that value
                                onChange={handleAddress}
                            ></input>
                            {/* Showing the Validation error after the input text box */}
                            {
                                errors.address 
                                    && 
                                <div className='invalid-feedback'>
                                    {errors.address} 
                                </div>
                            }
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>

                </div>

            </div>
        </div>
        
    </div>
  )
}

export default EmployeeComponent
