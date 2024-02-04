import HTTPService from 'services/HTTPServices'

const LawsuitProcessAPI = {
  getListLawsuit: (query) =>
    HTTPService.sendRequest('get', `api/v1/khoi-kien${query ? '?' + query : ''}`),
  getDetailLawsuit: (code) => HTTPService.sendRequest('get', `api/v1/khoi-kien/${code}`),
  updateLawsuit: (id, body) => HTTPService.sendRequest('patch', `api/v1/khoi-kien/${id}`, body),
  addLawsuit: (body) => HTTPService.sendRequest('post', 'api/v1/khoi-kien', body),
}

export default LawsuitProcessAPI
