import { Avatar, Button, Rate, Space, Table,Modal,Input,Form,Select,useForm,Col,Row,Upload, Typography } from "antd";
import { useEffect, useState,useRef } from "react";
import { getAlmanac } from "../../API";
import { initializeApp } from 'firebase/app';
import { json, useNavigate,Link,useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import businessSectorData from '../businessSector.json'
import almanacSectorData from '../almanacSector.json'
import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get,startAt, endAt, equalTo, endBefore, update } from 'firebase/database';
import { getStorage,ref as mediaRef, uploadBytes,uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ChakraProvider, CircularProgress,useDisclosure, CircularProgressLabel } from '@chakra-ui/react'

import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
// const jsonData = businessSectorData;

// Accessing the array within the object
// const financeArray = jsonData.Finance;
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


function Register() {
// console.log(businessSectorData.Export)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get('category').toString().at(1);
  // const [options, setOptions] = useState([]);
  const [logoProgress,setLogoProgress] = useState(0);
  const [imageProgress,setImageProgress] = useState(0);
  const [videoProgress,setVideoProgress] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false); // State variable for loading icon
  const [isLogoLoading, setIsLogoLoading] = useState(false); 
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false); 
  const navigate = useNavigate();
  const [importVisibility,setImportVisibility] = useState(false)
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [data, setData] = useState(cat=='b'?businessSectorData:almanacSectorData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);


  // console.log(Object.keys(data)[0])
  // let sector_Name = Object.keys(data)
   
  const [category, setCategory] =useState([])
  
  // useState(Object.keys(data)[0]); // Initial category selected
  const [options, setOptions] = useState([
  data[category]
  ])
  // useState(data[category]); // Initial options based on selected category

  // Handle change in category selection
  const handleSubSectorChange = (value) => {
    handleChange("sub_sector",value)}
  
  const handleCategoryChange = (value) => {
    setCategory(value);
    setOptions(data[value]);
  handleChange("sector",value)} 
  
  useEffect(() => {
    // if(cat =='b'){//business
    //   setData(businessSectorData)
    //   // fetchBusinessSector()
    //  }
    //  else{
    //   setData(almanacSectorData)
    //     // fetchAlmanacSector()
    //  }
    // Function to fetch JSON data
    // window.location.reload()
  setCategory(Object.keys(data))
  // console.log(category)
 
  }, []); 
  // console.log('sectors')
  // console.log(options.)
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
    category:category,
    image:null,
    video:null,
    logo:null,
    // file: null,
  });
  const storage = useRef(getStorage());
  /// 
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // const storageRef = ref(storage.current, selectedFile); // Create a reference to the file location in storage
    // fileRef.put(selectedFile)
    // const storageRef = app.

   



    if (!selectedFile) {
      console.error('No file selected!');
      return; // Handle the case where no file is selected
    }

    // Create a reference to the file location in storage (provide a path structure)
    const storageRef = mediaRef(storage.current, `image/${selectedFile.name}`);
    // Upload the file using uploadBytesResumable for resumable uploads
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        setImageProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload progress:', progress + '%');
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setIsImageLoading(progress); 
        // Update a progress bar or UI element (if applicable)
      },
      (error) => {

        console.error('Upload failed:', error);
        setIsImageLoading(false); 
        // Handle upload errors (e.g., display error message to user)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref) // Assuming you want the download URL
          .then(downloadURL => {
            setIsImageLoading(false); 
            console.log('File uploaded successfully! Download URL:', downloadURL);
      // const { name, value, files } = event.target;
            
    setFormData({
      ...formData,
      image: selectedFile.name,
    }
    )
         console.log(formData.image)
            // Use the download URL (e.g., display it to the user)
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            // Handle download URL retrieval errors
          });
      }
    );
 

    // const  fileRef = storage
    // console.log(selectedFile)
    //  formData.logo = selectedFile.name
  };
  ///

  const handleLogoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // const storageRef = ref(storage.current, selectedFile); // Create a reference to the file location in storage
    // fileRef.put(selectedFile)
    // const storageRef = app.

   



    if (!selectedFile) {
      console.error('No file selected!');
      return; // Handle the case where no file is selected
    }
    console.log(selectedFile)
    // Create a reference to the file location in storage (provide a path structure)
    const storageRef = mediaRef(storage.current, `logo/${selectedFile.name}`);
    // Upload the file using uploadBytesResumable for resumable uploads
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        setIsLogoLoading(true); 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLogoProgress(progress);
        // console.log('Upload progress:', progress + '%');
        // Update a progress bar or UI element (if applicable)
      },
      (error) => {
        console.error('Upload failed:', error);
        // Handle upload errors (e.g., display error message to user)
      },
      () => {
        setIsLogoLoading(false); 
        getDownloadURL(uploadTask.snapshot.ref) // Assuming you want the download URL
          .then(downloadURL => {
            console.log('File uploaded successfully! Download URL:', downloadURL);
      // const { name, value, files } = event.target;
            
    setFormData({
      ...formData,
      logo: selectedFile.name,
    }
    )
         console.log(formData.image)
            // Use the download URL (e.g., display it to the user)
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            // Handle download URL retrieval errors
          });
      }
    );
 

    // const  fileRef = storage
    // console.log(selectedFile)
    //  formData.logo = selectedFile.name
  };

  //

  const handleVideoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // const storageRef = ref(storage.current, selectedFile); // Create a reference to the file location in storage
    // fileRef.put(selectedFile)
    // const storageRef = app.

   



    if (!selectedFile) {
      console.error('No file selected!');
      return; // Handle the case where no file is selected
    }

    // Create a reference to the file location in storage (provide a path structure)
    const storageRef = mediaRef(storage.current, `video/${selectedFile.name}`);
    // Upload the file using uploadBytesResumable for resumable uploads
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        setIsVideoLoading(true); 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setVideoProgress(progress)
      // progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress + '%');
        // Update a progress bar or UI element (if applicable)
      },
      (error) => {
        console.error('Upload failed:', error);
        // Handle upload errors (e.g., display error message to user)
      },
      () => {
        setIsVideoLoading(false); 
        getDownloadURL(uploadTask.snapshot.ref) // Assuming you want the download URL
          .then(downloadURL => {
            console.log('File uploaded successfully! Download URL:', downloadURL);
      // const { name, value, files } = event.target;
            
    setFormData({
      ...formData,
      video: selectedFile.name,
    }
    )
            // Use the download URL (e.g., display it to the user)
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            // Handle download URL retrieval errors
          });
      }
    );
 

    // const  fileRef = storage
    // console.log(selectedFile)
    //  formData.logo = selectedFile.name
  };
  const writeData = async (data) => {
    let inputData = {
      'Account Name':data.com_name,
      'Email': data.email,
      'Tel': data.tel,
      'Mobile':data.mobile,
      'Website':data.website,
      'Is-adv':data.image|| data.video|| data.logo!=null?'True':'False',
      'Image':data.image==null?'':data.image,
      'Profile':data.profile,
      'Sector':data.sector,
      'Sub-Sector':data.sub_sector,
      'Video':data.video==null?'':data.video,
      'longitude':data.longitude==null?'':data.longitude,
      'latitude':data. latitude==null?'':data. latitude,
      'Category':'business',
      'logo':data.logo==null?'':data.logo,
      'status':'',
     };
    //  try {
    const com = category
    // console.log(com=='business')
    // console.log(category)
      if(cat==='b'){
        try{
          
          const newRef = await push(ref(database, 'Query10'));
          const rf = set(newRef,inputData)
          await set(rf)
        }
        catch(err){
          console.log(err)
        }
        
      }
      else{
         console.log('almanac')
          formData.category = 'Almanac'
        const newRef = await push(ref(database, 'Almanac'));
      console.log('saving');
      const rf = set(newRef,inputData)
      await set(rf)
      }
      
    // } catch (error) {
    //   console.error('Error writing data:', error);
    //   // Handle error appropriately
    // }
    }
  const handleSubmit = async (event) => {
    // event.preventDefault();
  // isOpen = true;
    // Check if a file is selected (optional, uncomment if needed)
    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }
  
    // try {
      writeData(formData); 
    alert('Submitted')



      // setIsSucessModalDisplay(true)
       
    // } catch (err) {
    //   console.error('Error during upload:', err);
    // } 
    // finally {
      
    // }
  };
  
  const handleNameChange = (event) => {
    // console.log('test')
    const { name, value, files  } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    // if (!files.length) return; 
    const newValue = event.target.value.toUpperCase();
    // console.log(newValue)
    setFormData({
      ...formData,
      com_name: newValue,
      // image: value !== undefined ? value : (files && files.length > 0 ? files[0] : null),
    });
    // console.log(formData.com_name)
    
  };


  const handleChange = (fieldName,value) => {
    // const { name } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    // if (!files.length) return; 
    // const newValue = event.target.value;
    // console.log(newValue)
    setFormData({
      ...formData,
      [fieldName]: value,
      // image: value !== undefined ? value : (files && files.length > 0 ? files[0] : null),
    });
    
    
  };


  




  return (
    <ChakraProvider>

    
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Add Business</Typography.Title>
      {/* <Typography.Title >Add Register</Typography.Title>  */}
      <Form  layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Company Name" name="com_name" rules={[{ required: true, message: 'Please input company name' }]}>
            <Input value={formData.com_name} onChange={handleNameChange} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Telephone Number" name="tel">
            <Input value={formData.tel}  onChange={(event)=>handleChange("tel",event.target.value)} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Mobile Number" name="mobile">
            <Input required value={formData.mobile}  onChange={(event)=>handleChange("mobile",event.target.value)}  />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={8}>
      <Form.Item label="Email" name="email">
        <Input type="email" value={formData.email}  onChange={(event)=>handleChange("email",event.target.value)}  />
      </Form.Item>
      </Col>
      <Col span={8}>
      <Form.Item label="Website" name="website">
        <Input value={formData.website}  onChange={(event)=>handleChange("website",event.target.value)} />
      </Form.Item>
      </Col>
      <Col span={8}>
      <Form.Item label="Sector" name="sector" >
      <Select style={{ width: 200, marginLeft: 20 }} value={category}  onChange={handleCategoryChange}>
      {Object.keys(data).map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      </Form.Item>
      
      </Col>
         </Row>
         <Row gutter={16}>
         <Col span={8}>
      <Form.Item label="Sub-Sector" name="sub-sector" >
      <Select style={{ width: 200, marginLeft: 20 }} value={options} onChange={handleSubSectorChange} >
        {options.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      </Form.Item>
      </Col>
      {/* <Form.Item label="Category" name="category">
        <Select value={formData.category} onChange={handleChange}>
          <Option value="Business">Business</Option>
          <Option value="Almanac">Almanac</Option>
        </Select>
      </Form.Item> */}
       <Col span={16}>
      <Form.Item label="Profile" name="profile">
        <Input.TextArea value={formData.profile}  onChange={(event)=>handleChange("profile",event.target.value)} />
      </Form.Item>
      </Col>
        </Row>
        <Row gutter={16}>
          
         <Col span={8}>
      <Form.Item label="Latitude" name="latitude" >
        <Input value={formData.latitude}  onChange={(event)=>handleChange("latitude",event.target.value)}  />
      </Form.Item>
      </Col>
      {/* <Form.Item label="Category" name="category">
        <Select value={formData.category} onChange={handleChange}>
          <Option value="Business">Business</Option>
          <Option value="Almanac">Almanac</Option>
        </Select>
      </Form.Item> */}
       <Col span={8}>
      <Form.Item label="longitude" name="longitude">
        <Input value={formData.longitude}  onChange={(event)=>handleChange("longitude",event.target.value)}  />
      </Form.Item>
      </Col>
        </Row>
      {/* ... other rows for remaining form items */}
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
       <Row gutter={16}>
       <Col span={8}>
      <Form.Item label="logo">
        <Input
           type="file"
           id="logo"
           name="logo"
          // listType="picture"
          accept=".jpg,.png"
          onChange={handleLogoFileChange}
        >
        </Input>{isLogoLoading && <CircularProgress value={logoProgress}  />}
      </Form.Item>
      </Col>
      <Col span={8}>
      <Form.Item label="Image">
        <Input
          // name="image"
          // listType="picture"
          accept=".jpg,.png"
          onChange={handleImageFileChange}
          type="file"
          id="image"
          name="image">
          {/* <Button >Click to upload</Button> */}
        </Input>{isImageLoading && <CircularProgress value={imageProgress}  />}
      </Form.Item>
      </Col>
      <Col span={8}>
      <Form.Item label="Video">
        <Input
         type="file"
         id="video"
         name="video"
          accept=".gif"
          onChange={handleVideoFileChange}
        >
        </Input>{isVideoLoading && <CircularProgress value={videoProgress}  />}
      </Form.Item>
      </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
       {/* <Button onClick={handleSubmit}>Register</Button> */}
    </Space>
    </ChakraProvider>
  );
}
export default Register;
