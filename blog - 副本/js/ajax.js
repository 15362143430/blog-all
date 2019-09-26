//文章获取
window.onload = function() {
	$.ajax({
		type: "get",
		url: "http://47.100.137.31:3003/article/html",
		async: true,
		success(data) {
			console.log(data);
		},
		error(msg) {
			console.log(msg);
		}
	});

	$.ajax({
		type: "get",
		url: "http://47.100.137.31:3003/article",
		async: true,
		success(data) {
			console.log(data);
			var title = document.getElementById("article-body").querySelectorAll("h3>a");
			var neirong = document.getElementsByClassName("neirong");
			var type = document.getElementsByClassName("type");
			var addtime = document.getElementsByClassName("date");
			var latelyArticle = document.querySelectorAll("#catalog ul a")
			for(let i = 0; i < title.length; i++) {
				title[i].innerHTML = data[i].title;
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
				neirong[i].innerHTML = data[i].body;
				type[i].innerHTML = data[i].type;
				if(data[i].type == "HTML") {
					type[i].href = "http://47.100.137.31/html-article/index.html"
				} else if(data[i].type == "CSS") {
					type[i].href = "http://47.100.137.31/css-article/index.html"
				} else if(data[i].type == "JavaScript") {
					type[i].href = "http://47.100.137.31/JavaScript-article/index.html"
				} else if(data[i].type == "Vue") {
					type[i].href = "http://47.100.137.31/vue-article/index.html"
				} else if(data[i].type == "Nodejs") {
					type[i].href = "http://47.100.137.31/nodejs-article/index.html"
				} else if(data[i].type == "生活趣事") {
					type[i].href = "http://47.100.137.31/life-article/index.html"
				} else if(data[i].type == "书籍推荐") {
					type[i].href = "http://47.100.137.31/book-article/index.html"
				}
				var reg1 = new RegExp("T", "g");
				var reg2 = new RegExp(".000Z", "g");
				addtime[i].innerHTML = data[i].addtime.replace(reg1, " ").replace(reg2, "");
			}
		},
		error(msg) {
			console.log(msg);
		}
	});

	function tiao(k) {
		alert(k)
	}

}