import { apis } from "../../lib/axios";
import toast from "react-hot-toast";

// id 중복체크
export const __checkUserId = async (userId) => {
    try {
        const data = await apis.checkUserId(userId);
        console.log("userId: ", userId);
        console.log("data: ", data);
        return data.data.statusCode;
    } catch (error) {
        console.log(error);
    }
};

export const __postLogin = async (post) => {
    try {
        const data = await apis.postLogin(post);
        return data;
    } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.statusMsg, {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
        });
    }
};

export const __postSignup = async (post) => {
    try {
        const data = await apis.postSignup(post);

        return data;
    } catch (error) {
        toast.error(error.response.data.statusMsg, {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
        });
    }
};

export const __SMSSend = async (post) => {
    try {
        const data = await apis.smsSend(post);

        if (data.data.statusCode === 200) {
            toast.success(data.data.statusMsg, {
                style: {
                    borderRadius: "10px",
                    background: "#3a3232",
                    color: "#fffaf2",
                },
                iconTheme: {
                    primary: "#fffaf2",
                    secondary: "#3a3232",
                },
                duration: 4000,
            });
        }

        return data;
    } catch (error) {
        toast.error(error.response.data.statusMsg, {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
        });
    }
};

export const __findID = async (post) => {
    try {
        const data = await apis.findID(post);

        console.log(data);
        return data;
    } catch (error) {
        toast.error(error.response.data.statusMsg, {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
        });
    }
};

export const __findPW = async (post) => {
    try {
        const data = await apis.findPW(post);

        console.log(data);
        return data;
    } catch (error) {
        toast.error(error.response.data.statusMsg, {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
        });
    }
};

export const __resetPW = async (put) => {
    try {
        const data = await apis.resetPW(put);

        console.log(data);
        return data;
    } catch (error) {
        toast.error(error.response.data.statusMsg, {
            style: {
                borderRadius: "10px",
                background: "#fffaf2",
                color: "#3a3232",
            },
            iconTheme: {
                primary: "#3a3232",
                secondary: "#fffaf2",
            },
        });
    }
};
