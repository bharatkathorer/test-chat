import "../../utils/adminAxios";
import axios from "axios";

export const CategoryService = {
    index: async () => {
        try {
            return await axios.get('category');
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    },
    store: async (data) => {
        try {
            return await axios.post('category', data);
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    },
    edit: async (_id) => {
        try {
            return await axios.get(`category/${_id}`)
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    },

    updateData: async (id, data) => {
        try {
            return await axios.put(`category/${id}`, data);
        } catch (e) {
            console.log(e);
            alert('something whents wrong');
        }
    }

}
