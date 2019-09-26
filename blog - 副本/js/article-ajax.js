//文章获取
window.onload = function() {
	console.log(typeof location.search.slice(4));
	$.ajax({
		type: "get",
		url: "http://47.100.137.31:3003/article",
		async: true,
		success(data) {
			console.log(data);
			var latelyArticle = document.querySelectorAll("#catalog ul a")
			for(var i = 0; i < latelyArticle.length; i++) {
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
		error(msg) {
			console.log(msg);
		}
	});

	$.ajax({
		type: "get",
		url: "http://47.100.137.31:3003/article/watch/" + location.search.slice(4),
		async: true,
		success(data) {
			console.log(data);
			var typea = document.getElementById('typea')
			typea.innerHTML = data[0].type;
			if(data[0].type == "HTML") {
				typea.href = "http://47.100.137.31/html-article/index.html"
			} else if(data[0].type == "CSS") {
				typea.href = "http://47.100.137.31/css-article/index.html"
			} else if(data[0].type == "JavaScript") {
				typea.href = "http://47.100.137.31/JavaScript-article/index.html"
			} else if(data[0].type == "Vue") {
				typea.href = "http://47.100.137.31/vue-article/index.html"
			} else if(data[0].type == "Nodejs") {
				typea.href = "http://47.100.137.31/nodejs-article/index.html"
			} else if(data[0].type == "生活趣事") {
				typea.href = "http://47.100.137.31/life-article/index.html"
			} else if(data[0].type == "书籍推荐") {
				typea.href = "http://47.100.137.31/book-article/index.html"
			}
//			var div = document.createElement("div");
//			div.className = "article-content";
			var articleTitle = document.getElementById("articleTitle")
			var time = document.getElementById("time");
			var author = document.getElementById("author");
			var reg1 = new RegExp("T", "g");
			var reg2 = new RegExp(".000Z", "g");
			var addtime = data[0].addtime.replace(reg1, " ").replace(reg2, "");
			articleTitle.innerHTML = data[0].title;
			time.innerHTML = addtime;
			author.innerHTML = data[0].author;
//			div.innerHTML = '<img src="../img.ger.png"/><ul><h3><a href="./css-article/index.html">' + data[0].title + '</a></h3><p class="neirong">' + data[0].body + '</p><p><span><i class="iconfont">&#xe64f;</i><a href="./css-article/index.html" class="type">' + data[0].type + '</a></span><span><i class="iconfont">&#xe63b;</i><i class="date">' + addtime + '</i></span></p></ul>'
//			articleBody.appendChild(div);

		},
		error(msg) {
			console.log(msg);
		}
	});
	
	$.ajax({
		type:"get",
		url:"http://47.100.137.31:3003/article/get/"+location.search.slice(4),
		async:true,
		success(data){
			var articleBody = document.getElementById("article-body");
			articleBody.innerHTML = data;
		},
		error(msg){
			console.log(msg)
		}
	});

}