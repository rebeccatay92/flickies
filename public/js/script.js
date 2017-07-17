$(document).ready(function () {
  // run ajax now
  // 2 methods = GET and POST

  var discover_movie_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=83ebcfbe2592e4358658da3522dad3ff'
  var image_url = 'https://image.tmdb.org/t/p/w300/'
  var $ul = $('.movie-list')

  $.get(discover_movie_url)
    .done(function (data) {
      var movie_arr = data.results

      movie_arr.forEach(function (movie) {
        var $createdList = createList(movie)
        $ul.append($createdList)
      })
    })

  // input: obj
  // output: jquery object
  // jquery object => <li> <img src=""> </li>
  function createList (obj) {
    var $newLi = $('<li>')
    var $newImg = $('<img>')

    $newImg.attr({
      src: image_url + obj.poster_path,
      alt: obj.title
    })
    $newLi.append($newImg)
    return $newLi
  }
})
