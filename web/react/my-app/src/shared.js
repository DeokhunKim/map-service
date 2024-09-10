const COLOR_NUM = 4

let my_sid = ''
let my_color = ''


function getMySid(){
    return my_sid
};

function setMySid(sid){
    my_sid = sid
    my_color = getHashColor(sid);    
};


function setMyColor(color){
    my_color = color
};

function getMyColor(){
    return my_color
};

function getHashColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;  // 32비트 정수로 변환
    }
    const c = Math.abs(hash) % COLOR_NUM;  // 음수 방지를 위해 절대값으로 변환
    
    if(c == 0){
        return 'red';
    }
    else if(c == 1){
        return 'blue';
    }
    else if(c == 2){
        return 'black';
    }
    else if(c == 3){
        return 'green';
    }
}

export { getMySid, setMySid, getMyColor, setMyColor, getHashColor }