export const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
        mime = arr[0]?.match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    // console.log("arr--->", arr, "mime--->", mime, "bstr--->", bstr);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};
