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
            highWind: ["Dance Pop", "Summer Anthems", "Upbeat Hits", "Mainstage", "Party Mix"],
            midWind: ["Feel Good Pop", "Summer Vibes", "Tropical House", "Top 40", "Sunshine", "Nectar Woode"],
            lowWind: ["Acoustic Pop", "Chill Hits", "Summer Lounge", "Soft Pop", "Lazy Day"],
        },
        midTemp: {
            highWind: ["Workout Energy", "Power Pop", "Modern Rock", "Fast Pop", "Upbeat Indie"],
            midWind: ["Happy Hits", "Spring Pop", "Morning Radio", "Bright Pop", "Feel Good"],
            lowWind: ["Easy Listening", "Coffee Shop", "Acoustic Hits", "Mellow Pop", "Piano"],
        },
        lowTemp: {
            highWind: ["Crisp Pop", "High Energy Classics", "Winter Workout", "Electro Pop", "Autumn", "Late Night"],
            midWind: ["Winter Radio", "Bright Hits", "Fresh Pop", "Clean Radio"],
            lowWind: ["Cozy Acoustic", "Winter Chillout", "Warm Vocals", "Soft Hits"],
        }
    },
    thunderstorm: {
        highTemp: {
            highWind: ["Alternative Rock", "Electric Energy", "Hard Rock", "Power Anthems", "Intense Pop"],
            midWind: ["Dark Pop", "Moody Beats", "Electronic Rock", "Night Drive"],
            lowWind: ["Sultry R&B", "Heavy Bass", "Late Night Pop", "Atmospheric Hits", "Metal", "Thunder", "Coming", "Storm", "Scared", "Cold"],
        },
        midTemp: {
            highWind: ["Classic Rock", "Stadium Rock", "Rock Anthems", "Heavy Hits"],
            midWind: ["Cinematic Pop", "Dark Moody", "Tension", "Alternative Radio"],
            lowWind: ["Dark Piano", "Deep Melancholy", "Slow Rock", "Ominous Beats"],
        },
        lowTemp: {
            highWind: ["Metal Hits", "Hardcore Rock", "Industrial", "Aggressive"],
            midWind: ["Dark Wave", "Gothic Pop", "Heavy Rock", "Grim Beats"],
            lowWind: ["Dark Ambient", "Doom Pop", "Silent Dark", "Deep Empty"],
        }
    },
    drizzle: {
        highTemp: {
            highWind: ["Liquid DnB", "Tropical Beats", "Fresh House", "Summer Rain"],
            midWind: ["Lo-Fi Pop", "Chillout", "Soft Beats", "Mellow Hits", "Quiet Pop"],
            lowWind: ["Ambient Chill", "Zen Pop", "Nature Sounds", "Peaceful"],
        },
        midTemp: {
            highWind: ["Indie Hits", "Rainy Day Radio", "Soft Rock", "Modern Folk"],
            midWind: ["Sad Pop", "Melancholy Hits", "Rainy Day Pop", "Acoustic Radio"],
            lowWind: ["Chill Study", "Lo-Fi Beats", "Coffee House", "Muted Pop"],
        },
        lowTemp: {
            highWind: ["Gloomy Hits", "Cold Pop", "Moody Radio", "Grey Beats"],
            midWind: ["Sad Acoustic", "Lonely Hits", "Heartbreak Pop", "Chilly"],
            lowWind: ["Slow Piano", "Minimalist Pop", "Deep Sadness", "Empty"],
        }
    },
    rain: {
        highTemp: {
            highWind: ["Tropical Storm", "Drum & Bass", "Jungle Beats", "Electric Rain"],
            midWind: ["Warm R&B", "Steam", "Nature Hits", "Fluid Pop"],
            lowWind: ["Fresh Morning", "Soft Rain Acoustic", "Garden Vibes", "Afternoon"],
        },
        midTemp: {
            highWind: ["Power Ballads", "Emotional Rock", "Driving Hits", "Epic Pop"],
            midWind: ["Rainy Hits", "Sad Songs Pop", "Coffee House Pop", "Rainy Jazz", "Jazz", "Joy Crookes"],
            lowWind: ["Cozy Pop", "Reading Chill", "Home Radio", "Indoor Acoustic"],
        },
        lowTemp: {
            highWind: ["Cold Rock", "Epic Anthems", "Hard Rock Classics", "Winter Storm"],
            midWind: ["Sad Winter", "Grey Sky Hits", "Lonely Radio", "Freezing"],
            lowWind: ["Slow Sadness", "Dark Piano", "Abyssal", "Cold Empty"],
        }
    },
    snow: {
        midTemp: {
            highWind: ["Christmas Party", "Holiday Hits", "Winter Anthems", "Epic Winter"],
            midWind: ["Winter Wonderland", "Holiday Classics", "Snowy Pop", "Bright Winter"],
            lowWind: ["Silent Night", "Peaceful Holiday", "Winter Acoustic", "Soft Snow"],
        },
        lowTemp: {
            highWind: ["Power Metal", "Extreme Energy", "Arctic Hits", "Ice Rock"],
            midWind: ["Icy Pop", "Frosty Radio", "Northern Lights", "Deep Winter"],
            lowWind: ["Hibernation", "Deep Freeze", "Silent Piano", "Winter Sleep"],
        }
    },
    Atmosphere: {
        highTemp: {
            highWind: ["Vaporwave", "Summer Haze", "Psych Rock", "Dreamy Pop"],
            midWind: ["Ethereal Hits", "Dream Pop", "Floating", "Hazy Pop"],
            lowWind: ["Ambient Lounge", "Sun Drenched", "Slow Mo", "Lush Pop"],
        },
        midTemp: {
            highWind: ["Mysterious Pop", "Noir Beats", "Cinematic", "Ghostly"],
            midWind: ["Foggy Day", "Alternative Hits", "Mist Radio", "Moody Pop"],
            lowWind: ["Soft Mist", "Dreamy Acoustic", "Floating", "Peaceful"],
        },
        lowTemp: {
            highWind: ["Eerie Pop", "Cold Atmospheric", "Void", "Whiteout"],
            midWind: ["Dark Atmosphere", "Deep Fog", "Cinematic Dark", "Unknown"],
            lowWind: ["Isolation", "Silent Cold", "Ambient Piano", "Grey Silence"],
        }
    },
    cloud: {
        highTemp: {
            highWind: ["Overcast Pop", "Muffled Energy", "Summer Grey", "Static"],
            midWind: ["Mellow Summer", "Cloudy Vibes", "Soft Light", "Silver Pop"],
            lowWind: ["Lazy Day", "Warm Grey", "Daydream", "Floating Pop"],
        },
        midTemp: {
            highWind: ["Indie Rock", "Alternative Anthems", "Modern Rock", "Urban Hits"],
            midWind: ["Daily Mix Pop", "Radio Hits", "Neutral Pop", "Easy Listening"],
            lowWind: ["Afternoon Chill", "Soft Pop Hits", "Silver Sky", "Mellow Radio"],
        },
        lowTemp: {
            highWind: ["Gloomy Rock", "Winter Grey", "Cold Anthems", "Heavy Moody"],
            midWind: ["Sad Radio", "Somber Pop", "Grey Winter", "Dull Hits"],
            lowWind: ["Cozy Grey", "Sleepy Pop", "Soft & Sad", "Silver Lining"],
        }
    }
};


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