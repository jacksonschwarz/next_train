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
let hasError=false;
let callback=function(response){

    data=JSON.parse(response);
    if(data.mode[0].route[0].direction[1]){
        hasError=false
        let min={pre_away:0};
        for(let vehicle of data.mode[0].route[0].direction[1].trip){
            if(min.pre_away < vehicle.pre_away){
                min=vehicle
            }
        }
        let timeUntilArrival=Math.round(min.pre_away/60)
        let timeOfArrival=new Date(min.pre_dt*1000)
        document.getElementById("timeUntilArrival").innerHTML=timeUntilArrival
        document.getElementById("timeOfArrival").innerHTML=timeOfArrival.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })
        document.getElementById("error-text").innerHTML="";
    }
    else{
        document.getElementById("error-text").innerHTML="There are currently no trains scheduled to arrive at Longwood Medical Area";
    }

    
}
let url="https://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=DXNtGY7bd0yDb9S6MRuDKA&stop=place-lngmd&format=json"
let data=[]
let doneOnce=false;
let check=function(){
    httpGet(url);
    setInterval(function(){
        httpGet(url)
    },15*1000)

}