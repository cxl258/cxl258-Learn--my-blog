import request from "../utils/request";

// 注册功能实现
export const register = (data: any) => {
  return request.request({
    url: "/api/reguser",
    method: "post",
    data,
  });
};
// 登录功能实现
export const login = (data: any) => {
  return request.request({
    url: "/api/login",
    method: "post",
    data,
  });
};
// 获取随机一句话
export const yiyan = () => {
  return request.request({
    url: "/api/yiiyan",
    method: "get",
  });
};
