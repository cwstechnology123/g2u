export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchApi = async (payload) => {
  const data = payload && payload.data ? payload.data : '';
  let headers = {}
  headers["Content-Type"] = "application/json";
  headers["x-api-key"] = process.env.NEXT_PUBLIC_G2U_API_KEY;
  if (payload.accessToken) {
    headers["authorization"] = `Bearer ${payload.accessToken}`;
  }
  // console.log(headers,data);
  let options = {}
  options.method = payload.method;
  options.headers = headers;
  options.mode = 'cors'; // no-cors, *cors, same-origin
  options.cache = 'no-cache'; // *default, no-cache, reload, force-cache, only-if-cached
  // options.api = {
  //   responseLimit: false,
  // };
  payload.method == "POST" ? options.body = JSON.stringify(data) : "";

  return await fetch(payload.url, options)
    .then(response => response.json())
    .then(returnData => {
      //console.log('returnData', returnData);
      return returnData
    })
    .catch((err) => {
      console.log("fetch err",err)
      return null;
    });
};
