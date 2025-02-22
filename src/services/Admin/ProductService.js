import "../../utils/adminAxios";
import axios from "axios";

export const ProductService = {
    store: async (data) => {
        try {
            return await axios.post('product', data);
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    },
    edit: async (_id) => {
        try {
            return await axios.get(`product/${_id}`)
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    },

    updateData: async (id, data) => {
        try {
            return await axios.put(`product/${id}`, data);
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    }

}
