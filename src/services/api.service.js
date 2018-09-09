const host = 'http://localhost:9090/';
const baseUrl = `${host}api/`;

const heroUrl = `${baseUrl}heroes/`;
const villainUrl = `${baseUrl}villains/`;

const convertParamsToRESTfulUrlParamsStr = params => {
  const strArr = ['?'];

  // Here params is simply a object
  // , like a custom object { 'ordering': '-progress_update_time' }
  // , or a ParamMap object converted by convertParamsToObject
  for (const [key, value] of Object.entries(params)) {
    strArr.push(key + '=' + value);
    strArr.push('&');
  }
  strArr.pop();

  return strArr.join('');
};

const ApiServive = {
  heroUrl,
  villainUrl,
  convertParamsToRESTfulUrlParamsStr
};

module.exports = ApiServive;
