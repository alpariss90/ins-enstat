import axios from 'axios'


export default()=>{
    return axios.create({
        //baseURL: `http://172.16.0.40:3800/`
        baseURL: `http://localhost:2100/`
    })
}