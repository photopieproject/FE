import { apis } from "../../lib/axios";
import Swal from "sweetalert2";

// id 중복체크
export const __checkUserName = async (username) => {
    try {
        const data = await apis.checkUserName(username);
        console.log("username: ", username);
        console.log("data: ", data);
        if (data.data.statusCode === 200) {
            // alert(data.data.msg);
            Swal.fire("Success", data.data.msg, "succees");
        }
        return data;
    } catch (error) {
        console.log(error);
        Swal.fire("Error", "이미 사용중인 아이디입니다", "error");
        // Swal.fire("Error", error.response.data.msg, "error");
        // alert(error);
        // useSweet(1000, "error", error.response.data.msg);
    }
};

// 닉네임 중복체크
export const __checkNickname = async (nickname) => {
    try {
        const data = await apis.checkNickname(nickname);
        console.log("nickname: ", nickname);
        console.log("data: ", data);
        if (data.data.statusCode === 200) {
            Swal.fire("Success", data.data.msg, "succees");
        }
        // useSweet(1000, "success", "회원가입 성공!");
        return data;
    } catch (error) {
        Swal.fire("Error", error.response.data.msg, "error");
        // useSweet(1000, "error", error.response.data.msg);
    }
};

export const __postLogin = async (post) => {
    try {
        const data = await apis.postLogin(post);
        // const data = await axios.post("https://reqres.in/api/login", {
        //   email: "eve.holt@reqres.in",
        //   password: "cityslicka",
        // });
        // console.log("post: ", post);
        // console.log("data: ", data);
        return data;
    } catch (error) {
        console.log(error.response.data.msg);
    }
};

export const __postSignup = async (post) => {
    try {
        const data = await apis.postSignup(post);
        // console.log("post: ", post);
        // console.log("data: ", data);
        Swal.fire("Success", data.data.msg, "succees");
        // alert("회원가입 성공!");
        return data;
    } catch (error) {
        Swal.fire("Error", error.response.data.msg, "error");
        // alert("error", error.response.data.msg);
    }
};
