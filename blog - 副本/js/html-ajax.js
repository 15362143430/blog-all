//文章获取
window.onload = function(){
		$.ajax({
		type:"get",
		url:"http://47.100.137.31:3003/article",
		async:true,
		success(data){
			console.log(data);
			var latelyArticle = document.querySelectorAll("#catalog ul a")
			for(let i = 0;i<latelyArticle.length;i++){			
				latelyArticle[i].innerHTML = data[i].title;
				latelyArticle[i].onclick = function() {
					$.ajax({
						type: "get",
						url: "http://47.100.137.31:3003/article/watch2/" + this.innerHTML,
						async: true,
						success(data) {
							console.log(data.id);
							window.open("http://47.100.137.31/article/index.html?id=" + data.id)
						},
						error(msg) {
							console.log(msg)
						}
					});
				}
			}
		},
		error(msg){
			console.log(msg);
		}
	});
	
	
	$.ajax({
		type:"get",
		url:"http://47.100.137.31:3003/article/html",
		async:true,
		success(data){
			console.log(data);
			var articleBody = document.getElementById("article-body");
			for(var i = 0;i<data.length;i++){
				var div =document.createElement("div");
				div.className = "article-content";
				var reg1 = new RegExp("T","g");
				var reg2 = new RegExp(".000Z","g");
				var addtime = data[i].addtime.replace(reg1," ").replace(reg2,"");
				div.innerHTML = '<img src="../img/blogger.png"/><ul><h3><a href="javascript:;">'+data[i].title+'</a></h3><p class="neirong">'+data[i].body+'</p><p><span><i class="iconfont">&#xe64f;</i><a href="http://47.100.137.31/html-article/index.html" class="type">'+data[i].type+'</a></span><span><i class="iconfont">&#xe63b;</i><i class="date">'+addtime+'</i></span></p></ul>'
				articleBody.appendChild(div);
			}
			var tit = document.getElementById("article-body").querySelectorAll("h3>a");
			for(let l = 0; l < tit.length; l++) {
						tit[l].onclick = function() {
//							alert(typeof this.innerHTML);
							$.ajax({
								type:"get",
								url:"http://47.100.137.31:3003/article/watch2/"+this.innerHTML,
								async:true,
								success(data){
									console.log(data.id);
									window.open("http://47.100.137.31/article/index.html?id="+ data.id)
								},
								error(msg){
									console.log(msg)
								}
							});
							
						}
					}
		},
		error(msg){
			console.log(msg);
		}
	});
	
	
}

//<div class="article-content">
//			<img src="../img/blogger.png"/>
//					<ul>
//						<h3><a href="#">当父母是一场旅行</a></h3>
//							<p class="neirong">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
//							<p><span><i class="iconfont">&#xe64f;</i><a href="#" class="type">Javascript</a></span><span><i class="iconfont">&#xe63b;</i><i class="date">2019-10-10 15:15:30</i></span></p>
//							</ul>
//							</div>