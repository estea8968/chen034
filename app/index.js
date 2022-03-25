let user_name ='';
let endrow =3000;
let all_data = null;
let json_data = null;
let search_result = null;
let now_people = null;
let sun ;
//show_people [th15_1[太],th16_2[祖],th17_3[志],th18_4[存],th19_5[武],th20_6[達],th21_7[國],th22_8[朝],th23_9[宗],th24_10[崇]]
const sh_ary = ['15世','16世','17世','18世','19世','20世','21世','22世','23世','24世','25世']
let show_people = {};

const url ='https://docs.google.com/spreadsheets/d/1hre_XZDiFvVskOC-_NT8s0gNiTcqpfd1hkOZRHr5Wuo/edit#gid=1817346169';
const sheet_tag ='族籍';
get_all_data();
let show_name_id = document.getElementById('show_name');
let show_all_data_id = document.getElementById('show_all_data');

//隱藏id
show_name_id.style.display = 'none';
show_all_data_id.style.display = 'block';


//搜尋json
function json_search(obj,key,value) {
  //console.log(array);
  var obj = JSON.parse(obj);
  //console.log(obj.length);
  var back_data = [];
  for(var i=0;i<obj.length;i++){
      if(obj[i][key] == value){
          //return obj[i];
          back_data.push(obj[i]);
          console.log(obj[i]);
      }
  }
  return back_data;
  //console.log(results);
  //return results;
}

//取出輸入值
async function getValueInput(){
    user_name =document.getElementById('user_name').value
    //document.getElementById("show_name").innerHTML = user_name;
    //顯示id
    show_name_id.style.display = 'block';
    show_all_data_id.style.display = 'none';
    //console.log('title',json_data[0][2]);
    //找本人
    var show_data ;
    search_result = json_search(json_data,"名",user_name);
    if(search_result.length==1){
            //console.log(search_result.族籍號);
            //console.log(search_result.族籍號.length) ;
            var search_result0 =search_result[0];    
            var a_people = null;
            var i;
            var people_number;
            var a_house;
            var show_class =`class="btn_fa"`;
            show_data =user_name+'族籍：';
            for (i = 1; i <= search_result0.族籍號.length; i++) {    
                //a_people = await build_show_people(search_result.族籍號,i);
                people_number = search_result0.族籍號.substr(0,i);
                a_house =chk_house(people_number);
                a_people = json_search(json_data,"族籍號",people_number);
                if(i==search_result0.族籍號.length){
                    show_class =`class="btn_self"`;
                }
                show_data = show_data + `<div class='container'><button ${show_class} onclick="search_byid('${a_people[0].族籍號}')">${a_house}/${sh_ary[i-1]}/<b>${a_people[0].名}</b>/${a_people[0].族籍號}<br>/配偶:${a_people[0].配偶}/父親:${a_people[0].父親}</button></div><p></p>`;                
                console.log(a_people);
            }
            //search sun
            search_sun(a_people[0].族籍號);
            //console.log(sun);
            if(sun.length>0){
                for(var x=0;x<sun.length;x++){
                    a_house =chk_house(sun[x].族籍號);
                    show_data = show_data + `<div class='container'><button class="btn btn-info" onclick="search_byid('${sun[x].族籍號}')">${a_house}/${sh_ary[i-1]}/<b>${sun[x].名}</b>/${sun[x].族籍號}<br>配偶:${sun[x].配偶}/父親:${sun[x].父親}</button></div>`;
                }
            }
    }else if(search_result.length==0){
        show_data =`<p class="err" > 沒有找到${user_name}資料</p>`;
    }else {
        var a_people = null;
        var i;
        show_data ='搜尋到多筆:'+user_name;
        search_result.forEach(function(value) {
            a_house =chk_house(value.族籍號);
            show_data = show_data + `<div class='container'><button class="btn_seach" onclick="search_byid('${value.族籍號}')">${a_house}/${value.族籍號}/<b>${value.名}</b><br>配偶:${value.配偶}/父親:${value.父親}</button></div>`;
        });
    }
    document.getElementById("show_name").innerHTML = show_data;
    show_name_id.style.display = 'block';
    show_all_data_id.style.display = 'none';
     
}

function chk_house(id){
    const str1 = id.substr(0,1);
    const str2 =id.substr(0,2);
    if(str1=='a' || str1 =='c' || str1 == 'd' || str1 =='e'){
        return '上大房';
    }else{
        if(str2 == 'ba'){
            return '大房';
        }else if(str2 == 'bb'){
            return '二房';
        }else if(str2 == 'bc'){
            return '三房';
        }else if(str2 == 'bd'){
            return '四房';
        }else if(str2 == 'be'){
            return '五房';
        }else if (str1=='b'){
            return '三房';
        }

    }
}

async function search_sun(id){
    var r_people = [];
    var sun_id ='';
    let i_ary = ['0','1','2','3','4','5','6','7','8','9'];
    if(id =='b'){
        i_ary = ['0','a','b','c','d','e']
    }
        for(var i=1;i<i_ary.length;i++){
            sun_id = id+i_ary[i];
            a_people = json_search(json_data,"族籍號",sun_id);
            if(a_people.length>0){
                r_people.push(a_people[0]);
            }
        }

    console.log(r_people);
    sun = r_people;
    //return r_people;

}

async function search_byid(id){
    var a_people = null;
        var i;
        var a_house;
        var show_class = `class="btn_fa"`;
        var show_data ='族籍序：';
            for (i = 1; i <= id.length; i++) {    
                //a_people = await build_show_people(search_result.族籍號,i);
                var people_number = id.substr(0,i);
                a_house =chk_house(people_number);
                a_people = json_search(json_data,"族籍號",people_number);
                if(i == id.length){
                    show_class =`class="btn_self"`;
                }
                show_data = show_data+`<div class='container'><button ${show_class} onclick="search_byid('${a_people[0].族籍號}')">${a_house}/${sh_ary[i-1]}/${a_people[0].族籍號}/<b>${a_people[0].名}</b><br>配偶:${a_people[0].配偶}/父親:${a_people[0].父親}</button></div><p></p>`;
                console.log(a_people);
            }
            //search sun
            search_sun(a_people[0].族籍號);
            //console.log(sun);
            if(sun.length>0){
                for(var x=0;x<sun.length;x++){
                    show_data = show_data+`<div class='container'><button class="btn btn-info" onclick="search_byid('${sun[x].族籍號}')">${sh_ary[i-1]}/<b>${sun[x].名}</b>/${sun[x].族籍號}<br>配偶:${sun[x].配偶}/父親:${sun[x].父親}</button></div>`;
                }
            }
            document.getElementById("show_name").innerHTML = show_data;
            show_name_id.style.display = 'block';
            show_all_data_id.style.display = 'none';    
}

function get_all_data(){
    var $show = $('#show_all_data');
    var a = {
        sheetUrl : url,
        sheetTag : sheet_tag,
        row: 1,
        col: 1,
        endRow : endrow,
        endCol : 6
    };
    $.get('https://script.google.com/macros/s/AKfycbzBZXaA2Gf9-6gW0Whm-zbczf0bs6dIAk0FMyCpi7xItwMVyRRdD3koKRtZmoSeNg_MHQ/exec',a, function(data){
      var d = data.split(',');
      var arr = [];
      $show.append('族譜異動調整請私訊，lineID:estea8968<br><table>'); 
      for(var i=0; i<(a.endRow-a.row+1); i++){
      //  for(var i=0; i<d.length; i++){  
        arr[i] = d.splice(0, (a.endCol-a.col+1)); 
        //console.log(arr[i]);
        var show_str ='<tr>';
        for(var x=0;x<arr[i].length;x++){
            show_str = show_str +'<td>'+arr[i][x]+'</td>';
        }
        show_str = show_str +'</tr>';
        $show.append(show_str);
        //$show.append(arr[i]+'<br/>');
      }
      $show.append('</table>'); 
      all_data = arr; 
      json_data = datatoJSON(all_data) ;
    });
 
}

function datatoJSON() {
    var result = [];
    var headers = all_data[0];
    for (var i = 1; i < all_data.length; i++) {
        var obj = {};
        var currentline = all_data[i];

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    console.log(result);
    return JSON.stringify(result); //JSON
}
