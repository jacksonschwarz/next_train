//reference:
//Longwood Medical Area name: place-lgmd
//pre_away is the paramater that represents the amount of time until the train arrives at the station
//pre_dt is the time, in epoch time that the train is expected to arrive at the station
//

let httpGet=function(url){
    var xmlHttp=new XMLHttpRequest();
    xmlHttp.onreadystatechange=function(){
        if(xmlHttp.readyState==4 && xmlHttp.status==200){
            callback(xmlHttp.responseText)
        } 
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
let callback=function(response){
    data=JSON.parse(response);
    console.log(data.mode[0].route[0])
    if(data.mode[0].route[0].direction[1]){
        let timeUntilArrival=Math.round(data.mode[0].route[0].direction[1].trip[0].pre_away/60)
        let timeOfArrival=new Date(data.mode[0].route[0].direction[1].trip[0].pre_dt*1000)
        document.write(`<h1 style="font-family:sans-serif;font-size:65px">
        The next train arrives at <span style="color:green">Longwood Medical Area</span> in <br><span style="color:blue">${timeUntilArrival}</span> minutes, or at <span style="color:blue">${timeOfArrival.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })}</span>
        </h1>`)
    }
    else{
        document.write(`<h1 style="font-family:sans-serif;font-size:65px">
            There are currently no trains on schedule to arrive at Longwood Medical Area
        </h1>
        `)
    }

    
}
let url="http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop=place-lngmd&format=json"
let data=[]
let check=function(){
    httpGet(url);
}