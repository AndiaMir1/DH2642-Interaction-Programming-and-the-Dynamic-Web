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
            highWind: ["Summer Party", "Poolside Disco", "Uptempo Pop", "Tropical Dance", "Festival Anthems", "Ibiza Energy", "Sunlight", "Fast Summer"],
            midWind: ["Sunny Vibes", "Beach Day", "Good Times", "Feel Good Summer", "Roadtrip", "Sunshine Pop", "Island", "Bright"],
            lowWind: ["Summer Chill", "Sunset Lounge", "Acoustic Summer", "Golden Hour", "Relaxing Summer", "Soft Sunlight", "Lazy Afternoon", "Balearic"]
        },
        midTemp: {
            highWind: ["Running", "Fresh Energy", "Bright Day", "Cycling", "Upbeat Indie", "Windy Morning", "Adventure", "Spring Energy"],
            midWind: ["Morning Walk", "Positive", "Spring Vibes", "Daylight", "Outdoor", "Acoustic Pop", "Happy", "Clear Sky"],
            lowWind: ["Easy Going", "Peaceful", "Picnic", "Garden", "Afternoon Tea", "Soft Acoustic", "Mellow", "Quiet Joy"]
        },
        lowTemp: {
            highWind: ["Crisp Air", "Fast Winter", "Bright Cold", "Skiing", "Arctic Wind", "Energizing Cold", "Ice", "Winter Running"],
            midWind: ["Winter Sun", "Clear Sky", "Walking in Snow", "Frosty", "Blue Sky Winter", "Cold Bright", "Snowy Peaks", "Winter Walk"],
            lowWind: ["Cozy Morning", "Hot Coffee", "Winter Acoustic", "Soft Light", "Fireside", "Cabin Vibes", "Warm Blankets", "Hyggeligt"]
        }
    },
    thunderstorm: {
        highTemp: {
            highWind: ["Electric Storm", "Aggressive", "Thunder & Bass", "Power", "Industrial", "Hard Trap", "Storm Surge", "Extreme"],
            midWind: ["Tropical Storm", "Heavy Rain Beats", "Intense", "Dark Jungle", "Humid Thunder", "Drum and Bass", "Flash Flood", "Voltage"],
            lowWind: ["Humid", "Heatwave Storm", "Sultry Dark", "Pressure", "Dark R&B", "Heavy Atmosphere", "Ominous", "Waiting for Rain"]
        },
        midTemp: {
            highWind: ["Rolling Thunder", "Hard Rock", "Stormy Night", "Metal", "Crashing", "Lightning Strike", "Dark Energy", "Rumble"],
            midWind: ["Thunder", "Rain & Thunder", "Dark Moody", "Cinematic Storm", "Gothic", "Tension", "Electric Sky", "Heavy Clouds"],
            lowWind: ["Shadows", "Distortion", "Thunder Echoes", "Ominous", "Dark Piano", "Eerie", "Deep Rumble", "Slow Storm"]
        },
        lowTemp: {
            highWind: ["Icy Storm", "Black Metal", "Chaos", "Winter Dark", "Harsh", "Frozen Thunder", "Nightmare", "Blizzard Metal"],
            midWind: ["Cold Thunder", "Gothic", "Heavy Industrial", "Nightmare", "Dark Wave", "Sleet Storm", "Desolation", "Grim"],
            lowWind: ["Dark Ambient", "Doom", "Cold Empty", "Static", "Drone", "Abyss", "Deep Dark", "Isolation"]
        }
    },
    drizzle: {
        highTemp: {
            highWind: ["Tropical Rain", "Warm Mist", "Fluid", "Summer Rain", "Rainforest", "Soft Electronic", "Liquid DnB", "Moving Mist"],
            midWind: ["Soft Shower", "Lo-fi Rain", "Light Rain", "Gentle", "Warm Drizzle", "Morning Mist", "Floating", "Hazy Rain"],
            lowWind: ["Misty Morning", "Dew", "Calm Rain", "Quiet", "Meditation Rain", "Soft Sleep", "Zen", "Minimalist Rain"]
        },
        midTemp: {
            highWind: ["Grey Day", "Windy Rain", "Walking in Rain", "Street Lights", "Rainy Indie", "Soggy Streets", "Moving Grey", "Urban Rain"],
            midWind: ["Rainy Day", "Soft Pop", "Drizzle Chill", "Floating", "Melancholy", "Dreamy Rain", "Overcast", "Acoustic Rain"],
            lowWind: ["Chill Lo-fi", "Rainy Window", "Relaxing Rain", "Study Rain", "Cozy Lo-fi", "Rainy Jazz", "Slow Drizzle", "Muted"]
        },
        lowTemp: {
            highWind: ["Cold Drizzle", "Sleet", "Freezing Mist", "Bitter", "Sharp Rain", "Icy Drizzle", "Gloomy Wind", "Harsh Grey"],
            midWind: ["Cold Rain", "Melancholy", "Grey", "Lonely", "Depressing Rain", "Sad Acoustic", "Empty Streets", "Chilly"],
            lowWind: ["Sad Rain", "Depressing", "Empty", "Slow Drizzle", "Tears", "Minimalist", "Ghostly Rain", "Winter Drizzle"]
        }
    },
    rain: {
        highTemp: {
            highWind: ["Jungle Rain", "Monsoon", "Drum & Rain", "Heavy Tropical", "Rainy Jungle", "Stormy Summer", "Electric Rain", "Pouring"],
            midWind: ["Warm Rain", "Rainforest", "Steam", "Steady Rain", "Liquid Gold", "Rainy Afternoon", "Nature Sounds", "Deep Rain"],
            lowWind: ["Summer Shower", "Afternoon Rain", "Rainy Garden", "Peaceful Rain", "Soft Rain", "Green Nature", "Humid Rain", "Fresh"]
        },
        midTemp: {
            highWind: ["Stormy", "Rainy Roadtrip", "Crying in Rain", "Powerful Rain", "Hard Rain", "Driving Rain", "Ocean Storm", "Wash Away"],
            midWind: ["Rainy Day", "Melancholic", "Tears", "Coffee & Rain", "Sad Songs", "Rainy Jazz", "Raindrops", "Piano Rain"],
            lowWind: ["Cozy Rain", "Reading Rain", "Soft Piano Rain", "Indoor", "Blanket Day", "Library Vibes", "Home", "Safe from Rain"]
        },
        lowTemp: {
            highWind: ["Freezing Rain", "Cold Wind", "Harsh Rain", "Brutal", "Winter Storm", "Sharp Cold", "Icy Rain", "Shattered"],
            midWind: ["Sleet", "Grey Sky", "Winter Rain", "Dark & Cold", "Cold Morning", "Lonely", "Desolate", "Freezing"],
            lowWind: ["Slow & Sad", "Lonely Rain", "Cold Piano", "Abyssal", "Dark Rain", "Silent", "Grief", "Cold Empty"]
        }
    },
    snow: {
        midTemp: {
            highWind: ["Blizzard", "Whiteout", "Snowstorm", "Arctic Blast", "Ice Wind", "Fast Snow", "Winter Power", "Mountain"],
            midWind: ["Snowy Day", "Winter Wonderland", "Christmas", "Frozen", "Sleigh Ride", "Bright Winter", "Snowfall", "Fluffy Snow"],
            lowWind: ["Soft Snow", "First Snow", "Silent Night", "Peaceful Winter", "Winter Calm", "Falling Snow", "White Silence", "Pure"]
        },
        lowTemp: {
            highWind: ["Ice Storm", "North Pole", "Extreme Cold", "Glacier", "Arctic Survival", "Freezing Hell", "Absolute Zero", "Frostbite"],
            midWind: ["Frosty", "Icy Blue", "Winter Woods", "Northern Lights", "Aurora", "Deep Winter", "Cold Beauty", "Frozen Lake"],
            lowWind: ["Hibernation", "Deep Freeze", "Silent Snow", "Winter Sleep", "Deep Sleep", "Cold Ambient", "Frozen Time", "Ice Cave"]
        }
    },
    Atmosphere: {
        highTemp: {
            highWind: ["Hazy Summer", "Heat Blur", "Static", "Dusty", "Desert Mist", "Mirage", "Warm Haze", "Distorted Summer"],
            midWind: ["Dreamy", "Floating", "Ethereal Summer", "Blurred", "Daydream", "Vaporwave", "Soft Focus", "Summer Haze"],
            lowWind: ["Haze", "Lazy Day", "Sun-drenched", "Ambient Summer", "Drowsy", "Golden Haze", "Afternoon Heat", "Slow"]
        },
        midTemp: {
            highWind: ["Mist & Wind", "Foggy Road", "Lost", "Ghostly", "Windy Mist", "Ominous Fog", "Mystic Wind", "Blurred Vision"],
            midWind: ["Foggy Day", "Mysterious", "Hidden", "Atmospheric", "Noir", "Cinematic", "The Unknown", "Shadows in Fog"],
            lowWind: ["Mist", "Silent Fog", "Dreamy Piano", "Peaceful Mist", "Ethereal", "Floating", "Soft Fog", "Morning Mist"]
        },
        lowTemp: {
            highWind: ["Arctic Mist", "Frozen Fog", "Whiteout", "Eerie", "Haunted", "Ghostly White", "Icy Haze", "Void"],
            midWind: ["Cold Mist", "Unknown", "Deep Fog", "Cinematic Dark", "Isolation", "Dark Atmosphere", "Distant", "Grim Fog"],
            lowWind: ["Isolation", "Void", "Silent Cold", "Ambient Fog", "Grey Silence", "Frozen Mist", "Abyss", "Desolation"]
        }
    },
    cloud: {
        highTemp: {
            highWind: ["Overcast Party", "Humid Clouds", "Shadow Dance", "Muffled", "Grey Energy", "Tropical Overcast", "Static", "Heavy Air"],
            midWind: ["Grey Summer", "Cloudy Vibes", "Soft Light", "Mellow Summer", "Silver Sky", "Flat Light", "Calm Grey", "Muted Summer"],
            lowWind: ["Lazy Clouds", "Warm Grey", "Daydream", "Floating", "Summer Cloud", "Cloud Watching", "Soft Clouds", "Afternoon Drift"]
        },
        midTemp: {
            highWind: ["Windy Clouds", "Grey Sky", "Uptempo Indie", "Fast Grey", "Storm Clouds", "Moving Clouds", "Urban Grey", "Active Overcast"],
            midWind: ["Cloudy Day", "Neutral", "Moody", "Ordinary Day", "Daily Routine", "Grey Pop", "Street Vibes", "Modern Life"],
            lowWind: ["Calm Clouds", "Soft Pop", "Afternoon Chill", "Silver Sky", "Mellow", "Quiet Day", "Overcast Chill", "Thinking"]
        },
        lowTemp: {
            highWind: ["Winter Clouds", "Grey Wind", "Heavy Sky", "Gloomy", "Brutal Grey", "Cold Overcast", "Storm Coming", "Harsh Sky"],
            midWind: ["Cold Grey", "Winter Light", "Somber", "Empty Sky", "Lonely Day", "Grey Winter", "Dull", "Monochrome"],
            lowWind: ["Cozy Grey", "Winter Sleep", "Soft & Sad", "Silent Clouds", "Sleepy", "Melancholy Winter", "Grey Piano", "Fade"]
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