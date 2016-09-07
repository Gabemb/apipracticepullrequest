$("form").submit(function (event) {
	event.preventDefault();
	var input = $(this).serializeArray()[0].value.split(" ").join("-").toLowerCase();
	var path = "https://www.rijksmuseum.nl/api/pages/en/rijksstudio/artists/";
	var key = '?key=AIjwSuCS&format=json';			

	$.ajax({
		url: path + input + key,
		success: function (data) {
			var works = data.contentPage.artObjectSet
			// for (var i = 0; i < works.length; i++) {
			// 	getWorks(works[i])
			// }
			works.forEach(function (artID) {
				getWorks(artID)
			})

		},
		error: function (data) {
			if (data.status === 404) {
				alert("Artist does not exist. Try again");
			}
		}
	});

	function getWorks(string) {
		var worksURL = "https://www.rijksmuseum.nl/api/nl/collection/"
		$.ajax ({
			url: worksURL + string + key,
			success: function (data) {
				var artworkURL = data.artObject.webImage.url
				$("ul").append("<li><img src='" + artworkURL +"'></li>")
				// $("div").append("<a href='" + artworkURL + "'><img src='" + artworkURL +"'></a>")
			}
		});
	}
	
});