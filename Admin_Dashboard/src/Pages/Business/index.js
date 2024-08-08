import { Avatar, Button, Rate, Space, Table,Modal,Input,Form,Select,useForm, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory,getBusiness, getOrders } from "../../API";
import { json, useNavigate,Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt,startAt, equalTo, endBefore, update } from 'firebase/database';
import { Option } from "antd/es/mentions";
import * as XLSX from 'xlsx';
import Manage from "../Register";


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
function Business() {
  const navigate = useNavigate();
  const [importVisibility,setImportVisibility] = useState(false)
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  // const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [changeEmail,setChangeEmail] = useState('');
  const [formData, setFormData] = useState({
    com_name: '',
    tel:'',
    mobile:'',
    email: '',
    website:'', 
    profile: '',
    sector:'',
    sub_sector:'',
    latitude:'',
    longitude:'',
    category:'business',
    image:null,
    video:null,
    logo:null,
    // file: null,
  });
//   const handleSubmit = async (data) => {
//     try {
//         // console.log('Fetching data by account name...');
//         const queryRef = ref(database, 'Query10');
//         const snapshot = await get(queryRef);
//         let inputData = {
//           'Account Name':data.com_name,
//           'Email': data.email,
//           'Tel': data.tel,
//           'Mobile':data.mobile,
//           'Website':data.website,
//           'Is-adv':data.image|| data.video|| data.logo!=null?'True':'False',
//           'Image':data.image==null?'':data.image,
//           'Profile':data.profile,
//           'Sector':data.sector,
//           'Sub-Sector':data.sub_sector,
//           'Video':data.video==null?'':data.video,
//           'Category':data.category,
//           'logo':data.logo==null?'':data.logo,
//           'status':'',
//          };
//           let exist = false;

//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           for (const childKey in data) {
//             if (data[childKey]['Account Name'] === changeEmail) {
//               const dataRef = ref(database, `Query10/${childKey}`);
//               // Delete the existing data (be cautious of data loss)
//               // await remove(dataRef);
//               // Set the updated data at the same reference
//               await update(dataRef, inputData);
//               alert('Data updated successfully!')
//             //   console.log('Data updated successfully!');
//               exist = true;
//               break;
//             }
    
//           }

//           if(exist == false){
//             const newRef = await push(ref(database, 'Query10'));
//             await set(newRef, inputData);

//         // Reset form or other actions
//  //   form.resetFields();
//    alert('User registered successfully');

//           }
//         } else {
//             if(exist == false){
//                 const newRef = await push(ref(database, 'User'));
//                 await set(newRef, inputData);
    
//             // Reset form or other actions
//      //   form.resetFields();
//        alert('User registered successfully');
    
//               }
//         }
//       } catch (error) {
//         console.error('Error updating data:', error);
//       }
//       ///
//     // try {
     
    
     
//     // } catch (error) {
//     //   console.error('Error registering user:', error);
//     //   // Handle error, e.g., show error message to user
//     // }
//   };

// const handleChange = (event) => {
//     const { name, value, files } = event.target;
    
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
    
    
//   };

  // const handleDelete = async (data) => {
  //   if (!data) {
  //     console.error('handleDelete: data is null');
  //     return; // or handle the missing data case differently
  //   }
  
  //     let inputData = {
      
  //       'email': data?.email
       
  //      };
   
  //   //  try {
  //       try {
  //         console.log('Fetching data by company name...');
  //         const queryRef = ref(database, 'Query10');
  //         const snapshot = await get(queryRef);
      
  //         if (snapshot.exists()) {
  //           const data = snapshot.val();
  //           let exist = false;
  //           for (const childKey in data) {
  //             if (data[childKey]['Account Name'] === inputData['Account Name']) {
  //               const dataRef = ref(database, `Query10/${childKey}`);
  //               // Delete the existing data (be cautious of data loss)
  //               await remove(dataRef);
  //               // Set the updated data at the same reference
  //               exist = true
              
  //               break;
  //             }
  //           }
  //           if(exist){
  //               alert('Data remove successfully!');
  //           }
  //         } else {
  //           console.warn('Data with account name not found.');
  //           alert('company not found')
  //         }
  //       } catch (error) {
  //         console.error('Error updating data:', error);
  //       }
    
      
  //   // } catch (error) {
  //   //   console.error('Error writing data:', error);
  //   //   // Handle error appropriately
  //   // }
  //   }
//   const [isModalVisible, setIsModalVisible] = useState(false);

//  const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

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
      const newRef = await push(ref(database, 'Query10'));
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


//export file from db 

const handleExport = ()=> {
 let jsonData = dataSource
   // console.log(jsonData)
 const worksheet = XLSX.utils.json_to_sheet(jsonData);
 const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

 const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
 const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 let fileName = `business_directory_${Date()}`
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
    category:'business',
    image:item['Image'],
    video:item['Video'],
    logo:item['logo']


  }
  // let data =JSON.stringify(item) 
  // console.log(data)
  const encodedData = encodeURIComponent(JSON.stringify(data));
  // console.log(data)
    // navigate(`/manage?data=${encodedData}`); // Navigate to About page on click
    //how to pass company datA for editing
    navigate(`/admin/manage?data=${encodedData}`); // Navigate to About page on click
  };

useEffect(() => {
  const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setSearchTerm(searchTerm.toUpperCase())
      try {
        const dataRef = ref(database, 'Query10'); 
        // const dataRef_alamanac = ref(database,'Almanac')

        if (!searchTerm) {
          // No search term, set empty data
          setData([]);
          return;
        }

        const queryRef = query(dataRef, orderByChild('Account Name'),startAt(searchTerm),endAt(searchTerm !== '' ? searchTerm + '\uffff' : null), limitToFirst(3)); // Replace 'searchField' with your actual searchable field
        // const queryRef_Almanac = query(dataRef_alamanac, orderByChild('Account Name'),startAfter(searchTerm), limitToFirst(10)); // Replace 'searchField' with your actual searchable field 
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
    getBusiness().then((res) => {
      
      const convertedArray = Object.values(res);
      convertedArray.sort((a, b) => a['Account Name'].localeCompare(b['Account Name']));


      setDataSource(convertedArray);
      setLoading(false);
    });
  }, []);
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },]
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Business</Typography.Title>
      <Button onClick={() => {
          //item.key
          navigate("/admin/register?category='business'");
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
      <div style={{ display: 'flex', justifyContent: 'normal',gap: '20px'}}>
      {
      importVisibility &&  <Input type="file" onChange={handleFileChange} accept=".xlsx"/>
    }
    {
      importVisibility && 
      <Button onClick={()=>{handleFileUpload();setImportVisibility(false)}}>Upload and Import</Button>

    }
 
    <Button onClick={()=>{setImportVisibility(true)}}>Import</Button>
    <Button onClick={handleExport}>Export</Button>
  </div>
      {/* <Modal title="Add User" visible={isModalVisible}  footer={null} onCancel={handleCancel}>
      <Form form={form} initialValues={formData} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Company Name" name="com_name">
        <Input
          name="com_name"
          type="com_name"
          autoComplete="text"
          required
          initialvalues={formData.com_name}
          value={formData.com_name}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Telephone" name="tel">
        <Input
        name="tel"
          type="text"
          autoComplete="text"
          initialvalues={formData.tel}
          required
          value={formData.tel}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Mobile" name="mobile">
        <Input
          name="mobile"
          type="text"
          autoComplete="text"
          initialvalues={formData.mobile}
          required
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Website" name="website">
      <Input
          name="website"
          type="text"
          autoComplete="text"
          initialvalues={formData.website}
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
      </Modal> */}
      <Table
        loading={loading}
        columns={[
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
            title: "Sector",
            dataIndex: "Sector",
          },
          {
            title: "Sub-Sector",
            dataIndex: "Sub-Sector",
          },
          {
            title: "Mobile",
            dataIndex: "Mobile",
          },
          {
            title: "Email",
            dataIndex: "Email",
          },
          {
            title: "Website",
            dataIndex: "Website",
          },
          {
            title: "advertise",
            dataIndex: "Is-adv",
          },
         
          // {
          //   title: 'Action',
          //   dataIndex: 'action',
          //   render: (_, record) => (
          //     <Button type="link" onClick={() => {
          //       // to uniquely identify the changing user 
          //       setChangeEmail(record['Account Name'])
          //        setFormData({
          //         // 'Account Name':data.com_name,
          //         // 'Email': data.email,
          //         // 'Tel': data.tel,
          //         // 'Mobile':data.mobile,
          //         // 'Website':data.website,
          //         // 'Is-adv':data.image|| data.video|| data.logo!=null?'True':'False',
          //         // 'Image':data.image==null?'':data.image,
          //         // 'Profile':data.profile,
          //         // 'Sector':data.sector,
          //         // 'Sub-Sector':data.sub_sector,
          //         // 'Video':data.video==null?'':data.video,
          //         // 'Category':data.category,
          //         // 'logo':data.logo==null?'':data.logo,
          //         // 'status':'',
          //       ...formData, // Spread the existing formData
          //       com_name: `${record['Company Name']}`,
          //       tel: `${record['Telephone']}`,
          //       sector: `${record['Sector']}`,
          //       sub_sector: `${record['Sub-Sector']}`,
          //       mobile: `${record['Mobile']}`,
          //       email: `${record['Email']}`,
          //       website: `${record['Website']}`
                
          //     });
          //   //   formData.firstName = record['First Name']
          //   //   formData.lastName = record['Last Name']
          //   //   formData.email= record['email']
          //   //   formData.password = record['password']
          //   //   formData.status = record['status']
             
          //   showModal()
          //   }}>Edit</Button> // Replace 'Edit' with desired button text
          //   ),
          // },
          // {
          //   title: 'Action',
          //   dataIndex: 'action',
          //   render: (_, record) => (
          //     <Button type="link" onClick={()=>{handleDelete(record)}}>Delete</Button> // Replace 'Edit' with desired button text
          //   ),
          // },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Business;
