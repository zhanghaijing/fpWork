
	$(function(){
		//轮播图
		 picShow(picInfo);	
		
	});
	var picInfo=[{
		"img":"images/bg1.jpg",
		"title":"CHINA IMPORTED FRUITS MARKET PRICE",
		"url":"",
		"detail":"Guidance Before Quoting",
		"buttonInfo":"Read More"
	},{
		"img":"images/bg2.jpg",
		"title":"Global Fruits Arrival Data  ",
		"url":"",
		"detail":"Guidance before delivery",
		"buttonInfo":"Read More"
	},{
		"img":"images/bg3.jpg",
		"title":"Post selling<br/><span> & buying Information </span>",
		"url":"",
		"detail":"Attract new business conversation",
		"buttonInfo":"Read More"
	},{
		"img":"images/bg4.jpg",
		"title":"Industrial News  <br/> & Announcements",
		"url":"",
		"detail":"Industry news Business Promotion Campaign<br/>Intergrated Knowledge About Importing Fruits",
		"buttonInfo":"Read More"
	},{
		"img":"images/bg5.jpg",
		"title":"Company Profile Display, Registration Free to create and edit ",
		"url":"",
		"detail":"More Business Opportunites",
		"buttonInfo":"Read More"
	}];
				
			
	
	function picShow(picInfo) {
		if(!picInfo) {
			return false;
		}
		genelatePic(picInfo);
	}

	var $picShow = $('#picShow');
	var $smallNav = $('#smallNav');
	var picData = $picShow.get(0);
	
	function genelatePic(picInfo){
		var str1='',str2='';
		$picShow.add($smallNav).html('');
		for(var i=0;i<picInfo.length;i++){
			str1 += '<li class="picLi" > <img src="../images/bg1.jpg"  style="width:100%;height:auto;max-width:100%;"/><div class="wrap"><div class="title"><h2>'+picInfo[i].title +'</h2><hr class="line"/><div class="moreDetail">';
			str1 += '<a class="smalltext" href='+picInfo[i].url +'><span class="pictext2">'+picInfo[i].detail +'</span><span class="picArrow"><em>'+picInfo[i].buttonInfo +'</em><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow"></use></svg></span></a></div></div></div></li>';
			if(i==0){
				 str2 +='<li class="bg"></li>';
			}else{
				 str2 +='<li></li>';
			}
		}
		
		$picShow.html(str1);
		$smallNav.html(str2);
		picData.complete=true;
		if(!picData.complete){
			return false;
		}
		
		picData.len = picInfo.length;
		picData.num = -1;
		
		scrollPic();
		
		$('#boxPrev').click(function(){
			clearInterval(picData.time);
			picData.num = $("#smallNav .bg").index();
			if(picData.num==0){
				picData.num = picData.len-1;
			}else{
				picData.num =picData.num-1;
			}
			changePic(picData.num);
		});
		$('#boxNext').click(function(){
			clearInterval(picData.time);
			picData.num = $("#smallNav .bg").index();
			picData.num= (picData.num +1)% picData.len;
			changePic(picData.num );	
		});
		
				$("#smallNav li").each(function(i,elem){
			
			$('#picShow li').eq(i).attr("id","pic"+i);
			$(elem).click(function(){
				var index = $(this).index();
				changePic(index );
			});
		});
		
		
	}

			
	function scrollPic(){
			
		//autoPic();



			
		$("#smallNav li").hover(function(){
			clearInterval(picData.time);
		},function(){
			autoPic();
		})
	}
			
			
	function autoPic(){
		picData.time=setInterval(function(){
			junmper()
		},6000);
	}
			
	function junmper() {
		picData.num++;
		if(picData.num > picData.len) {
			picData.num  = 0;
		}

		changePic(picData.num);

	}

	function changePic(index) {

				var $target = $(".nav ul li").eq(index);
				var $target2 = $(".pic ul li").eq(index);
				$target.addClass("bg").siblings().removeClass("bg");
				$target2.fadeIn().siblings().hide();
		

			}