let user_name ='';
let endrow =3000;
let all_data = null;
let json_data = null;
let search_result = null;
let now_people = null;
let sun ;
//男女
let male=0;
let female=0;
let show_money = '';
//show_people [th15_1[太],th16_2[祖],th17_3[志],th18_4[存],th19_5[武],th20_6[達],th21_7[國],th22_8[朝],th23_9[宗],th24_10[崇]]
let sh_ary = ['15太','16祖','17志','18存','19武','20達','21國','22朝','23宗','24崇','25仁'];
//所有筆數
let all_rec=0;
//各世別人數陣列
let sh_num_ary=[0,0,0,0,0,0,0,0,0,0,0];
let show_people = {};
//google繪組織圖
//google.charts.load('current', {packages:['wordtree']});
//google.charts.setOnLoadCallback(drawSimpleNodeChart);
//var all_people_ary = [];
//end google
const url ='https://docs.google.com/spreadsheets/d/1hre_XZDiFvVskOC-_NT8s0gNiTcqpfd1hkOZRHr5Wuo/edit#gid=1817346169';
const sheet_tag ='族籍';
//var money_url='google sheet share url';
const money110_url = atob('aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMUdPNUgtRFQzRjlKQ1VDX0JxaUozZnFNemw5X3VveTQ1RVgtYnljRzlwX2cvZWRpdD91c3A9c2hhcmluZw==');
const money111_url = atob('aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMS1EQ1B2Q2ZrQ2I0ZkF5d3NjVFZ3QnY5MmNpTkpsSFUySmNDMVhwNklMa0EvZWRpdD91c3A9c2hhcmluZw==');
const money112_url ='https://docs.google.com/spreadsheets/d/1XlO4_2ywmdfU3nxi_3PFKz0Khj7kUjRuKefbpXUIBZ4/edit?usp=sharing';
const money113_url ='https://docs.google.com/spreadsheets/d/1-A1ZdY8zZAFKCAPgq_C-HRNxwDQb7dscR1m7FovJgVM/edit?usp=sharing';
//atob('aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMS1EQ1B2Q2ZrQ2I0ZkF5d3NjVFZ3QnY5MmNpTkpsSFUySmNDMVhwNklMa0EvZWRpdD91c3A9c2hhcmluZw==');
const money_sheet_tag ='丁錢';

let y110_ary =[];
let y111_ary =[];
let y112_ary =[];
let y113_ary = [];
get_all_data();
let show_name_id = document.getElementById('show_name');
let show_all_data_id = document.getElementById('show_all_data');

//隱藏id
show_name_id.style.display = 'none';
show_all_data_id.style.display = 'block';

//key enter search user name
let key_enter = document.getElementById('user_name');
key_enter.addEventListener("keypress",function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getValueInput();
    }
  });

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
    //過濾陳字
    if(user_name.length>2){
    	if(user_name.substring(0, 1)=='陳'){
    	   user_name = user_name.substring(1);
    	}
    }
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
            console.log('aaa=',search_result0);
            var a_people = null;
            var i;
            var people_number;
            var a_house;
            var show_class =`class="btn_fa"`;
            show_data =user_name+'族籍：';
            console.log('id=',search_result0.族籍號)
            //chk_money(y110_ary,search_result0.族籍號);
            ////檢查不是f開頭就 
            if(search_result0.族籍號.substr(0,1)=='f'){
                show_data = '<p class="totadata" ><a href="./before.html" target="_blank"><img src="before.png" width="800" alt="來台前" loading="lazy"></a></p>';
                //show_data = '<p class="totadata" >來台前<br> 9世⋯⋯⋯⋯⋯⋯陳公/藍氏<br>10世⋯⋯⋯⋯⋯⋯陳公/蔡氏<br>11世振榮、振華、<b>振富/吳氏</b><br>12世⋯⋯⋯⋯⋯⋯文羽/徐氏、文耀<br>13世⋯⋯⋯⋯⋯⋯元基/黃氏<br>14世⋯⋯⋯⋯⋯⋯<b>殿朝/吳氏</b>、殿碧</p>';
                console.log('來台前');
            }else{
                for (i = 1; i <= search_result0.族籍號.length; i++) {    
                    //a_people = await build_show_people(search_result.族籍號,i);
                    people_number = search_result0.族籍號.substr(0,i);
                    a_house =chk_house(people_number);
                    a_people = json_search(json_data,"族籍號",people_number);
                    //console.log('a_people=',a_people[0]);
                    if(i==search_result0.族籍號.length){
                        if(search_result0.存殁 == 1){
                            show_class =`class="btn_self"`;
                        }else{
                            show_class =`class="btn_die"`;
                        }
                    }else{
                        //console.log('a_people=',a_people);
                        if(a_people[0].存殁 == 0){
                            show_class =`class="btn_fa_die"`;
                        }else{
                            show_class =`class="btn_fa"`;
                        }
                    }
                    chk_money(people_number);
                    var show_sex_color1='';
                    var show_sex_color2='';
                    if(a_people[0].性別=='女'){
                    		show_sex_color1='<font color="red">';
                        	show_sex_color2='</font>';
                        }else{
                        	var show_sex_color1='';
                        	var show_sex_color2='';
                        }
                    show_data = show_data + `<div class='container'><button ${show_class} onclick="search_byid('${a_people[0].族籍號}')">${a_house}/${sh_ary[i-1]}/<b>${show_sex_color1+a_people[0].名+show_sex_color2}</b>/${a_people[0].族籍號}/<font color='red'>${show_money}</font><br>/配偶:${a_people[0].配偶}/父親:${a_people[0].父親}</button></div><p></p>`;                
                    console.log(a_people);
                }
                search_sun(a_people[0].族籍號);
                //console.log(sun);
                if(sun.length>0){
                    for(var x=0;x<sun.length;x++){
                        a_house =chk_house(sun[x].族籍號);
                        chk_money(sun[x].族籍號);
                        var show_sex_color1='';
                        var show_sex_color2='';
                        if(sun[x].性別=='女'){
                        	console.log('性別=',sun[x].性別);
                        	show_sex_color1='<font color="red">';
                        	show_sex_color2='</font>';
                        }else{
                        	var show_sex_color1='';
                        	var show_sex_color2='';
                        }
                        show_data = show_data+`<div class='container'><button class="btn btn-info" onclick="search_byid('${sun[x].族籍號}')">${sh_ary[i-1]}/<b>${show_sex_color1+sun[x].名+show_sex_color2}</b>/${sun[x].族籍號}/<font color='red'>${show_money}</font><br>配偶:${sun[x].配偶}/父親:${sun[x].父親}</button></div>`;
                    }
                }
            }
            //search sun
            
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

function chk_money(people_number){
    //y110
    var pos = -1;
    show_money = '';
    pos = y110_ary.indexOf(people_number);
    if(pos>-1){
        show_money = '丁110';
    }
    //y111
    pos = 0;
    if(y111_ary.length>0){
        pos = y111_ary.indexOf(people_number);
        if(pos>-1){
            show_money = show_money+'丁111';
        }
    }
    //y112
    if(y112_ary.length>0){
        pos = y112_ary.indexOf(people_number);
        if(pos>-1){
            show_money = show_money+'丁112';
        }
    }
   //y113
    if(y113_ary.length>0){
        pos = y113_ary.indexOf(people_number);
        if(pos>-1){
            show_money = show_money+'丁113';
        }
    }     
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
                    console.log(a_people[0].存殁);
                    if(a_people[0].存殁 == 1){
                        show_class =`class="btn_self"`;
                    }else{
                        show_class =`class="btn_die"`;
                    }
                }else{
                    if(a_people[0].存殁 == 1){
                        show_class =`class="btn_fa"`;
                    }else{
                        show_class =`class="btn_fa_die"`;
                    }
                }
                //chk pay money
                chk_money(people_number);
                var show_sex_color1='';
                var show_sex_color2='';
                    if(a_people[0].性別=='女'){
                        	show_sex_color1='<font color="red">';
                        	show_sex_color2='</font>';
                        }else{
                        	show_sex_color1='';
                        	show_sex_color2='';
                        }
                show_data = show_data+`<div class='container'><button ${show_class} onclick="search_byid('${a_people[0].族籍號}')">${a_house}/${sh_ary[i-1]}/${a_people[0].族籍號}/<b>${show_sex_color1+a_people[0].名+show_sex_color2}</b>/<font color='red'>${show_money}</font><br>配偶:${a_people[0].配偶}/父親:${a_people[0].父親}</button></div><p></p>`;
                console.log(a_people);
            }
            //search sun
            search_sun(a_people[0].族籍號);
            //console.log(sun);
            if(sun.length>0){
                for(var x=0;x<sun.length;x++){
                    chk_money(sun[x].族籍號);
                    console.log('存殁',sun[x].存殁);
                    var show_sex_color1='';
                    var show_sex_color2='';
                    if(sun[x].性別=='女'){
                        	console.log('性別=',sun[x].性別);
                        	show_sex_color1='<font color="red">';
                        	show_sex_color2='</font>';
                        }else{
                        	show_sex_color1='';
                        	show_sex_color2='';
                        }
                    if(sun[x].存殁 == 1){
                        show_data = show_data+`<div class='container'><button class="btn btn-info" onclick="search_byid('${sun[x].族籍號}')">${sh_ary[i-1]}/<b>${show_sex_color1+sun[x].名+show_sex_color2}</b>/${sun[x].族籍號}/<font color='red'>${show_money}</font><br>配偶:${sun[x].配偶}/父親:${sun[x].父親}</button></div>`;
                    }else{
                        show_data = show_data+`<div class='container'><button class="btn_sun_die" onclick="search_byid('${sun[x].族籍號}')">${sh_ary[i-1]}/<b>${show_sex_color1+sun[x].名+show_sex_color2}</b>/${sun[x].族籍號}/<font color='red'>${show_money}</font><br>配偶:${sun[x].配偶}/父親:${sun[x].父親}</button></div>`;                        
                    }    
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
        col: 2,
        endRow : endrow,
        endCol : 8
    };
    $.get('https://script.google.com/macros/s/AKfycbzBZXaA2Gf9-6gW0Whm-zbczf0bs6dIAk0FMyCpi7xItwMVyRRdD3koKRtZmoSeNg_MHQ/exec',a, function(data){
      var d = data.split(',');
      all_rec = 0;
      sh_num_ary=[0,0,0,0,0,0,0,0,0,0,0];
      var arr = [];
      //男女
      male = 0;
      female =0;
      var show_append ='<table>';

      //$show.append('族譜異動調整請私訊，lineID:estea8968<br><table>'); 
      for(var i=0; i<(a.endRow-a.row+1); i++){
        arr[i] = d.splice(0, (a.endCol-a.col+1)); 
        show_append = show_append+ '<tr>';
        for(var x=0;x<arr[i].length;x++){
            //統計各世人數
            if(x == 0){
                //15=1
                //console.log('aaa=',arr[i][0]);
                all_rec++;
                sh_num_ary[arr[i][0].length-1]++;
            }
            //統計男女
            if(x==3){
                if(arr[i][3]=='女'){
                    female++;
                }else{
                    male++;
                }
            }
            
            show_append = show_append+ '<td>'+arr[i][x]+'</td>';
        }
        /*
        if(arr[i][0]!=null){
        all_people_ary.push([arr[i][0],arr[i][1],arr[i][4],1,'black']);
        }*/
        //all_people_ary.push([arr[i][1],arr[i][4],arr[i][2]]);
        //console.log(sh_num_ary);
        show_append = show_append+'</tr>';
      }
      //all_people_ary.shift();
      //all_people_ary.unshift(['id', 'childLabel', 'parent', 'size', { role: 'style' }]);
      //console.log('all_people=',all_people_ary);
      show_append = show_append+'</table>';
      var show_sh_num_ary='';
      for (var i=0;i<sh_num_ary.length;i++){
        show_sh_num_ary = show_sh_num_ary+sh_ary[i]+':'+sh_num_ary[i].toString()+'人<br>';         
      }
      var before_text = '<p class="totadata" >男:'+male+'人,女:'+female+'人,共'+all_rec.toString()+'人<br>'+show_sh_num_ary+'</p>';
      //var before_people ='<p class="totadata" >來台前<br> 9世⋯⋯⋯⋯⋯⋯陳公/藍氏<br>10世⋯⋯⋯⋯⋯⋯陳公/蔡氏<br>11世振榮、振華、<b>振富/吳氏</b><br>12世⋯⋯⋯⋯⋯⋯文羽/徐氏、文耀<br>13世⋯⋯⋯⋯⋯⋯元基/黃氏<br>14世⋯⋯⋯⋯⋯⋯<b>殿朝/吳氏</b>、殿碧</p>';
      var before_people =show_data = '<p class="totadata" ><a href="./before.html" target="_blank"><img src="before.png" alt="來台前" width="800" loading="lazy"></a></p>';
      $show.append(before_text+before_people+show_append);
      all_data = arr; 
      json_data = datatoJSON(all_data) ;
    });
    //money1110 data
    var b = {
        sheetUrl : money110_url,
        sheetTag : money_sheet_tag,
        row: 2,
        col: 2,
        endRow : endrow,
        endCol : 2
    };
    $.get('https://script.google.com/macros/s/AKfycbzBZXaA2Gf9-6gW0Whm-zbczf0bs6dIAk0FMyCpi7xItwMVyRRdD3koKRtZmoSeNg_MHQ/exec',b, function(data){
      y110_ary = data.split(',');
      console.log('y110=',y110_ary);
      //json_data = datatoJSON(all_data) ;
    });
    //money111 data
    var b = {
        sheetUrl : money111_url,
        sheetTag : money_sheet_tag,
        row: 2,
        col: 2,
        endRow : endrow,
        endCol : 2
    };
    $.get('https://script.google.com/macros/s/AKfycbzBZXaA2Gf9-6gW0Whm-zbczf0bs6dIAk0FMyCpi7xItwMVyRRdD3koKRtZmoSeNg_MHQ/exec',b, function(data){
      y111_ary= data.split(',');
      //y111_ary.shift();
      console.log(y111_ary);
      //json_data = datatoJSON(all_data) ;
    });
    //money112 data
    var b = {
        sheetUrl : money112_url,
        sheetTag : money_sheet_tag,
        row: 2,
        col: 2,
        endRow : endrow,
        endCol : 2
    };
    $.get('https://script.google.com/macros/s/AKfycbzBZXaA2Gf9-6gW0Whm-zbczf0bs6dIAk0FMyCpi7xItwMVyRRdD3koKRtZmoSeNg_MHQ/exec',b, function(data){
      y112_ary= data.split(',');
      //y111_ary.shift();
      console.log('y112_ary',y112_ary);
      //json_data = datatoJSON(all_data) ;
    });
    
    //money113 data
    var b = {
        sheetUrl : money113_url,
        sheetTag : money_sheet_tag,
        row: 2,
        col: 2,
        endRow : endrow,
        endCol : 2
    };
    $.get('https://script.google.com/macros/s/AKfycbzBZXaA2Gf9-6gW0Whm-zbczf0bs6dIAk0FMyCpi7xItwMVyRRdD3koKRtZmoSeNg_MHQ/exec',b, function(data){
      y113_ary= data.split(',');
      //y111_ary.shift();
      console.log('y113_ary',y113_ary);
      //json_data = datatoJSON(all_data) ;
    });
}

function datatoJSON() {
    var result = [];
    var headers = all_data[0];
    for (var i = 1; i < all_data.length; i++) {
       if(all_data[i][0]!=null){
		var obj = {};
		var currentline = all_data[i];

		for (var j = 0; j < headers.length; j++) {
		    obj[headers[j]] = currentline[j];
		}
		result.push(obj);
        }
    }
    //return result; //JavaScript object
    console.log(result);
    return JSON.stringify(result); //JSON
}

//組織圖
/*
function drawSimpleNodeChart() {
        var nodeListData = new google.visualization.arrayToDataTable(all_people_ary);
        
        var options = {
          colors: ['black', 'black', 'black'],
          wordtree: {
            format: 'explicit',
            type: 'suffix'
          }
        };
        var wordtree = new google.visualization.WordTree(document.getElementById('wordtree_explicit'));
        wordtree.draw(nodeListData, options);
        
}*/
