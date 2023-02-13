

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './sign.css'
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    
    Button,
    Title,
    Text,
    
  } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    wrapper: {
      top:0,
      left:0,
      minHeight: 950,
     
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },
  
    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: 950,
      maxWidth: 450,
      paddingTop: 80,
  
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

export default function SignUp(){
    const Navigate = useNavigate();

    const[name,setname] = React.useState("")
    const[gmail,setgmail] = React.useState("")
    const[password,setpassword] = React.useState("")
    const [message, setmessage] = React.useState("")
    


    //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //     if (filter.test(gmail))


    function HandleSignUp(){

        if(name.length===0 || gmail.length===0 || password.length===0  ){
            setmessage("please fill all fields")

        }
        else{
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (filter.test(gmail)){

            

        axios.post('https://stockhub-64px.vercel.app/signup', {
            name: name,
            gmail: gmail,
            password: password
        },{headers: { 
          
          'Access-Control-Allow-Origin' : '*',
          
        },}).then((respond)=>{
            console.log(respond.data)
            if(respond.data.status== 200){
                Navigate('/sign-in')

            }
            if(respond.data.status== 409){
                setmessage("user already exist")
            }
            if(respond.data.status== 404){
                setmessage("an error has accourd")

            }
            
          


    })

    }else{
        setmessage("email invalid")
    }}
}






    const { classes } = useStyles();
  return (
    <div className="signup">
    <div className={classes.wrapper} >
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        <p>{message}</p>

        <TextInput label="Full name" placeholder="dave castro" size="md" value={name} onChange={e => setname(e.target.value)} error={ name.length===0 ? " ": false} withAsterisk/>
        
        <TextInput label="Email address" placeholder="hello@gmail.com"  mt="md" size="md" value={gmail} onChange={e => setgmail(e.target.value)} error={ gmail.length===0 ? " ": false} withAsterisk/>
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"  value={password}  onChange={e => setpassword(e.target.value)} error={ password.length===0 ? " ": false} withAsterisk/>
        
        <Button fullWidth mt="xl" size="md" onClick={HandleSignUp}>
          Login
        </Button>

        <Text align="center" mt="md">
          Already have an account?<a><Link to="/sign-in"> log in </Link></a>
          
        </Text>
      </Paper>
    </div>
    </div>

    
  )
}