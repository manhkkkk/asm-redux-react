import axios from "axios";

const instance = axios.create({
    baseURL: "https://json-server-phanducmanh.herokuapp.com"
})

export default instance;