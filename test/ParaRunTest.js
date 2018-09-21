function init() {
    
    ONE_WORD_LENGTH = 7;

    TIME_OUT = 500;

     //得到画布 
     views  = document.getElementById("id_viewer_overlay")
    if(views  == null) {
        window.alert("can't foudn view 'id_viewer_overlay' ");
        return;
    }
   
    parentView = document.getElementById("area_id_parent");

    actions = new Array();

    //重新刷新一下,不然iframe没有激活
  //  actions.push({"time":TIME_OUT*10,"action":"reload()"})
    //输入
    actions.push("input('123456789')");
    //删除f
    actions.push("moveXDelta(-1)");
    actions.push("selectTo(1)");
    actions.push("deleteVal()");
    
    //换行
    actions.push("moveXDelta(-2)");
    actions.push("changeLine()");
   

    //加粗
    actions.push("moveXDelta(-1);");
    actions.push("selectTo(1)");
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_BOLD);");
    //斜体
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_ITALIC);");
    //下划线
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_UNDERLINE);");
    //strike through
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_STRIKE_THROUGN);");
    //加大
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_SUPER_SCRIPT);");
    //高亮
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_HIGHTLIGHT);");
    //字体颜色
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_FONT_COLOR);");
    //段落颜色
    actions.push("clickBtnByClassName(CLASS_NAME_TOOLBAR_PARA_COLOR);");
  
    actions.push("moveXDelta(-1);");
    actions.push("selectTo(0);");
    actions.push("showContex();");
    //复制
    actions.push("clickContentMenuItem('Copy')");
    //粘贴
    actions.push("moveXDelta(1)");
    actions.push("showContex();");
    actions.push("clickContentMenuItem('Paste')");

   //输入艺术字
    actions.push("insertArcText()");
    actions.push("selectTo(0)");

    //输入数学公式
    actions.push("insertMath()");

  
    
    //执行记录变化
    actions.push("clickRecordChange()");
    actions.push("input('yes')");
    actions.push("clickRecordChange()");

    
    //---------------------执行-------------------
    //保存
    actions.push("saveFile()");



    startActions(actions);
}