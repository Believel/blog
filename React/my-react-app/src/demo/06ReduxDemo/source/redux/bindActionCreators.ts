// bindActionCreators： 主要用来将 actions 转换成 dispatch(action) 这种格式，方便进行 actions 分离，并且使代码更简洁
function bindActionCreator(creator: any, dispatch: any) {
  return (...args: any) => dispatch(creator(...args));
}
export default function bindActionCreators(creators: any, dispatch: any) {
  let obj: any = {};

  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}
