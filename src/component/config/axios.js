import axios from "axios";

// ทำให้สะดวกเวลามีการเปลี่ยนแปลง Host จะได้มาแก้ที่ตรงนี้ที่เดียว และกันการเกิด duplicate code 
axios.defaults.baseURL = "http://localhost:8000"

export default axios;