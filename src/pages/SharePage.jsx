import { useSelector } from "react-redux";

const SharePage = () => {
    const kakaoImg = useSelector((state) => state);
    console.log(kakaoImg);
    return <div>Hi~</div>;
};

export default SharePage;
