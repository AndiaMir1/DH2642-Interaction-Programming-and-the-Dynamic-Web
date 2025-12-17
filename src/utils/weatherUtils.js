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
    if (wind > 7.9 && wind < 20.7) return "midWind";
    if (wind <= 7.9) return "lowWind";
}

export const weatherMusic = {
    clear: {
        highTemp: {
            highWind: ["Top Hits", "Party Bangers", "Summer Hits 2024", "Mainstage", "Pop Remix"],
            midWind: ["Hot Hits", "Summer Air", "Chart Toppers", "Radio 1", "Pop Sunshine"],
            lowWind: ["Summer Chill", "Acoustic Pop Hits", "Feel Good Hits", "Tropical Pop", "Sunset Chill"]
        },
        midTemp: {
            highWind: ["Running Hits", "Workout Pop", "Energy Hits", "Modern Rock Classics"],
            midWind: ["Spring Hits", "Happy Pop", "Today's Top Tracks", "Soft Pop Radio"],
            lowWind: ["Afternoon Acoustic", "Coffee Shop Hits", "Easy Hits", "Peaceful Pop"]
        },
        lowTemp: {
            highWind: ["Winter Workout", "Upbeat Classics", "Fast Pop", "High Energy Pop"],
            midWind: ["Crisp Pop", "Winter Radio", "Bright Hits", "Clean Pop"],
            lowWind: ["Winter Cozy", "Warm Pop Hits", "Acoustic Hits", "Fireside Pop"]
        }
    },
    thunderstorm: {
        highTemp: {
            highWind: ["Rock Anthems", "Stadium Rock", "Heavy Hits", "Imagine Dragons Style", "Power Pop"],
            midWind: ["Alternative Hits", "Dark Pop Bangers", "Electronic Rock", "Night Pop"],
            lowWind: ["Mood Hits", "Sultry Pop", "Dark R&B Hits", "Late Night Hits"]
        },
        midTemp: {
            highWind: ["Classic Rock Hits", "Hard Rock Radio", "Grunge Classics", "Heavy Rotation"],
            midWind: ["Dramatic Pop", "Stormy Rock", "Cinematic Hits", "Moody Anthems"],
            lowWind: ["Dark Piano Hits", "Deep Dark Pop", "Atmospheric Rock", "Slow Rock"]
        },
        lowTemp: {
            highWind: ["Metal Classics", "Industrial Hits", "Aggressive Rock", "Hardcore Hits"],
            midWind: ["Dark Wave Hits", "Gothic Rock Classics", "Heavy Moody", "Nightmare Pop"],
            lowWind: ["Dark Ambient Hits", "Moody Instrumental", "Empty Hits", "Ethereal Pop"]
        }
    },
    drizzle: {
        highTemp: {
            highWind: ["Tropical House Hits", "Liquid Pop", "Summer Rain Radio", "Fresh Pop"],
            midWind: ["Lo-Fi Pop", "Soft Hits", "Chill Pop", "Rainy Day Radio", "Mellow Hits"],
            lowWind: ["Chillout Classics", "Bedtime Pop", "Relaxing Hits", "Rainy Piano"]
        },
        midTemp: {
            highWind: ["Indie Pop Hits", "Alternative Radio", "Rainy Day Classics", "Soft Rock Hits"],
            midWind: ["Sad Pop Hits", "Melancholy Hits", "Rainy Day Pop", "Acoustic Radio"],
            lowWind: ["Lo-Fi Beats", "Chill Study Hits", "Relaxing Pop Hits", "Quiet Hits"]
        },
        lowTemp: {
            highWind: ["Gloomy Pop Hits", "Cold Grey Pop", "Moody Radio", "Slow Hits"],
            midWind: ["Sad Acoustic Hits", "Heartbreak Pop", "Lonely Hits", "Grey Radio"],
            lowWind: ["Deeply Sad Pop", "Slow Piano Hits", "Minimalist Pop", "Crying Hits"]
        }
    },
    rain: {
        highTemp: {
            highWind: ["Summer Storm Hits", "Drum and Bass Hits", "Hyperpop", "High Energy Rain"],
            midWind: ["Warm Rain Pop", "Organic Pop", "Steamy R&B Hits", "Nature Pop"],
            lowWind: ["Fresh Morning Hits", "Soft Rain Acoustic", "Garden Pop", "Chill Hits"]
        },
        midTemp: {
            highWind: ["Powerful Ballads", "Rock Ballads", "Emotional Anthems", "Driving Hits"],
            midWind: ["Rainy Day Hits", "Sad Songs Pop", "Coffee House Pop", "Billboard Hot 100 Sad"],
            lowWind: ["Cozy Pop", "Reading Chill Hits", "Home Pop Radio", "Indoor Acoustic"]
        },
        lowTemp: {
            highWind: ["Cold Rock Anthems", "Winter Rain Hits", "Hard Rock Classics", "Epic Hits"],
            midWind: ["Sad Winter Pop", "Freezing Hits", "Grey Sky Hits", "Lonely Radio"],
            lowWind: ["Depressing Pop Hits", "Slow Sad Classics", "Abyssal Pop", "Dark Piano"]
        }
    },
    snow: {
        midTemp: {
            highWind: ["Christmas Hits", "Winter Anthems", "Holiday Party", "Epic Winter Rock"],
            midWind: ["Winter Wonderland", "Holiday Classics", "Snowy Pop", "Disney Hits"],
            lowWind: ["Silent Night Pop", "Peaceful Holiday", "Winter Acoustic Hits", "Snowy Chill"]
        },
        lowTemp: {
            highWind: ["Extreme Energy", "Power Metal Hits", "Glacier Rock", "Arctic Hits"],
            midWind: ["Frozen Pop", "Northern Lights Chill", "Icy Hits", "Winter Beauty Pop"],
            lowWind: ["Deep Winter Chill", "Hibernate Pop", "Silent Snow Piano", "Winter Sleep"]
        }
    },
    Atmosphere: {
        highTemp: {
            highWind: ["Vaporwave Hits", "Summer Haze Radio", "Psych Rock Hits", "Dreamy Pop"],
            midWind: ["Ethereal Pop Hits", "Dream Pop Classics", "Floating Pop", "Hazy Hits"],
            lowWind: ["Ambient Pop Hits", "Lounge Classics", "Sun Drenched Pop", "Slow Mo"]
        },
        midTemp: {
            highWind: ["Mysterious Pop", "Noir Hits", "Cinematic Pop", "Shadow Hits"],
            midWind: ["Foggy Day Pop", "Alternative Hits", "Mist Radio", "Moody Pop Classics"],
            lowWind: ["Soft Mist Piano", "Ethereal Acoustic", "Dreamy Chill Hits", "Floating"]
        },
        lowTemp: {
            highWind: ["Eerie Pop", "Ghostly Hits", "Void Pop", "Cold Atmospheric"],
            midWind: ["Dark Atmosphere Hits", "Deep Fog Radio", "Cinematic Dark Pop", "Unknown Hits"],
            lowWind: ["Isolation Pop", "Silent Hits", "Ambient Piano Classics", "Cold Void"]
        }
    },
    cloud: {
        highTemp: {
            highWind: ["Overcast Pop", "Muffled Energy", "Summer Grey Hits", "Static Pop"],
            midWind: ["Mellow Pop Hits", "Soft Summer Radio", "Cloudy Day Hits", "Silver Pop"],
            lowWind: ["Lazy Day Pop", "Daydream Hits", "Warm Grey Acoustic", "Floating Pop"]
        },
        midTemp: {
            highWind: ["Indie Rock Hits", "Alternative Anthems", "Modern Rock Radio", "Urban Hits"],
            midWind: ["Daily Mix Pop", "Radio Hits", "Neutral Pop", "Easy Listening Hits"],
            lowWind: ["Afternoon Chill Pop", "Soft Pop Hits", "Silver Sky Acoustic", "Mellow Radio"]
        },
        lowTemp: {
            highWind: ["Gloomy Rock", "Winter Grey Hits", "Cold Anthems", "Heavy Moody Pop"],
            midWind: ["Sad Radio Hits", "Somber Pop", "Grey Winter Classics", "Empty Hits"],
            lowWind: ["Cozy Grey Hits", "Sleepy Pop", "Soft & Sad Hits", "Silver Lining"]
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