const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const API_ROUTES = {
  FETCH_DATA: '/data',
  SUBMIT_DATA: '/'
};

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST'
};

const ERROR_MESSAGES = {
  FETCH_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SUBMIT_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const fetchData = (route, errorMessage, method = HTTP_METHODS.GET, requestBody = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body: requestBody })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => fetchData(API_ROUTES.FETCH_DATA, ERROR_MESSAGES.FETCH_DATA);
const sendData = (requestBody) => fetchData(API_ROUTES.SUBMIT_DATA, ERROR_MESSAGES.SUBMIT_DATA, HTTP_METHODS.POST, requestBody);

export { getData, sendData };
