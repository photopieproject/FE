import { apis } from "../../lib/axios";
import toast from "react-hot-toast";

// id 중복체크
export const __checkUserId = async (userId) => {
    try {
        const data = await apis.checkUserId(userId);
        return data.data.statusCode;
    } catch (error) {}
};

// 로그인
export const __postLogin = async (post) => {
    try {
        const data = await apis.postLogin(post);
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

// 회원가입
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

// 인증번호 보내기
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

// 아이디 찾기
export const __findID = async (post) => {
    try {
        const data = await apis.findID(post);
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

// 비밀번호 찾기
export const __findPW = async (post) => {
    try {
        const data = await apis.findPW(post);
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

// 비밀번호 재설정
export const __resetPW = async (put) => {
    try {
        const data = await apis.resetPW(put);
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

// 이메일 코드 전송
export const __emailsend = async (email) => {
    try {
        const data = await apis.sendEmail(email);
        return data;
    } catch (error) {}
};

// 인증번호 확인
export const __emailcode = async (emailcode) => {
    try {
        const data = await apis.sendEmailCode(emailcode);
        console.log("emailcode:::", emailcode);
        console.log("data: ", data);
        if (data.data.statusCode === 400) {
        }

        return data;
    } catch (error) {}
};

// 회원 탈퇴
export const __outUser = async () => {
    try {
        const data = await apis.outUser();
        console.log("data?", data);
        return data;
    } catch (error) {
        toast.error("유저 정보가 없습니다!", {
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
