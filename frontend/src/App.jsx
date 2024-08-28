import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from './axios.js'
import React,{ useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [contents, setContents] = useState([])
  const [value, setValue] = useState("")
  const [updatedValue, setUpdatedValue] = useState({
    id: "",
    value: ""
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id,content) => {
    setUpdatedValue({id: id,value: content})
    setOpen(true)
  };
  const handleClose = () => {
    setUpdatedValue({id: "",value: ""})
    setOpen(false)
  };
  
  const fetchContent = async () =>{
    try {
      const res = await axios.get('/api/getAll')
      setContents(res.data?.contents)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteContent = async (id)=>{
    try {
      await axios.delete(`/api/delete/${id}`)
      fetchContent()
    } catch (error) {
      console.log(error)
    }
  }

  const addContent = async ()=>{
    try {
      if(value.trim() === ""){
        alert("fill the form")
        return
      }
      const postData = {
        content: value.trim()
      }
      await axios.post('/api/create',postData)
      fetchContent()
    } catch (error) {
      console.log(error)
    }
  }

  const updateContent = async ()=>{
    if(updatedValue.value.trim() === ""){
      alert("fill the form")
      return
    }

    try {
      const putData = {
        content: updatedValue.value.trim()
      }
  
      await axios.put(`/api/update/${updatedValue.id}`,putData)
      fetchContent()
      handleClose()
    } catch (error) {
     console.log(error) 
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-2/5 h-5/6 bg-gray-500 rounded-lg">
            <div className="flex flex-col gap-7">
              <div className="flex justify-center text-4xl font-semibold">crud app</div>
              <div className="flex justify-center gap-4">
                <TextField id="standard-basic" label="Standard" variant="standard" value={value} onChange={(e)=> setValue(e.target.value)} />
                <Button variant="contained" size="large" onClick={addContent}>Add</Button>
              </div>
            </div>
            <div className="w-full p-5 flex flex-col gap-4">
              {contents?.map((content)=>(
                <div key={content._id} className="bg-green-600 w-full h-14 flex justify-between items-center p-2">
                <div>{content.content}</div>
                <div className="flex gap-4">
                  <FaEdit onClick={()=>handleOpen(content._id, content.content)} className="cursor-pointer"/>
                  <MdDelete onClick={()=> deleteContent(content._id)} className="cursor-pointer" />
                </div>
              </div>
              ))}
            </div>
        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="flex flex-col items-center justify-center gap-4">
          <TextField id="standard-basic" label="Standard" variant="standard" value={updatedValue.value} onChange={(e)=> setUpdatedValue(prevState => ({
            ...prevState,
            value: e.target.value
          }))} />
          <Button variant="contained" size="large" onClick={updateContent}>Add</Button>
        </div>
        </Box>
      </Modal>
      </div>
    </>
  )
}

export default App
