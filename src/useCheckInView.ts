import { inBrowser } from "./util";
import { reactive, Ref } from "vue";

/**
 * 检查元素是否在视图中，并返回元素的位置信息
 * @param el
 * @param preLoad 预加载比例
 * @returns
 */
export const useCheckInView = (
  el: Ref,
  preLoad: number,
): {
  rect: DOMRect;
  checkInView: () => boolean;
} => {
  let rect: DOMRect = reactive({} as DOMRect);
  const getRect = () => {
    rect = el.value.getBoundingClientRect();
  };
  const checkInView = () => {
    getRect();
    return (
      inBrowser &&
      rect.top < window.innerHeight * preLoad &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth * preLoad &&
      rect.right > 0
    );
  };
  return {
    rect,
    checkInView,
  };
};
