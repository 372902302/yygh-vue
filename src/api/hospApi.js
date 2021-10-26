import request from '@/utils/request'
import { id } from 'html-webpack-plugin/lib/chunksorter'

var base_api = '/admin/hosp/hospitalSet'
export default {
  getPageList: (current, pageSize, searchObject) => {
    return request.post(`${base_api}/findPageHospSet/${current}/${pageSize}`, searchObject)
  },
  removeById: (id) => {
    return request.delete(`${base_api}/${id}`)
  },
  removeBatch: (ids) => {
    return request.delete(`${base_api}/batchRemove`, {
      data: ids
    })
  },
  localHospSet: (id, status) => {
    return request.put(`${base_api}/lockHospitalSet/${id}/${status}`)
  },
  saveOrUpdate: (hospitalSet) => {
    return request.post(`${base_api}/saveHospital`, hospitalSet)
  },
  getHospSet: (id) => {
    return request.get(`${base_api}/getHospSet/${id}`)
  },
  updateHospSet: (hospitalSet) => {
    return request.post(`${base_api}/updateHospitalSet`,hospitalSet)
  }
}
