
const request = (url) => {
  return fetch(url)
    .then(res => {
       const { status } = res;
       if (status >=200 && status<300) {
         return res.json();
       } else {
         throw new Error(`HTTP Status: ${status}`);
       }
    });
};

export default request
