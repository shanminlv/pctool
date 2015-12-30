$(function(){
    var c= console,$img=$(".img"),data={},height=0;

String.prototype.reduce=function(){ 
  var str="";
  str=this.substring(0,this.length-2);
  return str;
}
//切换单品专场
;(function(){
	$(".id").click(function(e){;
           switch(e.target.innerText){
           	case "单品":$("#product-id").addClass("z");
           	$(".id ul li:eq(0)").css("border","3px solid red");
           	$(".id ul li:eq(1)").css("border","3px solid transparent");
           	break;
           	case "专场":$("#product-id").removeClass("z");
           	$(".id ul li:eq(0)").css("border","3px solid transparent");
           	$(".id ul li:eq(1)").css("border","3px solid red");
           	break;
           }
	}
)
})()

//切换输出的内容
;(function(){

  $(".output ul").click(function(e){
    c.log(e.currentTarget,e.target)
    if(e.currentTarget==e.target)return;
     $target=$(e.target);
     $target.addClass("outline").siblings(".outline").removeClass("outline");
     $(".content-area").eq($target.index()).addClass("z").siblings().removeClass("z");
  }

 

)
})()

//图片加载模块
;(function(){
$img.on('dragover',function(e){
  e.preventDefault();
}).on("drop",function(e){
  e.preventDefault();
  var filelist=e.originalEvent.dataTransfer.files;
  if(!filelist[0]) return;
  if(!/jpg|jpeg/i.test(filelist[0].type)) return alert('请拖放jpg图片');
  var render=new FileReader;
  render.onloadstart=function(){$(".imgdata").html("<p>图片正在加载中</p>");}
  render.onload=function(){
     var image=new Image;
     image.src=this.result;
     image.id="loadimg";
    image.onload=function(){
      var canvas = $.extend(document.createElement('canvas'), {width:800, height:image.naturalHeight*0.8});
        var context=canvas.getContext("2d");
        context.drawImage(image,460,0,1000,image.naturalHeight,0,0,800,image.naturalHeight*0.8);

       $(".imgdata").html(canvas);
       $img.height($(".imgdata").height());
       height=$img.height();
  }
}
render.readAsDataURL(filelist[0]);
})
})()

//a标签绘图模块
;(function(){
  var top=$img.offset().top,
      left=$img.offset().left,
      x,
      y,
      w,
      h,
      str="",
      moving=false,
      drawing=false,
      downx,
      downy;

  $(window).resize(function(){
    top=$img.offset().top,left=$img.offset().left;
  });


  
  $(".a").on("mousedown",function(e){
    if(e.target!=this) return;
    drawing=true;
    downx=e.pageX;

    downy=e.pageY+$(".left").scrollTop();
  }).on("mousemove",function(e){
    if(!drawing) return;
    if(!height) return;
    if((e.pageX-downx)<40) return;
    
    moving=true;
    x=(downx-left)/800*100,y=(downy-top)/height*100;
    
   
    
    w=(e.pageX-downx)>0?(e.pageX-downx)/800*100:0;
    h=(e.pageY+$(".left").scrollTop()-downy)>0?(e.pageY+$(".left").scrollTop()-downy)/height*100:0;

    
   $(".view").show();
   $(".view").css({width:w+"%", height:h+"%", left:x+"%", top:y+"%"});
   
   
  })

//添加a标签
  $(".left").on("mouseup",function(){
    if(!moving) return;
    moving=false;
    drawing=false;
   
    
       if($("#product-id").hasClass("z")){
          $(".a").append($('<a href="#" class="product" ><b style="left:20px; top:20px;" ></b></a>').css(
            {width: w+"%", height:h+"%",
             left:x+"%", top:y+"%"}));
           
        }else{
          $(".a").append($('<a href="#" class="brand"></a>').css(
            {width: w+"%", height:h+"%",
             left:x+"%", top:y+"%"}));
           
        }
       
    $(".view").hide();
  })

//删除a
$(document).on("mousemove",function(e){e.preventDefault();}).delegate(".a a", "click", function(e){
    //点击了区域为30x30的伪元素after图标,自我删除
    if(e.offsetY<30 && e.offsetX>e.target.clientWidth-30) {
      e.target.remove();
      
    }
  });


//b标签拖动模块
;(function(){

  var a=document.getElementById("a"),
      nowlength=0,
      bx=0,
      by=0,
      bdownx=0,
      bdowny=0,
      awidth=0,
      aheight=0,
      drag=false,
      $productb;
  a.addEventListener('DOMNodeInserted', insert, false);
  function insert(){
       var lastlength=nowlength,$lastproductb=$productb,$product=$(".product");
       $productb=$(".product b"),nowlength=$productb.length;

       //取消上一次绑定的鼠标事件
      for(var i=0;i<lastlength;i++){
            $lastproductb.eq(i).unbind();
        }
       
      
      //重新为b标签绑定事件
       for (var j=0; j<nowlength; j++) {

       
           
          $productb.eq(j).mousedown(

               (function(j){
                 return function(e){
                       drag=true;
                       bdownx=$product.eq(j).offset().left;
                       bdowny=$product.eq(j).offset().top;
                       awidth=$product.eq(j).width();
                       aheight=$product.eq(j).height();
                     
                      }
                })(j)
         
        ).mousemove(
           (function(j){
                 return function(e){
                       if(!drag) return;
                       
                       e.preventDefault();

                       bx=(Math.min((e.pageX-bdownx-37)>0?(e.pageX-bdownx-37):0,awidth-75))/awidth*100;
                       by=(Math.min((e.pageY-bdowny-37)>0?(e.pageY-bdowny-37):0,aheight-75))/aheight*100;
                       
                       
                        $productb.eq(j).css({left:bx+"%",top:by+"%"})
                      }
                })(j)
        )
        $(".img").mouseup(
             function(){
              drag=false;
            
             }
        )
       };
  
  }

})();
//b标签拖动模块结束

})()//a标签拖动模块结束


//id分析模块
;(function(){
   data.id={};data.id.product=[];
   

  $("#product-id .divtext").on("blur",function(){
   var text=this.innerText,str="<table><tbody>";
   if(!text.length) return;
   //初始化单品id
   for(var x=0;x<5;x++){
        data.id.product[x]="";
    }

   var six=text.match(/\b\d{6}\b/g)|| [],eight=text.match(/\b\d{8}\b/g)|| [],row = (text.match(/\n/g)).length;
    if( six.length==eight.length&&eight.length==row*5){
           //5个专场五个单品id数据          
          //表格输出id

          for(var i=0;i<row;i++){
                str+="<tr><td style='width:15px;'>"+(i+1)+"</td>";
                for(var j=0;j<5;j++){
                      str+="<td >"+six[j+5*i]+"-"+eight[j+5*i]+"</td>";                
                }
                str+="</tr>";
                 //存储id数据并格式化
                for(var k=0;k<5;k++){
                      data.id.product[k]+='\"'+six[5*i+k]+"-"+eight[5*i+k]+'\"'+',\n'
                };            
          }
    
      
    }else if(eight.length==row&&six.length==row){
      //单品id五仓合一，例如
         for(var i=0;i<row;i++){
                str+="<tr><td style='width:15px;'>"+(i+1)+"</td>";
                str+="<td >"+six[i]+"-"+eight[i]+"</td>";   
                str+="</tr>";
                 //存储id数据并格式化
                for(var k=0;k<5;k++){
                      data.id.product[k]+='\"'+six[i]+"-"+eight[i]+'\"'+',\n'
                };            
          }
    }else if(eight.length/5==row){
          //只有单品id的8位模式
         //表格输出id
          for(var i=0;i<row;i++){
                str+="<tr><td style='width:15px;'>"+(i+1)+"</td>";
                for(var j=0;j<5;j++){
                      str+="<td >"+eight[j+5*i]+"</td>";                
                }
                str+="</tr>";
                 //存储id数据并格式化
                for(var k=0;k<5;k++){
                      data.id.product[k]+='\"'+eight[5*i+k]+'\"'+',\n'
                };            
          }

    }else if(eight.length==row){
          //只有单品id的8位模式,五仓合一
         //表格输出id
          for(var i=0;i<row;i++){
                str+="<tr><td style='width:15px;'>"+(i+1)+"</td>";
                      str+="<td >"+eight[i]+"</td>";   
                str+="</tr>";
                 //存储id数据并格式化
                for(var k=0;k<5;k++){
                      data.id.product[k]+='\"'+eight[i]+'\"'+',\n'
                };            
          }

    }else {alert("id有误");return}



 str+="</table></tbody>";

$("#product-id .divtext").html(str);     
for(var y=0;y<5;y++){
          data.id.product[y]=data.id.product[y].reduce();
  }
$(".textarea").text(data.id.product[0]);
c.log(data.id.product);

  })




  data.id.brand=[];
  
 $("#brand-id .divtext").on("blur",function(){
   var text=this.innerText,str="<table><tbody>";
   if(!text.length) return;
   var six=text.match(/\b\d{6}\b/g)|| [],row = (text.match(/\n/g)).length;
    
    //初始化单品id
   for(var x=0;x<5;x++){
        data.id.brand[x]="";
    }

    if( six.length==row*5){
           //5个专场id数据          
          //表格输出id

          for(var i=0;i<row;i++){
                str+="<tr><td style='width:15px;'>"+(i+1)+"</td>";
                for(var j=0;j<5;j++){
                      str+="<td >"+six[j+5*i]+"</td>";                
                }
                str+="</tr>";
                 //存储id数据并格式化
            
                for(var k=0;k<5;k++){
                      data.id.brand[k]+='\"'+six[5*i+k]+'\"'+',\n'
                }; 
            
          }
      
    }else if(six.length==row){
      //专场id五仓合一，例如
         for(var i=0;i<row;i++){
                str+="<tr><td style='width:15px;'>"+(i+1)+"</td>";
                str+="<td >"+six[i]+"</td>";   
                str+="</tr>";
                 //存储id数据并格式化
                for(var k=0;k<5;k++){
                      data.id.brand[k]+='\"'+six[i]+'\"'+',\n'
                };            
          }
    }else {alert("id有误");return}

   



 str+="</table></tbody>";

$("#brand-id .divtext").html(str);     
for(var y=0;y<5;y++){
          data.id.brand[y]=data.id.brand[y].reduce();
  }
$(".textarea").text(data.id.brand[0]);
c.log(data.id.brand);

  })

})()

//id模式结束

//填充输出内容模块
;(function(){

  function output(target,datatarget){
     for (var i = 0; i<5; i++) {
         target.eq(i).text(datatarget[i]);
       }
  }

   $("#button").click(function(e){
     if(!data.id.brand[0]&&!data.id.product[0]){ alert("请填入id");return};
       output($(".product-left textarea"),data.id.product);
       output($(".brand-right textarea"),data.id.brand);
      var replaceBrand=data.id.brand[0]?$(".data-brand").text():"";
      var replaceLink=$("#a").html().replace(/<\/a>/g,"</a>\n");
      for(var i=0;i<5;i++){
       var code=$("#pingou").is(":checked")?$(".data-pingou").text():$(".data-banpingou").text();
        code=code.replace(/#replaceLink/,replaceLink)
                 .replace(/#replaceBrand/,replaceBrand.replace(/#replaceBrandid/,data.id.brand[i]))
                 .replace(/#replaceProduct/,data.id.product[i]);                 
        $(".content-area").eq(i).text(code);
      }
     

  })


})()
//填充输出内容模块结束

})