import HTTPService from 'services/HTTPServices'

const JudgmentAPI = {
  addJudgment: (body) => HTTPService.sendRequest('post', 'api/tiendothihanhan', body),
  getJudgments: (query) =>
    HTTPService.sendRequest('get', `api/tiendothihanhan${query ? '?' + query : ''}`),
  getDetailJudgment: (id) => HTTPService.sendRequest('get', `api/tiendothihanhan/${id}`),
  updateJudgment: (id, body) => HTTPService.sendRequest('patch', `api/tiendothihanhan/${id}`, body),
}

export default JudgmentAPI
