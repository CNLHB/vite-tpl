``` js
// Enable VS Code type checking for this file (optional):
// add `// @ts-check` at top of the file or enable checkJs in jsconfig.json
import { date } from '@xysfe/util'

/**
 * @typedef {Object} AreaInfo
 * @property {string} provinceName
 * @property {string} [areaName]
 */
/**
 * @typedef {Object} AppointmentItem
 * @property {number} [addtime] - create time (seconds)
 * @property {string|number} [status]
 * @property {AreaInfo[]} [areaInfo]
 * @property {number[]} [preferredTimes] - array of unix seconds
 * @property {number} [mtime]
 * @property {number} [appointmentTime]
 * @property {string|number} [id]
 * @property {string|number} [recordingId]
 * @property {string} [recordingName]
 * @property {string} [recordingUrl]
 * @property {string} [cancelReason]
 */

// /**
//  * 将后端的预约记录项转换为表格使用的行数据
//  * @param {Object} item - 单条后端返回数据
//  * @param {Array} reserveStatusOptions - 状态映射数组，格式 [{label, value}, ...]
//  * @returns {Object} 表格行对象
//  */
/**
 * 将后端的预约记录项转换为表格使用的行数据
 * @param {AppointmentItem} [item={}] - 后端单条记录
 * @param {Array<{label:string,value:any}>} reserveStatusOptions - 状态映射数组
 * @returns {TransformedAppointment} 表格行对象
 */
export function transformAppointmentItem (item = {}, reserveStatusOptions = []) {
  const submitTime = item.addtime ? date.format(item.addtime * 1000) : ''
  const statusStr = getStatusLabel(reserveStatusOptions, item.status)
  const regionStr = (item.areaInfo || []).map((are) => `${are.provinceName}-${are.areaName}`).join('-')
  const preferredTimesStr = (item.preferredTimes || []).map((t) => date.format(t * 1000))
  const mtimeStr = item.mtime ? date.format(item.mtime * 1000) : ''
  const doubleRecordTime = item.appointmentTime ? date.format(item.appointmentTime * 1000) : ''
  return {
    submitTime,
    statusStr,
    region_str: regionStr,
    preferredTimes_str: preferredTimesStr,
    mtime_str: mtimeStr,
    doubleRecordTime,
    ...item
  }
}

/**
 * 根据状态值从 options 中查找 label
 * @param {Array} options - 状态选项列表，格式 [{ label, value }]
 * @param {String|Number} value - 要查找的状态值
 * @returns {String} 对应的 label，找不到返回原始 value
 */
export function getStatusLabel (options = [], value) {
  if (!Array.isArray(options)) return value
  const found = options.find((opt) => String(opt.value) === String(value))
  return found ? found.label : value
}

export default transformAppointmentItem

/**
 * 转换后表格行的类型定义，包含原始 `AppointmentItem` 字段（便于 IDE 自动完成）
 * @typedef {AppointmentItem & {
 *   submitTime: string,
 *   statusStr: string,
 *   region_str: string,
 *   preferredTimes_str: string[],
 *   mtime_str: string,
 *   doubleRecordTime: string,
 *   raw?: Object.<string, any>
 * }} TransformedAppointment
 */


```