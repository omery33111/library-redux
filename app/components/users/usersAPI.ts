import { UserIns } from "@/app/models/User";
import axios from "axios";



export const getUsers = async () => {
    return new Promise<{ data: UserIns[] }>((resolve) =>
      axios.get(`https://randomuser.me/api/?results=12`).then((res) => resolve({ data: res.data.results }))
    );
}