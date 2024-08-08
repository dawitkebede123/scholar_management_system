import { Avatar, Button, Rate, Space, Table,Modal,Input,Form,Select,useForm, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAlmanac } from "../../API";
import { initializeApp } from 'firebase/app';
import { json, useNavigate,Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get,startAt, endAt, equalTo, endBefore, update } from 'firebase/database';
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";


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


function Announcement() {

  const navigate = useNavigate();
  const [importVisibility,setImportVisibility] = useState(false)
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);


  const [formData, setFormData] = useState({
    title: '',
    description:'',
  })

  const handleSubmit = async (event) => {
    alert('Submitted')

    let inputData = {
      'description': formData.description,
      'title':formData.title,
     
     };
    //  try {
     
  
        const newRef = await push(ref(database, 'Announcement'));
      const rf = set(newRef,inputData)
      await set(rf)   
      alert('saved')

       
  
  };

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
      <Typography.Title level={4}>Add Announcement</Typography.Title>
      {/* <Typography.Title >Add Announcement</Typography.Title>  */}
      <h3>Title</h3>
      <Input style={{ width: '300px' }} 
        type="text"
        id="title"
        name="title"
      value={formData.title}
      onChange={handleChange}
      ></Input>
      <h3>description</h3>
      <TextArea 
        type="text"
        id="description"
        name="description"
      value={formData.description}
      onChange={handleChange}
      />
       <Button onClick={handleSubmit}>Announce</Button>
    </Space>
  );
}
export default Announcement;
