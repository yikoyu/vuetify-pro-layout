/*
 * @Author: yikoyu
 * @Date: 2021-09-22 13:39:23
 * @Last Modified by: yikoyu
 * @Last Modified time: 2022-07-20 10:43:32
 */
import { onMounted, onUnmounted, Ref } from 'vue-demi'
import throttle from 'lodash.throttle'

const WAIT_TIME = 40

/**
 * @description 监听 body尺寸变化，开启 keep-alive 时，切换页面后会取消监听，回来之后重新进行监听
 * @export
 * @param {(Ref<Element | null>)} el
 * @param {ResizeObserverCallback} fn
 * @param {number} [wait=WAIT_TIME]
 */
export function useResizeObserver(el: Ref<Element | null>, fn: ResizeObserverCallback, wait: number = WAIT_TIME) {
  const resize = new ResizeObserver(throttle(fn, wait))

  onMounted(() => {
    if (el.value) resize.observe(el.value)
  })

  onUnmounted(() => {
    if (el.value) resize.unobserve(el.value)
  })
}
