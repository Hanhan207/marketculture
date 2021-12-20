import AMapLoader from '@amap/amap-jsapi-loader'

const initMAp = async(config) =>{
    return new Promise((resolve,reject)=>{
        AMapLoader.load({
            key: "6362a535992f9fd43430a7027fa33db2", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.ControlBar"],
          }).then((AMap)=>{
              resolve(AMap)
          }).catch(err =>{
              reject(err)
          })
    })
}

export default initMAp