import React, {useState} from 'react';
import {Stack, Box, Input, TextField, Typography, Container, Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'

export default function AddContent(){
    const [form, setForm] = useState({
        name:"", 
        src:"", 
        category:""
    });
    const nameHandler = (e) => {
        const {name, value} = e.target; 
        setForm({
            ...form,
            [name]: value
        })
    }
    const sendHandler = async(e) => {
        try{

            const data = await axios.post(
                'http://localhost:5002/admin/contents/race/enroll',
                {
                    name: form.name,
                    src: form.src,
                    category: form.category
                })
            alert("등록 완료!");
        }catch(err){

            console.log(err.message);
        }

    
    }
    return(
        <Container>
            <Box>
                <Typography colo>이상형월드컵 컨텐츠 등록</Typography>
            </Box>
            <Box component={'form'}>
                <TextField
                    required
                    label="이름"
                    onChange={nameHandler}
                    value={form.name}
                    name="name"
                />
                <TextField
                    required
                    fullWidth
                    label="콘텐츠주소"
                    onChange={nameHandler}
                    value={form.src}
                    name="src"
                />
                <TextField
                    required
                    label="카테고리"
                    onChange={nameHandler}
                    value={form.category}
                    name="category"
                />
            </Box>
            <Button 
                variant="contained" 
                endIcon={<SendIcon />}
                onClick={sendHandler} 
             >
                
                Send
            </Button>
        </Container>
    )
}