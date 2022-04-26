import React, {useState, useEffect} from 'react';
import {Stack, Box, Input, TextField, Typography, Container, Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import axios from 'axios'

export default function AddContent(){
    const [form, setForm] = useState({
        name:"", 
        src:"", 
        categoryId:"",
        mediaType:"video",
        group:""
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
                    categoryId: form.categoryId,
                    mediaType: form.mediaType,
                    group: form.group
                })
            alert("등록 완료!");
        }catch(err){

            console.log(err.message);
        }
    }

    const clearHandler = () => {
        setForm({
            ...form,
            name:"", 
            src:"",
            group:"",
            mediaType:"video",
        })
    }
    useEffect(()=>{
        console.log(form);
    },[form])


    return(
        <Container>
            <Box>
                <Typography colo>이상형월드컵 컨텐츠 등록</Typography>
            </Box>
            <FormControl >
                <TextField
                    required
                    label="이름"
                    onChange={nameHandler}
                    value={form.name}
                    name="name"
                />
                <TextField
                    required
                    label="그룹"
                    onChange={nameHandler}
                    value={form.group}
                    name="group"
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
                    label="카테고리 ID"
                    onChange={nameHandler}
                    value={form.categoryId}
                    name="categoryId"
                />
                <FormLabel id="media-type-label">media type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="media-type-label"
                    value={form.mediaType}
                    onChange={nameHandler}
                    name="mediaType"
                    defaultValue={form.mediaType}
                >
                    <FormControlLabel value="video" control={<Radio />} label="video" />
                    <FormControlLabel value="image" control={<Radio />} label="image" />
                </RadioGroup>

            <Button 
                variant="contained" 
                endIcon={<SendIcon />}
                onClick={sendHandler} 
             >
                
                Send
            </Button>
            <Button
                variant="outlined"
                endIcon={<DeleteSweepIcon />}
                onClick={clearHandler}
            >
                clear
            </Button>
            </FormControl>
        </Container>
    )
}