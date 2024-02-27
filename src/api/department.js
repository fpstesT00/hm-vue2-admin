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

/**
 * 新增部门
 */
export function newDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * 获取部门详情
 */
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 修改部门详情
 */
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除部门
 */

export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
