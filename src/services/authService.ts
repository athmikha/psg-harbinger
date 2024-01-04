// Assuming you have an HTTP client library (like axios) to make requests
import axios from 'axios';
import { LoginUserSchema } from '../schema/auth';

export async function authenticateUser(inputs: LoginUserSchema): Promise<any> {
  try {
    const loginData = {
      Emp_id:inputs.employeeId,
      Pwd:inputs.pwd
     }
    
    
    
    const response = await axios.post('https://edviewx.psgtech.ac.in/LoginAuth/api/Login/LoginAuth/', loginData);
    
    
    const userDetails = response.data;
    console.log(userDetails,"userDetails\n\n")
    
    

    return userDetails;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}
