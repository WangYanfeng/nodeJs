var map;
var zoom = 15;
var lineTool;
$(function(){
    map=new TMap("mapContainer");
    map.centerAndZoom(new TLngLat(108.94366,34.26271),zoom);
    map.enableHandleMouseScroll();
    map.enableInertia();//允许鼠标地图惯性拖拽
    map.enableHandleKeyboard();//允许键盘操作
    //添加缩放平移控件 
    var controlConfig = { 
        type:'TMAP_NAVIGATION_CONTROL_LARGE',        //缩放平移控件的显示类型 
        //anchor:'TMAP_ANCHOR_TOP_LEFT'  //缩放平移控件显示的位置 
    };
    controlTool = new TNavigationControl(controlConfig);
    map.addControl(controlTool);

    var lineToolConfig = { 
        strokeColor:"blue", //折线颜色 
        strokeWeight:"3px", //折线的宽度，以像素为单位 
        strokeOpacity:0.5,  //折线的透明度，取值范围0 - 1 
        strokeStyle:"solid" //折线的样式，solid或dashed 
    }; 
    //创建测距工具对象 
    lineTool = new TPolylineTool(map,lineToolConfig); 
    //注册测距工具绘制完成后的事件 
    TEvent.addListener(lineTool,"draw",onDrawLine);
    var polyLineToolObj=document.getElementById("polyLineTool"); 
    var polyLineControl = new THtmlElementControl(polyLineToolObj);
    polyLineControl.setRight(20); 
    polyLineControl.setTop(10); 
    map.addControl(polyLineControl); 
});
function onDrawLine(bounds,line,obj){ 
    lineTool.close(); 
}