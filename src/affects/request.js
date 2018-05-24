
const MSG = {
  HTTP_STATUS: 'HTTP Status',
  NETWORK: 'Loading error. Please, check your network connection.'
};

const request = (url) => {
  return fetch(url)
    .then(res => {
       const { status } = res;
       return Promise.all([
          res.json(),
          Promise.resolve(status)
       ])
    })
    .then(arr => {
      const json = arr[0]
          , status = arr[1];
      if (status >=200 && status< 300) {
        return json;
      } else if (status>=400 && status<500 ){
        const { message } = json;
        throw new Error(`${MSG.HTTP_STATUS}: ${status}. ${message}`);
      } else {
        throw new Error(`${MSG.HTTP_STATUS}: ${status}`);
      }
    })
    .catch(err => {
      const { message='' } = err;
      if (message.indexOf(MSG.HTTP_STATUS) !== -1) {
        throw new Error(message);
      }
      throw new Error(`${MSG.NETWORK} ${message}`);
    })
};


export default request
