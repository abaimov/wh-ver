import axios from "axios";

export const ApiBot = {
    async sendMessage(data: any) {
        await axios.post('/api/sendMessage', data)
    }
}