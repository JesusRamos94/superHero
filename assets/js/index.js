$(document).ready(function() {


    $("form").submit(function(event){


        event.preventDefault()

        let valorInput = $("#superHeroInput").val();

       
        var reg = new RegExp('^[0-9]*$');

        if (reg.test(valorInput) == false) {
            alert('Solo puedes agregar numeros');
            return false;
        }



        $.ajax({
            url: "https://superheroapi.com/api.php/2957577794560794/" + valorInput,
            success: function(data){
                
                let nombre = data.name;
                let conex = data.connections["group-affiliation"];
                let ocupacion= data.work.occupation;
                let primeraAparicion = data.biography["first-appearance"];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases;
                let imagen = data.image.url;
    
                $("#superHeroInfo").html(`
                
                <h3 class="text-center "> SuperHero Encontrado</h3>                
                <div class="card mb-3 " style="max-width: 540px;">
                <div class="row g-0 ">
                <div class="col-md-4">
                    <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 text-center ">
                    <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"></li>
                        <li class="list-group-item">Conexiones: ${conex}</li>
                        <li class="list-group-item">Ocupacion: ${ocupacion}</li>
                        <li class="list-group-item">Primera Aparicion: ${primeraAparicion}</li>
                        <li class="list-group-item">Altura: ${altura}</li>
                        <li class="list-group-item">Peso: ${peso}</li>
                        <li class="list-group-item">Alianzas: ${alianzas}</li>
                    </ul>
                    </div>
                </div>
                </div>
                </div>
                
                `);

                let estadisticas = [];
                let powerStatsData = data.powerstats

                for(let propiedades in powerStatsData){
                    estadisticas.push({
                        label: propiedades, 
                        y: powerStatsData[propiedades],
                    });
                }

                let config = {
                    animationEnabled : true,
                    title: {
                        text : `Estadisticas de Poder para ${nombre}`
                    },
                    data:[{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
                            dataPoints: estadisticas
                        }]
                }

                let chart = new CanvasJS.Chart("superHeroJS", config);

                chart.render();

            },
        });

    });
});


