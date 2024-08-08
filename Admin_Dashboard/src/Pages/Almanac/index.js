import { Avatar, Button, Rate, Space, Table,Modal,Input,Form,Select,useForm, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAlmanac } from "../../API";
import { initializeApp } from 'firebase/app';
import { json, useNavigate,Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get,startAt, endAt, equalTo, endBefore, update } from 'firebase/database';
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


function Almanac() {

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

//Import
const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

const handleFileUpload = async () => {
  try {
    const data = await readFileAsArrayBuffer(file);
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setJsonData(jsonData);
    for(let i=0;i<jsonData.length;i++){
      const newRef = await push(ref(database, 'Almanac'));
      await set(newRef, jsonData[i]);
    }
    
    // console.log(jsonData); // You can process the JSON data here
  } catch (error) {
    console.error('Error converting Excel to JSON:', error);
  }
};

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => resolve(e.target.result);
    fileReader.onerror = (e) => reject(e.target.error);
    fileReader.readAsArrayBuffer(file);
  });
};
  //convert the json to excel and download
  const handleExport = ()=> {
     console.log('handling')
    let jsonData = dataSource
      // console.log(jsonData)
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    let fileName = `almanac_${Date()}`
    // Create hidden link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName + '.xlsx';
    link.style.display = 'none';
    document.body.appendChild(link);
  
    // Trigger download
    link.click();
  
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleClick = (item) => {
    let data = {
      com_name:item["Account Name"],
      tel:item['Tel'],
      mobile:item['Mobile'],
      email:item['Email'],
      website:item['Website'],
      sector:item['Sector'],
      sub_sector:item['Sub-Sector'],
      profile:item['Profile'],
      latitude:item['latitude'],
       longitude:item['longitude'],
      category:'almanac',
      image:item['Image'],
      video:item['Video'],
      logo:item['logo']
  
  
    }
    // let data =JSON.stringify(item) 
    // console.log(data)
    const encodedData = encodeURIComponent(JSON.stringify(data));
    // console.log(data)
      navigate(`/admin/manage?data=${encodedData}`); // Navigate to About page on click
    };
  
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        setSearchTerm(searchTerm.toUpperCase())
        try {
          const dataRef = ref(database, 'Almanac'); 
          // const dataRef_alamanac = ref(database,'Almanac')
  
          if (!searchTerm) {
            // No search term, set empty data
            setData([]);
            return;
          }
  
          const queryRef = query(dataRef, orderByChild('Account Name'),startAt(searchTerm),endAt(searchTerm !== '' ? searchTerm + '\uffff' : null), limitToFirst(3)); // Replace 'searchField' with your actual searchable field          // const queryRef_Almanac = query(dataRef_alamanac, orderByChild('Account Name'),startAfter(searchTerm), limitToFirst(10)); // Replace 'searchField' with your actual searchable field 
          const snapshot = await get(queryRef);
          // const snapshot_almanac  = await get(queryRef_Almanac)
          const fetchedData = snapshot.val() ? Object.values(snapshot.val()) : []; // Convert object to array
          // const fetchData_almanac = snapshot_almanac.val() ? Object.values(snapshot_almanac.val()) : [];
          const searchData = [...fetchedData]
          setData(searchData);
          // console.log(fetchedData)
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    getAlmanac().then((res) => {
      const convertedArray = Object.values(res);
      // console.log(convertedArray[0])
      convertedArray.sort((a, b) => a['Account Name'].localeCompare(b['Account Name']));
      // console.log(convertedArray[0])
      setDataSource(convertedArray);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Almanac</Typography.Title>
      <Button onClick={() => {
          //item.key
          navigate(`/admin/register?category=Almanac`);
        }}>Add New</Button>
      <Input placeholder="Search to manage" value={searchTerm} onChange={handleSearchChange}></Input>
      {isLoading && <p>Loading data...</p>}
    {error && <p>Error: {error}</p>}
    {data.length > 0 && (
      <ul>
        {data.map((item) => (

          <li key={data['Account Name']}>
   
       <button onClick={()=>handleClick(item)}>{item["Account Name"]}</button> 
           </li> // Replace with your data fields
        ))}
      </ul>
    )}
    {searchTerm && data.length === 0 && !isLoading && (
      <p>No results found for "{searchTerm}"</p>
    )}
     {/* const ButtonGroup = () ( */}
  <div style={{ display: 'flex', justifyContent: 'normal',gap: '20px'}}>
    {
      importVisibility &&  <Input type="file" onChange={handleFileChange} accept=".xlsx"/>
    }
    {
      importVisibility && 
      <Button onClick={()=>{handleFileUpload();setImportVisibility(false)}}>Upload and Import</Button>

    }
 
    <Button onClick={()=>{setImportVisibility(true)}}>Import</Button>
    <Button onClick={()=>handleExport()}>Export</Button>
  </div>
{/* ); */}
      <Table
        loading={loading}
        columns={[
          // {
          //   title: "Thumbnail",
          //   dataIndex: "thumbnail",
          //   render: (link) => {
          //     return <Avatar src={link} />;
          //   },
          // },
          {
            title: "Company Name",
            dataIndex: "Account Name",
          },
          {
            title: "Telephone",
            dataIndex: "Tel",
            render: (value) => <span>{value}</span>,
          },
          // {
          //   title: "Rating",
          //   dataIndex: "rating",
          //   render: (rating) => {
          //     return <Rate value={rating} allowHalf disabled />;
          //   },
          // },
          {
            title: "Mobile",
            dataIndex: "Mobile Phone",
          },
          {
            title: "Email",
            dataIndex: "E-mail",
          },

          {
            title: "advertise",
            dataIndex: "Is_adv",
          },
         
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Almanac;
