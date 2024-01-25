import HTTPService from 'services/HTTPServices'

const TUAPAPI = {
  getListTUAP: (query) =>
    HTTPService.sendRequest('get', `api/tamunganphi${query ? '?' + query : ''}`),
  //   getDetailLawsuit: (id) => HTTPService.sendRequest('get', `api/tiendokien/${id}`),
  //   updateLawsuit: (id, body) => HTTPService.sendRequest('patch', `api/tiendokien/${id}`, body),
  //   //   deleteStaff: id => HTTPService.sendRequest('delete', `api/nhanvien/${id}`),
  addTUAP: (body) => HTTPService.sendRequest('post', 'api/tamunganphi', body),
}

export default TUAPAPI
