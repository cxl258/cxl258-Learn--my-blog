import request from "../utils/request";

// 注册功能实现
export const register = (data: any) => {
  return request.request({
    url: "/reguser",
    method: "post",
    data,
  });
};
// 登录功能实现
export const login = (data: any) => {
  return request.request({
    url: "/login",
    method: "post",
    data,
  });
};
// 获取随机一句话
export const yiyan = () => {
  return request.request({
    url: "/yiyan",
    method: "get",
  });
};
// 获取 图片
export const getImg = (data: any) => {
  return request.request({
    url: "/getalbum",
    method: "post",
    data,
  });
};
