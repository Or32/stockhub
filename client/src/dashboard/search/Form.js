import React from "react";
import axios from "axios";
import { Select,  NumberInput,Button,Alert } from '@mantine/core';
import UseFetchUserStock from "../API/useFetchUserStock";
import { IconAlertCircle } from '@tabler/icons';



export default function FormStock(props){
    const { user , error, loaded } = UseFetchUserStock(props.jwt);
    let token = props.jwt
    console.log(props.stock)
    const [iserror,seterror] = React.useState(false)
    const[ istry ,setistry] = React.useState(false)
const handleclick =()=>{
    (async () => {
        try {
          const response = await axios.put(
            `https://stockhub-project.herokuapp.com/${kind}`,{
                
                    'ticker':props.ticker,
                    "amount": amount,
                     'price':amount* props.price.c,
                      'all': props.stock? props.amount==props.stock.amount  ? true: false: false
            
        
            },
        {headers: {
            
            authorization: token ///jwt
            
}}
        

          );
         
        } catch (error) {
           
           if(error){
               seterror(true)
            console.log(error);
           }
            
           
        } finally {
          console.log("done")
          setistry(true);
        }
      })();

}

const [kind , setkind] = React.useState("buy");
const [amount, setAmount] = React.useState(0);
let x =(user.avialableBalance/props.price.c).toFixed(0)

console.log(parseInt((user.avialableBalance/props.price.c).toFixed(0)))

console.log(typeof amount   )
console.log(typeof props.price.c)
console.log(typeof props.ticker)




return(
    <div className="form">
        <div>
            {istry? iserror ?
            <Alert icon={<IconAlertCircle size={16} />} title="Eror" color="red">
            Unfocunatly, an error has accured, please try again.
          </Alert>:
          <Alert icon={<IconAlertCircle size={16} />} title="Approved" variant="outline">
          Transaction went threw succesfully
        </Alert> : <div></div>} 
        </div>


      <Select
        data={[
            { value: 'buy', label: 'Buy' },
            { value: 'sell', label: 'Sell' },
            
          ]}
          
          onChange={setkind}
          value= {kind}
        placeholder="pickone"
        label="kind"
        
      />
      <NumberInput label="amount"value={amount} onChange={(val) => setAmount(val)} min ={0} max={kind == "buy" ? parseInt((user.avialableBalance/props.price.c).toFixed(0)) :props.stock ? props.stock.amount: 0} />
     <h3>cost of trade: ${(amount*props.price.c).toFixed(2)}</h3>
     <Button fullWidth size="md" onClick={() => handleclick()}>
      Approve
    </Button>
    </div>
)







}