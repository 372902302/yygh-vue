import request from '@/utils/request'

var base_api = '/admin/cmn/dict'
export default {
    getChildData: (id) =>{
        return request.get(`${base_api}/findChildData/${id}`)
    },
    base_api,
    
}