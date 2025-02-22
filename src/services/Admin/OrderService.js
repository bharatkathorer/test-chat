import '../../utils/adminAxios'
import axios from "axios";

const OrderService = {
    view: async (_id) => {
        try {
            return await axios.get(`/orders/${_id}`);
        } catch (e) {
            console.log(e);
        }
    }
}
export default OrderService;
