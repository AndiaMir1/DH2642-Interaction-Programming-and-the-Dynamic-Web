export function getWeatherCategory(conditionCode){
    if (conditionCode>=200 && conditionCode<300) return "thunderstorm";
    if (conditionCode>=300 && conditionCode<400) return "drizzle";
    if (conditionCode>=400 && conditionCode<500) return "rain";
    if (conditionCode>=600 && conditionCode<700) return "snow";
    if (conditionCode>=700 && conditionCode<800) return "Atmosphere";
    if (conditionCode===800) return "clear";
    if (conditionCode>800) return "cloud";
    return "clear";

}

export function getTemperature(temp) {
    if (temp >= 15) return "highTemp";
    if (temp < 15 && temp > -5) return "midTemp";
    if (temp <= -5) return "lowTemp";
}


export function getWind(wind) {
    if (wind >= 20.7) return "highWind";
    if (wind > 7.9 && wind < 20,7) return "midWind";
    if (wind <= 7.9) return "lowWind";
}

export const weatherMusic = {
    clear:{
        highTemp:{
            highWind:["Ariana Grande"],
            midWind:["Sting"],
            lowWind: ["Kent"],

        },
        midTemp: {
            highWind: ["Adele"],
            midWind: ["Adele"],
            lowWind: ["Adele"],
        },
        lowTemp: {
            highWind: ["Beyonce"],
            midWind: ["Beyonce"],
            lowWind: ["Beyonce"],
        }

    },
    thunderstorm: {
        highTemp:{
            highWind:["Beyonce"],
            midWind:["Beyonce"],
            lowWind: ["Beyonce"],

        },
        midTemp: {
            highWind: ["Lorde"],
            midWind: ["Lorde"],
            lowWind: ["Lorde"],
        },
        lowTemp: {
            highWind: ["Beyonce"],
            midWind: ["Beyonce"],
            lowWind: ["Kent"],
        }

    },
    drizzle: {
        highTemp:{
            highWind:["Elyanna"],
            midWind:["Elyanna"],
            lowWind: ["Elyanna"],

        },
        midTemp: {
            highWind: ["Elyanna"],
            midWind: ["Elyanna"],
            lowWind: ["Elyanna"],
        },
        lowTemp: {
            highWind: ["Elyanna"],
            midWind: ["Elyanna"],
            lowWind: ["Elyanna"],
        }

    },

    rain: {
        highTemp:{
            highWind:["Lill-Babs"],
            midWind:["Lill-Babs"],
            lowWind: ["Lill-Babs"],

        },
        midTemp: {
            highWind: ["Lill-Babs"],
            midWind: ["Lill-Babs"],
            lowWind: ["Lill-Babs"],
        },
        lowTemp: {
            highWind: ["Lill-Babs"],
            midWind: ["Lill-Babs"],
            lowWind: ["Lill-Babs"],
        }

    },
    snow: {
        midTemp: {
            highWind: ["Lill-Babs"],
            midWind: ["Lill-Babs"],
            lowWind: ["Lill-Babs"],
        },
        lowTemp: {
            highWind: ["Lill-Babs"],
            midWind: ["Lill-Babs"],
            lowWind: ["Lill-Babs"],
        }

    },
    Atmosphere: {
        highTemp:{
            highWind:["Metallica"],
            midWind:["Metallica"],
            lowWind: ["Metallica"],

        },
        midTemp: {
            highWind: ["Metallica"],
            midWind: ["Metallica"],
            lowWind: ["Metallica"],
        },
        lowTemp: {
            highWind: ["Metallica"],
            midWind: ["Metallica"],
            lowWind: ["Metallica"],
        }

    },
    cloud: {
        highTemp:{
            highWind:["Nectar Woode"],
            midWind:["Nectar Woode"],
            lowWind: ["Sting"],

        },
        midTemp: {
            highWind: ["RAYE"],
            midWind: ["RAYE"],
            lowWind: ["RAYE"],
        },
        lowTemp: {
            highWind: ["Ariana Grande"],
            midWind: ["Ariana Grande"],
            lowWind: ["Ariana Grande"],
        }

    }
    

}


/*2XX thunderstorm
200	Thunderstorm	thunderstorm with light rain	 11d
201	Thunderstorm	thunderstorm with rain	 11d
202	Thunderstorm	thunderstorm with heavy rain	 11d
210	Thunderstorm	light thunderstorm	 11d
211	Thunderstorm	thunderstorm	 11d
212	Thunderstorm	heavy thunderstorm	 11d
221	Thunderstorm	ragged thunderstorm	 11d
230	Thunderstorm	thunderstorm with light drizzle	 11d
231	Thunderstorm	thunderstorm with drizzle	 11d
232	Thunderstorm	thunderstorm with heavy drizzle	 11d

thunderstorm : temperature low & windspeed high
thunderstorm : temperature high & windspeed high 
***********************************************************
Group 3xx: Drizzle
300	Drizzle	light intensity drizzle	 09d
301	Drizzle	drizzle	 09d
302	Drizzle	heavy intensity drizzle	 09d
310	Drizzle	light intensity drizzle rain	 09d
311	Drizzle	drizzle rain	 09d
312	Drizzle	heavy intensity drizzle rain	 09d
313	Drizzle	shower rain and drizzle	 09d
314	Drizzle	heavy shower rain and drizzle	 09d
321	Drizzle	shower drizzle	 09d


**********************************
Group 5xx: Rain
500	Rain	light rain	 10d
501	Rain	moderate rain	 10d
502	Rain	heavy intensity rain	 10d
503	Rain	very heavy rain	 10d
504	Rain	extreme rain	 10d
511	Rain	freezing rain	 13d
520	Rain	light intensity shower rain	 09d
521	Rain	shower rain	 09d
522	Rain	heavy intensity shower rain	 09d
531	Rain	ragged shower rain	 09d
*************************************************
Group 6xx: Snow
600	Snow	light snow	 13d
601	Snow	snow	 13d
602	Snow	heavy snow	 13d
611	Snow	sleet	 13d
612	Snow	light shower sleet	 13d
613	Snow	shower sleet	 13d
615	Snow	light rain and snow	 13d
616	Snow	rain and snow	 13d
620	Snow	light shower snow	 13d
621	Snow	shower snow	 13d
622	Snow	heavy shower snow	 13d
**************************************************
Group 7xx: Atmosphere
701	Mist	mist	 50d
711	Smoke	smoke	 50d
721	Haze	haze	 50d
731	Dust	sand/dust whirls	 50d
741	Fog	fog	 50d
751	Sand	sand	 50d
761	Dust	dust	 50d
762	Ash	volcanic ash	 50d
771	Squall	squalls	 50d
781	Tornado	tornado	 50d
************************************************
Group 800: Clear
800	Clear	clear sky	 01d
 01n
 **************************************************
Group 80x: Clouds
801	Clouds	few clouds: 11-25%	 02d
 02n
802	Clouds	scattered clouds: 25-50%	 03d
 03n
803	Clouds	broken clouds: 51-84%	 04d
 04n
804	Clouds	overcast clouds: 85-100%	 04d
 04n


*/