// 数据存储以及数据导出

  // 获取数据
  export const  getData=(key: string)=>{
    let data = JSON.parse(localStorage.getItem(key) as string)||'';
    return data;
  }
  // 存储数据
  export const setData=(key: string, value:string)=>{
    localStorage.setItem(key, JSON.stringify(value));
  }
  // 删除数据
  export const removeData=(key : string)=>{
    localStorage.removeItem(key);
  }
  //清空数据
