let prev_rgb="rgb(0,0,0)";
let prev_hex="#000000";

function copy(id){
    let val=document.getElementById(id).value;
    navigator.clipboard.writeText(val);
}

function hide_preview(){
    let preview=document.getElementById("colour_preview_box");
    preview.style.display="none";
}
function preview(code){
    let preview=document.getElementById("colour_preview_box");
    preview.style.backgroundColor=code;
    preview.style.display='block';
}

function simplify_rgb(code){
    code=code.slice(4,code.length-1);
    let rgb=code.split(",");
    return "rgb("+String(Math.floor(+rgb[0]))+","+String(Math.floor(+rgb[1]))+","+String(Math.floor(+rgb[2]))+")";
}

function rgb_to_hex_comp(n){ // int -> string
    let digits="0123456789abcdef";
    return digits[Math.floor(n/16)]+digits[n%16];
}
function hex_to_rgb_comp(s){ // string -> string
    let digits="0123456789abcdef";
    return String(digits.indexOf(s[0])*16+digits.indexOf(s[1]));
}

function rgb_to_hex(code){
    code=code.slice(4,code.length-1);
    let rgb=code.split(",");
    return "#"+rgb_to_hex_comp(+rgb[0])+rgb_to_hex_comp(+rgb[1])+rgb_to_hex_comp(+rgb[2]);
}
function hex_to_rgb(code){
    return "rgb("+hex_to_rgb_comp(code.slice(1,3))+","+hex_to_rgb_comp(code.slice(3,5))+","+hex_to_rgb_comp(code.slice(5,7))+")";
}

function valid_rgb(code){
    if(code.slice(0,4)!="rgb(") return 0;
    if(code[code.length-1]!=")") return 0;
    code=code.slice(4,code.length-1);
    let rgb=code.split(",");
    if(rgb.length!=3) return 0;
    if(!(0<=+rgb[0] && +rgb[0]<=255) || rgb[0].trim()=="") return 0;
    if(!(0<=+rgb[1] && +rgb[1]<=255) || rgb[1].trim()=="") return 0;
    if(!(0<=+rgb[2] && +rgb[2]<=255) || rgb[2].trim()=="") return 0;
    return 1;
}
function valid_hex(code){
    if(code.length!=7) return 0;
    if(code[0]!='#') return 0;
    if(!(('0'<=code[1] && code[1]<='9') || ('a'<=code[1] && code[1]<='f'))) return 0;
    if(!(('0'<=code[2] && code[2]<='9') || ('a'<=code[2] && code[2]<='f'))) return 0;
    if(!(('0'<=code[3] && code[3]<='9') || ('a'<=code[3] && code[3]<='f'))) return 0;
    if(!(('0'<=code[4] && code[4]<='9') || ('a'<=code[4] && code[4]<='f'))) return 0;
    if(!(('0'<=code[5] && code[5]<='9') || ('a'<=code[5] && code[5]<='f'))) return 0;
    if(!(('0'<=code[6] && code[6]<='9') || ('a'<=code[6] && code[6]<='f'))) return 0;
    return 1;
}

function try_rgb_preview(rgb_code){
    if(valid_rgb(rgb_code)) preview(rgb_code);
    else hide_preview();
}
function try_hex_preview(hex_code){
    if(valid_hex(hex_code)) preview(hex_code);
    else hide_preview();
}

function set_colour(rgb_code){
    let square=document.getElementById("colour_box");
    square.style.backgroundColor=rgb_code;

    let rgb_value=document.getElementById("rgb_value");
    rgb_value.value=prev_rgb=rgb_code;
    let hex_value=document.getElementById("hex_value");
    hex_value.value=prev_hex=rgb_to_hex(rgb_code);

    // TODO: update gradients
}

function try_set_rgb(rgb_code){
    if(valid_rgb(rgb_code)){
        hide_preview();
        set_colour(simplify_rgb(rgb_code));
    }
    else{
        hide_preview();
        let rgb_value=document.getElementById("rgb_value");
        rgb_value.value=prev_rgb;
    }
}
function try_set_hex(hex_code){
    if(valid_hex(hex_code)){
        hide_preview();
        set_colour(hex_to_rgb(hex_code));
    }
    else{
        hide_preview();
        let hex_value=document.getElementById("hex_value");
        hex_value.value=prev_hex;
    }
}