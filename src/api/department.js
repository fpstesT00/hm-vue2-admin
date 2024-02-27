import request from '@/utils/request'
/**
* 获取部门列表
*/
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

/**
 * 获取部门负责人数据
 */
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
