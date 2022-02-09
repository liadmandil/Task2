  const payload = {
      all: 'https://restcountries.com/v3.1/all',
      byName: 'https://restcountries.com/v3.1/name'
  }
  

  $(document).ready(init)
  
  function init (){
      $("#searchButton").click(serchCountries)
  }

  

  function serchCountries() {
      const current = $("#searchInput").val()
      if (!current) {getall()}
      else{getCuntries(current)}
  }


  async function getall () {  
    drawLoader() 
      try{
        const result = await fetch(payload.all)
        const resultJson = await result.json()
        const drawC = resultJson.map( (c) => {
            return drawCountry(c)
        })
        $("#content").append(drawC)
        getStatistic(resultJson)
        getRegion(resultJson)
      }
      catch(er){
          console.log(er)
      }   
  }

  async function getCuntries(current) {
    drawLoader() 
    current.replace(" ","")
      try{
        const result = await fetch(`${payload.byName}/${current}`)
        const resultJson = await result.json()
        const drawC = resultJson.map( (c) => {
            return drawCountry(c)
        })
        $("#content").append(drawC)
          getStatistic(resultJson)
          getRegion(resultJson)
      }
      catch(er){
          alert("incorrect name pease try again")
        console.log(er)
      }
  }



  function drawCountry (c) {
      if(!c || typeof c !== "object") return
      $("#content").html("")
      const row = $("<div>").addClass("row")
      const name = $("<div>").addClass("col-6").text(c.name.common)
      let population = c.population
      if (isNaN(population) || !population){ population = 0}
      const citizens = $("<div>").addClass("col-6").text(population)
      row.append(name , citizens)
      return row


  }

  function getStatistic (countries) {
      if (!Array.isArray(countries)) return
      let totalC = 0;
      let numOfC = 0;
      
    for (let index = 0; index < countries.length; index++) {
        totalC += countries[index].population
        numOfC ++
    }

     const avgC = totalC / countries.length
     const avgPopulition = `the average population is:  ${Math.ceil(avgC)}`
     const totalPopulation = `the total population is: ${totalC}`
     const numCountries = `the number of countries is: ${numOfC}`
     console.log(avgPopulition)
     
     $("#statistic1").text(avgPopulition)
     $("#statistic2").text(totalPopulation)
     $("#statistic3").text(numCountries)
  }


  function getRegion(countries){
    if (!Array.isArray(countries)) return

   const list = countries.reduce( (list2 , c) => {
       return {...list2, [c.region]: Number(0)}
   } , {})

   for (let index = 0; index < countries.length; index++) {
        list[countries[index].region] ++;
   } 
   console.log(list)
   const val = Object.values(list)
   const key = Object.keys(list)
   $("#data").html("")
   for (let index = 0; index < countries.length; index++) {
      $("#data").append(drawRegion(key[index] , val[index]))
   }
  }
  

  function drawRegion(region , num){
      if (!region || !num || isNaN(num)) return
      const row = $("<div>").addClass("row")
      const name = $("<div>").addClass("col-6").text(region)
      const numOfC = $("<div>").addClass("col-6").text(num)

      row.append(name , numOfC)
      $("#data").append(row)
  }




  

  function drawLoader() {
    $("#content").html(getLoader())
    $("#statistic2").html(getLoader()) 
    $("#statistic").html("")
    $("#data").html(getLoader())    
}

function getLoader() {
    const divLoader = document.createElement("div")
    divLoader.className = "loader"
    divLoader.style.height = "100px"
    divLoader.style.width = "100px"
    return divLoader
}


