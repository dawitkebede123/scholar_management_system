import { Avatar, Button, Rate, Space,Form,Input, Table,Modal, Typography, Select,useForm } from "antd";
import { useEffect, useState } from "react";
import { getCustomers,getUser, getInventory } from "../../API";
import { initializeApp } from 'firebase/app';

import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore, update } from 'firebase/database';
import { Option } from "antd/es/mentions";

const firebaseConfig = {
    apiKey: "AIzaSyAeHg32VjgFEPlnwQ1djM1krCQ3lz8GDUY",
    authDomain: "chamber-60982.firebaseapp.com",
    databaseURL: "https://chamber-60982-default-rtdb.firebaseio.com",
    projectId: "chamber-60982",
    storageBucket: "chamber-60982.appspot.com",
    messagingSenderId: "1037511136316",
    appId: "1:1037511136316:web:b7b7dbbb55478ec9ef1f39",
    measurementId: "G-WRCCQRZC52"
  
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

function User() {

    const [form] = Form.useForm();
   const [changeEmail,setChangeEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
 const [isModalVisible, setIsModalVisible] = useState(false);

 const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    getUser().then((res) => {
        const convertedArray = Object.values(res);
      setDataSource(convertedArray);
      setLoading(false);
    });
  }, []);


  /// adding new user

  

  let generatedPass = generateStrongPassword();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email:'',
    password: generatedPass,
    role:'',
    status:'Active'
    });
  
  function generateStrongPassword(length = 12) {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+";
  
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
  
    let password = "";
    for (let i = 0; i < length; i++) {
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
  
    return password;
  }
  const handleSubmit = async (values) => {
    try {
        // console.log('Fetching data by account name...');
        const queryRef = ref(database, 'User');
        const snapshot = await get(queryRef);
        const inputData = {
            'First Name': values.firstName,
            'Last Name': values.lastName,
            'email': values.email,
            'password': generatedPass,
            'role':values.role,
            'status':values.status // You might want to remove this if not needed
          };
          let exist = false;

        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const childKey in data) {
            if (data[childKey]['email'] === changeEmail) {
              const dataRef = ref(database, `User/${childKey}`);
              // Delete the existing data (be cautious of data loss)
              // await remove(dataRef);
              // Set the updated data at the same reference
              await update(dataRef, inputData);
              alert('Data updated successfully!')
            //   console.log('Data updated successfully!');
              exist = true;
              break;
            }
    
          }

          if(exist == false){
            const newRef = await push(ref(database, 'User'));
            await set(newRef, inputData);

        // Reset form or other actions
 //   form.resetFields();
   alert('User registered successfully');

          }
        } else {
            if(exist == false){
                const newRef = await push(ref(database, 'User'));
                await set(newRef, inputData);
    
            // Reset form or other actions
     //   form.resetFields();
       alert('User registered successfully');
    
              }
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
      ///
    // try {
     
    
     
    // } catch (error) {
    //   console.error('Error registering user:', error);
    //   // Handle error, e.g., show error message to user
    // }
  };

const handleChange = (event) => {
    const { name, value, files } = event.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    
  };

  const handleRestPassword = async (data) => {
    if (!data) {
      console.error(' data is null');
      return; // or handle the missing data case differently
    }
  
      let inputData = {
      
        'email': data?.email,
        'First Name':data?.['First Name'],
        'Last Name': data?.['Last Name'],
        'password': generatedPass,
        'role':data?.role,
        'status':data?.status
       };
   
    //  try {
        try {
          console.log('Fetching data by email...');
          const queryRef = ref(database, 'User');
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            let exist = false;
            for (const childKey in data) {
              if (data[childKey]['email'] === inputData['email']) {
                const dataRef = ref(database, `User/${childKey}`);
                // Delete the existing data (be cautious of data loss)
                await update(dataRef,inputData);
                // Set the updated data at the same reference
                exist = true
              
                break;
              }
            }
            if(exist){
                alert('Data update successfully!');
            }
          } else {
            console.warn('Data with account name not found.');
            alert('company not found')
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
    
      
    // } catch (error) {
    //   console.error('Error writing data:', error);
    //   // Handle error appropriately
    // }
    }

  const handleDelete = async (data) => {
    if (!data) {
      console.error('handleDelete: data is null');
      return; // or handle the missing data case differently
    }
  
      let inputData = {
      
        'email': data?.email
       
       };
   
    //  try {
        try {
          console.log('Fetching data by email...');
          const queryRef = ref(database, 'User');
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            let exist = false;
            for (const childKey in data) {
              if (data[childKey]['email'] === inputData['email']) {
                const dataRef = ref(database, `User/${childKey}`);
                // Delete the existing data (be cautious of data loss)
                await remove(dataRef);
                // Set the updated data at the same reference
                exist = true
              
                break;
              }
            }
            if(exist){
                alert('Data remove successfully!');
            }
          } else {
            console.warn('Data with account name not found.');
            alert('company not found')
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
    
      
    // } catch (error) {
    //   console.error('Error writing data:', error);
    //   // Handle error appropriately
    // }
    }
//   const rowSelection = (event)=>{
//     showModal()
//   }
//user status
const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },]

const options_role = [
      { value: 'Almanac', label: 'Almanac' },
      { value: 'Business', label: 'Business' },]    
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Button onClick={()=>{
        setFormData({
            ...formData, // Spread the existing formData
            firstName: ``,
            lastName: ``,
            email: ``,
            password: ``,
            status: `Active`,
            role:``
          });
       showModal()
      }
        } >Add User</Button>
      <Modal title="Add User" visible={isModalVisible}  footer={null} onCancel={handleCancel}>
      <Form form={form} initialValues={formData} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="First Name" name="firstName">
        <Input
          name="firstName"
          type="text"
          autoComplete="text"
          required
          initialvalues={formData.firstName}
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input
        name="lastName"
          type="text"
          autoComplete="text"
          initialvalues={formData.lastName}
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input
          name="email"
          type="email"
          autoComplete="email"
          initialvalues={formData.email}
          required
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Role" name="role">
        <Select
        initialvalues={formData.role}
        name='role'
        type='text'
        value={formData.role}
        options={options_role}
        />
           
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Select
        initialvalues={formData.status}
        name='status'
        type='text'
        value={formData.status}
        options={options}
        />
           
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </Modal>
      <Table
        // rowSelection={rowSelection}
        loading={loading}
        columns={[
          {
            title: "First Name",
            dataIndex: "First Name",
          },
          {
            title: "Last Name",
            dataIndex: "Last Name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
              <Button type="link" onClick={() => {
                // to uniquely identify the changing user 
                setChangeEmail(record['email'])
                 setFormData({
                ...formData, // Spread the existing formData
                firstName: `${record['First Name']}`,
                lastName: `${record['Last Name']}`,
                email: `${record['email']}`,
                password: `${record['password']}`,
                role:`${record['role']}`,
                status: `${record['status']}`
              });
            //   formData.firstName = record['First Name']
            //   formData.lastName = record['Last Name']
            //   formData.email= record['email']
            //   formData.password = record['password']
            //   formData.status = record['status']
             
            showModal()
            }}>Edit</Button> // Replace 'Edit' with desired button text
            ),
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
              <Button type="link" onClick={()=>handleRestPassword(record)}>Reset Password</Button> // Replace 'Edit' with desired button text
            ),
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
              <Button type="link" onClick={()=>{handleDelete(record)}}>Delete</Button> // Replace 'Edit' with desired button text
            ),
          },
        //   {
        //     title: "Password",
        //     dataIndex: "password",
        //   },

         
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        
      >
      </Table>
    </Space>
  );
}
export default User;