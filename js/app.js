$(document).ready(function() {
  $("form").on("submit", function(evento) {
    evento.preventDefault();
    $("art").empty();
    var $input = $("input");
    var valorInput = $input.val();

    $input.val("");

    var ApiUrl = `https://crossorig.in/?corsit=https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=6&prop=pageimages%7Cextracts&pilimit=max&pithumbsize=80&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${valorInput}`;

    $.ajax({
      url: ApiUrl,
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        var articulos = data.query.pages;

        for (var propiedad in articulos) {
          var articulo = articulos[propiedad];

          var componente = `
					<div class="cards col-xs-12 col-sm-12 col-md-6">
						<h3>${articulo.title}</h3>
						<p>${
              articulo.extract
            } <a target="_blank" class="link" href="https://en.wikipedia.org/?curid=${
            articulo.pageid
          }">Ver mas...</a></p>
						
					</div>`;

          $(".art").append(componente);
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});
