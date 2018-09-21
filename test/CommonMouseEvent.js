

CLASS_NAME_TOOLBAR_BOLD = "btn-icon btn-bold";
CLASS_NAME_TOOLBAR_ITALIC = "btn-icon btn-italic";
CLASS_NAME_TOOLBAR_UNDERLINE = "btn-icon btn-underline";
CLASS_NAME_TOOLBAR_STRIKE_THROUGN = "btn-icon btn-strikeout";
CLASS_NAME_TOOLBAR_SUPER_SCRIPT = "btn-icon btn-superscript";
CLASS_NAME_TOOLBAR_SUB_SCRIPT = "btn-icon btn-subscript";
CLASS_NAME_TOOLBAR_HIGHTLIGHT = "btn-icon btn-highlight";
CLASS_NAME_TOOLBAR_FONT_COLOR ="btn-icon btn-fontcolor";
CLASS_NAME_TOOLBAR_PARA_COLOR ="btn-icon btn-paracolor";
LEFT_BUTTON = 0;
RIGHT_BUTTON = 2;
 ONE_WORD_LENGTH = 7;

    TIME_OUT = 500;



function startActions(actions) {


    if(actions.length <= 0) {
        return;
    }
    action = actions.shift();
    timeOut = TIME_OUT;
    if(action.time != null) {
        timeOut = action.time;
        action = action.action;
    }

    setTimeout(action,0);
    
    setTimeout("startActions(actions)", TIME_OUT);

}

function clickContentMenuItem(ItemContentText) {
    item = clickContentMenuItems([ItemContentText]);
}

function clickContentMenuItems(ItemContentTexts) {
    menus = document.getElementsByClassName("dropdown-menu");
    for(index=0;index<ItemContentTexts.length;index++){
        item = findMenuItem(ItemContentTexts[index], menus);
        if(item != null) {
            foundItems[index] = item;
        } else {
            break;
        }
        if(index < ItemContentTexts.length-1) {
            menus = item.getElementsByClassName("dropdown-menu");
        }
    }
    if(item != null) {
        item.click();
    }
}

function findMenuItem(ItemContentText, menus) {
    for( i=0;i<menus.length;i++) {
        for(j=0;j< menus[i].children.length;j++){
            if(ItemContentText == menus[i].children[j].textContent) {
                return menus[i].children[j];
            } else if(menus[i].children[j].className == "dropdown-submenu") {
                console.log("i "+i+ "  class "+menus[i].children[j].class);
                if(menus[i].children[j].children[0].textContent == ItemContentText) {
                    return menus[i].children[j];
                }
            }
        }
    }
}

function clickBtnByClassName(name) {
    document.getElementsByClassName(name)[0].click()
}

function moveXDelta(index=1) {
    clickArea(index, LEFT_BUTTON);
}

function clickArea(index=1, BUTTON) {
    parentView = document.getElementById("area_id_parent");
    clickX = parentView.offsetLeft+ONE_WORD_LENGTH*index //当前位置下一个字符
    clickY = parentView.offsetTop-50 //当前行
    click(clickX, clickY, BUTTON);
}

function insertArcText() {
    $("#id-toolbar-btn-inserttext .dataview.inner.ps-container.canfocused div:first").click();
}

function insertMath(index=22) {
    $("#id-toolbar-btn-insertequation li:first .dropdown-menu .item.disabled")[index].click();
}


function clickRecordChange() {
    review = document.getElementsByClassName("btn-icon btn-ic-review")[0];
    if (review == null) {
        document.getElementsByClassName("btn-icon btn-ic-changes")[0];
    }
    else{
        review.click()
    }
}

function selectTo(index=0,  button=LEFT_BUTTON) {
    parentView = document.getElementById("area_id_parent");
    startX=parentView.offsetLeft;
    startY = parentView.offsetTop-50 //当前行
    endX = startX+ONE_WORD_LENGTH*(index+1) //当前位置下一个字符
    endY = startY; //当前行
    select(startX, startY, endX, endY, button);
}

function showContex() {
    clickArea(0, RIGHT_BUTTON);
}

function click(x, y,button=LEFT_BUTTON) {
    views  = document.getElementById("id_viewer_overlay")
    eventDown = document.createEvent("MouseEvents");
    eventDown.initMouseEvent("mousedown",true,true,window,0,  
        x,y,x,y,false,false,false,false,button,null); 

    eventUp = document.createEvent("MouseEvents");
    eventUp.initMouseEvent("mouseup",true,true,window,0,  
        x,y,x,y,false,false,false,false,button,null); 

    views.onmousedown(eventDown, true);
    views.onmouseup(eventUp, true);
} 

function select(startX, startY, endX, endY) {

    views  = document.getElementById("id_viewer_overlay");

    eventDown = document.createEvent("MouseEvents");
    eventDown.initMouseEvent("mousedown",true,true,window,0,  
        startX,startY,startX,startY,false,false,false,false,0,null); 

    eventUp = document.createEvent("MouseEvents");
    eventUp.initMouseEvent("mouseup",true,true,window,0,  
        endX,endY,endX,endY,false,false,false,false,0,null); 

    views.onmousedown(eventDown, true);
    views.onmouseup(eventUp, true);

}


function input(text){
    for(var i=0;i<text.length;i++) {
         keyCode  = text[i].charCodeAt(); 
         textArea = getTextArea();
         keyPressEvent = createKeyboardEvent("Keypress", keyCode);
         textArea.onkeydown(keyPressEvent);
         textArea.onkeypress(keyPressEvent);
    }
}

function deleteVal() {

    keyDownEvent(46);
}

function changeLine() {
    keyDownEvent(13);
}


function keyDownEvent(keyCode) {
    textArea = getTextArea();
    event = createKeyboardEvent("Keydown", keyCode) ;  
     textArea.onkeydown(event);
}

function createKeyboardEvent(eventName, keyCdoeVal, ctrlKey = false) {

     
    var event = document.createEvent("KeyboardEvent")
    event.initKeyboardEvent(eventName,true, true,document.defaultView, "a",0, "Shift", 0)
    Object.defineProperty(event, 'which',{get: function(){return this.keyCodeVal;}});
    Object.defineProperty(event, 'keyCode',{get: function(){return this.keyCodeVal;}});
    Object.defineProperty(event, 'ctrlKey',{get: function(){return this.ctrlKeyVal;}});
    event.ctrlKeyVal = ctrlKey;
    event.keyCodeVal = keyCdoeVal; //对应3
    return event;
}

function getTextArea() {
    textArea = document.getElementsByTagName("textarea");//textArea[2] 对应 area_id,也就是输入框
    return  textArea[2];
}

function saveFile() {
    document.getElementById("left-btn-file").click();
    document.getElementsByClassName("btn-doc-format img-doc-format docx")[0].click();
}

function reload() {
    document.location.reload();
}