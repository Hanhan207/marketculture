
const AMap = window.AMap;

const initMap = {
    zoom:12,
    center: [116.397428, 39.90923], //中心点坐标
    pitch: 50,
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    viewMode: "3D", //开启3D视图,默认为关闭
    buildingAnimation: true, //楼块出现是否带动画
    expandZoomRange: true,
    zooms: [3, 20],
    scrollWheel: true,
    mapStyle: "amap://styles/2c24c72703450fe5ca6b35b188ec69c1",
}
const map = new AMap.Map("mapBox", {
    //启动3D地图
    zoom: 12, //级别
    center: [116.397428, 39.90923], //中心点坐标
    pitch: 50,
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    viewMode: "3D", //开启3D视图,默认为关闭
    buildingAnimation: true, //楼块出现是否带动画
    expandZoomRange: true,
    zooms: [3, 20],
    scrollWheel: true,
    mapStyle: "amap://styles/2c24c72703450fe5ca6b35b188ec69c1",
  });

  AMap.plugin(["AMap.ControlBar"], function () {
    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    map.addControl(
      new AMap.ControlBar({
        showZoomBar: false,
        showControlButton: true,
        position: {
          right: "10px",
          top: "10px",
        },
      })
    );
  });

export default map