
import { authOptions } from "../api/auth/[...nextauth]/route";
import axiosInstance from "../../utils/axiosInstance"
import { getServerSession } from "next-auth";
import { useEffect } from "react";

export async function postUser() {    

    const session = await getServerSession(authOptions)
    if(session){
      try { 
      let cloud = new FormData();
      cloud.set("email", session.user.email);
      cloud.set("name", session.user.name);
      cloud.set("last_name", session.user.last_name);
      cloud.set("password", session.user.password);
      cloud.set("user_image", session.user.user_image);
      const { data } = await axiosInstance.post("/signup", cloud, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.token) {
        await axiosInstance("/protected", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        return data.token
      }
    } catch (error) {
      console.log(error);
    }
  }
}  