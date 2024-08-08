import { Avatar,Form,Input, Button, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';

import { getCustomers, getInventory } from "../../API";
import { getDatabase, ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore } from 'firebase/database';
import Password from "antd/es/input/Password";

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

 
function Customers() {
    let generatedPass = generateStrongPassword;
    const [formData, setFormData] = useState({
        firstName: '',
        firstName:'',
        email:'',
        password: `${generatedPass}`,
        });
    
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);
  const writeData = async (data) => {
    let inputData = {
        'First Name':data.com_name,
        'Last Name': data.email,
        'email': data.tel,
        'password':data.mobile,
      }
  const newRef = await push(ref(database, 'User'));
  const rf = set(newRef,inputData)
  await set(rf)
  }
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
  const onSubmit = async (e) => {
    // const writeData = async (data) => {
       writeData(formData)
       let pass = generateStrongPassword
    //    setFormData({
    //     ...formData,
    //     [password]: pass,
    //     // image: value !== undefined ? value : (files && files.length > 0 ? files[0] : null),
    //   });
    // setPassword(generateStrongPassword)
    e.preventDefault()
    alert('registered')
    // if(!isRegistering) {
    //     setIsRegistering(true)
    //     await doCreateUserWithEmailAndPassword(email, password)
    // }
}

const handleChange = (event) => {
    const { name, value, files } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    // if (!files.length) return; 
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [name]: newValue,
      // image: value !== undefined ? value : (files && files.length > 0 ? files[0] : null),
    });
    
    
  };
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Button>Add User</Button>
      <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item label="First Name" name="firstName">
        <Input
          type="text"
          autoComplete="text"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input
          type="text"
          autoComplete="text"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Space>
  );
}
export default Customers;
