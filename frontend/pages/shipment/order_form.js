import React from 'react';
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'


function tommorow(){
    let today = new Date()
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    if(month<10) month = '0' + month
    let day = today.getDate() + 1;
    if(day<10) day = '0'+day
    let hour = today.getHours();
    let minutes = today.getMinutes();
    if(minutes<10) minutes = '0'+minutes

    const date = year+'-'+month+'-'+day+'T'+hour+':'+minutes
    
    return date;
}

async function postToDatabase(data){
    let url = 'http://localhost:3000/api/register'
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response;
}

export default function orderShipmentForm(){
    const {register, handleSubmit} = useForm();
    const router = useRouter()

     const onSubmit = async (data) => {
         data["customer_id"] = 1;
         await postToDatabase(data).then((res) => {
            if(res.status === 200) router.push('/')
            else console.log(res.status)
         })
    }

    const min = tommorow()

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="city">City</label>
                    <input type = "text" placeholder="City"{...register("city", {required: true})}/>
                </div>
                <div>
                    <label htmlFor="zip_code">ZIP Code</label>
                    <input type = "text" placeholder="ZIP Code" {...register("zip_code", {required: true})}/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type = "text" placeholder="Address"{...register("address", {required: true})}/>
                </div>
                <div>
                    <label htmlFor="phone_number">Phone number</label>
                    <input type = "text" placeholder="Phone number"{...register("phone_number", {required: true})}/>
                </div>
                <div>
                    <label htmlFor="pickup_time">Pickup time</label>
                    <input type = "datetime-local" min={min} {...register("pickup_time", {required: true})}/>
                </div>
                <input type="submit"/>

            </form>
        </div>
    )
}
