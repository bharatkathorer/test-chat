import "../../utils/adminAxios";
import axios from "axios";


export const AuthService = {

    login: async (data) => {
        try {
            return await axios.post('/login', data);
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    },

    logout: async () => {
        try {
            return await axios.post('/logout');
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    }

}
