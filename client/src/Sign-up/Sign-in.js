
import React,{useEffect} from "react";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
    TextInput,
    PasswordInput,
    
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';

export default function SignIn(props){
    const Navigate = useNavigate();

    
    const[gmail,setgmail] = React.useState("")
    const[password,setpassword] = React.useState("")
    const [message, setmessage] = React.useState("")
    const [error, seterror] = React.useState(false)





    
//     var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//     if (filter.test(gmail)) {
//         seterror(false)
//   }
//     else{
//         seterror(true)

//   }



    function HandleSignIn(){


        if(gmail.length===0 ||password.length===0){
           setmessage("feilds are empty")
            
        }

        else{
            axios.post('https://stockhub-64px.vercel.app/signin', {
            gmail: gmail,
            password: password,
        },{headers: { 
          
          'Access-Control-Allow-Origin' : '*',
          
        },}).then((respond)=>{
            if(respond.data.status === 200){
                props.setjwt(respond.data.data);
            
            Navigate('/Dashboard/performance') 
            }
            else{
                setmessage(respond.data.body)
                
            }
            
            }
        
)}}



    return(
        <div className="signin">
        <Container size={420} my={40} className="container">
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?<a><Link to="/sign-up"> creaet account </Link></a>
          </Text>
          <p>{message}</p>
        
        
       
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required  value={gmail} onChange={e => setgmail(e.target.value)}  error={ gmail.length===0 ? "email required": false}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={e => setpassword(e.target.value)}  error={ password.length===0 ? "password required": false}/>
          <Group position="apart" mt="md">
            
          </Group>
          <Button fullWidth mt="xl" onClick={HandleSignIn}>
            Sign in
          </Button>
        </Paper>
      </Container>
      </div>
    )
}