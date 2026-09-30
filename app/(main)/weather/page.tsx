"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Sun,
  Thermometer,
  Umbrella,
  Wind,
  Snowflake,
  Shirt,
  Gauge,
  LocateFixed,
} from "lucide-react";

type Location = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type WeatherData = {
  timezone: string;
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    uv_index_max: number[];
  };
};

function getWeather(code: number) {
  if (code === 0) {
    return {
      label: "Clear sky",
      icon: Sun,
      color: "text-amber-400",
    };
  }

  if (code === 1) {
    return {
      label: "Mainly clear",
      icon: CloudSun,
      color: "text-amber-300",
    };
  }

  if (code === 2) {
    return {
      label: "Partly cloudy",
      icon: CloudSun,
      color: "text-sky-300",
    };
  }

  if (code === 3) {
    return {
      label: "Overcast",
      icon: Cloud,
      color: "text-slate-300",
    };
  }

  if (code === 45 || code === 48) {
    return {
      label: "Foggy",
      icon: CloudFog,
      color: "text-slate-300",
    };
  }

  if (code >= 51 && code <= 55) {
    return {
      label: "Drizzle",
      icon: CloudDrizzle,
      color: "text-sky-300",
    };
  }

  if (code >= 61 && code <= 65) {
    return {
      label: "Rain",
      icon: CloudRain,
      color: "text-blue-300",
    };
  }

  if (code >= 71 && code <= 75) {
    return {
      label: "Snow",
      icon: Snowflake,
      color: "text-cyan-200",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      label: "Rain showers",
      icon: CloudRain,
      color: "text-blue-300",
    };
  }

  if (code >= 95) {
    return {
      label: "Thunderstorm",
      icon: CloudLightning,
      color: "text-purple-300",
    };
  }

  return {
    label: "Unknown",
    icon: Cloud,
    color: "text-slate-300",
  };
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatDay(date: string, index: number) {
  if (index === 0) return "Today";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export default function Home() {
  const [location, setLocation] = useState<Location>({
    name: "Harare",
    country: "Zimbabwe",
    latitude: -17.8292,
    longitude: 31.0522,
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  async function loadWeather(loc: Location) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        latitude: String(loc.latitude),
        longitude: String(loc.longitude),
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
        timezone: "auto",
        forecast_days: "7",
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();

      setWeather(data);
      setSelectedDay(0);
    } catch {
      setError("Couldn't load the weather. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function searchLocation(event: FormEvent) {
    event.preventDefault();

    if (!query.trim()) return;

    try {
      setSearching(true);
      setError("");

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=6&language=en&format=json`
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      const places: Location[] =
        data.results?.map((item: any) => ({
          name: item.name,
          country: item.country,
          latitude: item.latitude,
          longitude: item.longitude,
        })) ?? [];

      setResults(places);

      if (!places.length) {
        setError("No locations found.");
      }
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  }

  function chooseLocation(loc: Location) {
    setLocation(loc);
    setResults([]);
    setQuery("");
    loadWeather(loc);
  }

  function convertTemp(value: number) {
    if (unit === "C") return Math.round(value);

    return Math.round((value * 9) / 5 + 32);
  }

  function temp(value: number) {
    return `${convertTemp(value)}°`;
  }

  useEffect(() => {
    loadWeather(location);
  }, []);

  const selected =
    weather && weather.daily
      ? {
          date: weather.daily.time[selectedDay],
          code: weather.daily.weather_code[selectedDay],
          high: weather.daily.temperature_2m_max[selectedDay],
          low: weather.daily.temperature_2m_min[selectedDay],
          feels: weather.daily.apparent_temperature_max[selectedDay],
          rain: weather.daily.precipitation_probability_max[selectedDay],
          wind: weather.daily.wind_speed_10m_max[selectedDay],
          uv: weather.daily.uv_index_max[selectedDay],
        }
      : null;

  const currentWeather = weather
    ? getWeather(weather.current.weather_code)
    : null;

  const CurrentIcon = currentWeather?.icon;

  return (
    <main className="min-h-screen  px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-7 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-[#17384a] text-white">
                <CloudSun size={20} />
              </div>

              <span className="font-[family-name:var(--font-space)] text-2xl font-bold">
                AquaMind Weather
              </span>
            </div>

            <p className="ml-12 mt-1 text-xs text-slate-500">
              Weather, beautifully simple.
            </p>
          </div>

          <div className="flex rounded-xl border border-slate-200 bg-white/60 p-1">
            <button
              onClick={() => setUnit("C")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                unit === "C"
                  ? "bg-[#17384a] text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              °C
            </button>

            <button
              onClick={() => setUnit("F")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                unit === "F"
                  ? "bg-[#17384a] text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              °F
            </button>
          </div>
        </header>

        {/* Search */}
        <section className="relative z-20 mx-auto mb-6 max-w-2xl">
          <form
            onSubmit={searchLocation}
            className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-2 pl-4 shadow-[0_15px_45px_rgba(43,75,92,0.08)] backdrop-blur"
          >
            <Search size={20} className="shrink-0 text-slate-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city..."
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={searching}
              className="rounded-xl bg-[#17384a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#214b60] disabled:opacity-60"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </form>

          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {results.map((result) => (
                <button
                  key={`${result.latitude}-${result.longitude}`}
                  onClick={() => chooseLocation(result)}
                  className="flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left last:border-0 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={17} className="text-slate-400" />

                    <span className="font-semibold">
                      {result.name}
                    </span>
                  </div>

                  <span className="text-sm text-slate-400">
                    {result.country}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {error && (
          <div className="mx-auto mb-5 max-w-2xl rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && !weather ? (
          <div className="grid min-h-[400px] place-items-center">
            <div className="text-center">
              <div className="mx-auto mb-4 size-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#17384a]" />
              <p className="text-sm text-slate-500">
                Loading weather...
              </p>
            </div>
          </div>
        ) : weather && selected ? (
          <>
            {/* Current weather */}
            <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#214b60] to-[#17384a] p-6 text-white shadow-[0_25px_70px_rgba(32,69,85,0.22)] sm:p-9">
              <div className="absolute -right-20 -top-28 size-72 rounded-full bg-white/[0.06]" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <MapPin size={17} className="text-[#9ed6ec]" />

                  <div>
                    <h1 className="font-[family-name:var(--font-space)] text-2xl font-bold">
                      {location.name}
                    </h1>

                    <p className="mt-1 text-xs text-[#a9c0ca]">
                      {location.country} · {formatDate(selected.date)}
                    </p>
                  </div>
                </div>

                {/* Main temperature */}
                <div className="my-10 flex items-center gap-4 sm:gap-7">
                  {CurrentIcon && (
                    <CurrentIcon
                      size={72}
                      strokeWidth={1.5}
                      className={currentWeather?.color}
                    />
                  )}

                  <div className="font-[family-name:var(--font-space)] text-7xl font-semibold tracking-[-5px] sm:text-8xl">
                    {temp(weather.current.temperature_2m)}
                  </div>

                  <div className="hidden sm:block">
                    <h2 className="text-xl font-semibold">
                      {currentWeather?.label}
                    </h2>

                    <p className="mt-1 text-sm text-[#a9c0ca]">
                      Feels like{" "}
                      {temp(weather.current.apparent_temperature)}
                    </p>
                  </div>
                </div>

                {/* Current stats */}
                <div className="grid grid-cols-3 border-t border-white/10 pt-6">
                  <WeatherStat
                    icon={<Droplets size={18} />}
                    label="Humidity"
                    value={`${weather.current.relative_humidity_2m}%`}
                  />

                  <WeatherStat
                    icon={<Wind size={18} />}
                    label="Wind"
                    value={`${Math.round(
                      weather.current.wind_speed_10m
                    )} km/h`}
                  />

                  <WeatherStat
                    icon={<Umbrella size={18} />}
                    label="Rain"
                    value={`${weather.current.precipitation} mm`}
                  />
                </div>
              </div>
            </section>

            {/* 7-day forecast */}
            <section className="mt-9">
              <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <span className="text-[11px] font-bold tracking-[1.5px] text-[#66818d]">
                    FORECAST
                  </span>

                  <h2 className="mt-1 font-[family-name:var(--font-space)] text-2xl font-bold">
                    7-day outlook
                  </h2>
                </div>

                <span className="text-xs text-slate-500">
                  Local time · {weather.timezone}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {weather.daily.time.map((date, index) => {
                  const info = getWeather(
                    weather.daily.weather_code[index]
                  );

                  const ForecastIcon = info.icon;
                  const active = selectedDay === index;

                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDay(index)}
                      className={`group min-h-[210px] rounded-2xl border p-4 transition ${
                        active
                          ? "border-[#17384a] bg-[#17384a] text-white shadow-xl shadow-[#17384a]/20"
                          : "border-slate-200/70 bg-white/70 text-slate-900 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                      }`}
                    >
                      <div className="text-sm font-bold">
                        {formatDay(date, index)}
                      </div>

                      <div
                        className={`mt-1 text-[11px] ${
                          active
                            ? "text-slate-300"
                            : "text-slate-400"
                        }`}
                      >
                        {new Date(`${date}T12:00:00`).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>

                      <div className="my-5 flex justify-center">
                        <ForecastIcon
                          size={38}
                          strokeWidth={1.7}
                          className={
                            active ? "text-white" : info.color
                          }
                        />
                      </div>

                      <div
                        className={`min-h-8 text-xs ${
                          active
                            ? "text-slate-300"
                            : "text-slate-500"
                        }`}
                      >
                        {info.label}
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-2">
                        <strong>
                          {temp(
                            weather.daily.temperature_2m_max[index]
                          )}
                        </strong>

                        <span className="text-slate-400">
                          {temp(
                            weather.daily.temperature_2m_min[index]
                          )}
                        </span>
                      </div>

                      <div
                        className={`mt-3 flex items-center justify-center gap-1 text-[11px] ${
                          active
                            ? "text-[#9ed6ec]"
                            : "text-[#5d94ae]"
                        }`}
                      >
                        <Droplets size={12} />

                        {
                          weather.daily
                            .precipitation_probability_max[index]
                        }
                        %
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Selected day */}
            <section className="mt-9 rounded-3xl border border-slate-200/70 bg-white/60 p-5 sm:p-7">
              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <span className="text-[11px] font-bold tracking-[1.5px] text-[#66818d]">
                    SELECTED DAY
                  </span>

                  <h2 className="mt-1 font-[family-name:var(--font-space)] text-2xl font-bold">
                    {formatDate(selected.date)}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  {(() => {
                    const Icon = getWeather(selected.code).icon;

                    return (
                      <Icon
                        size={28}
                        className={getWeather(selected.code).color}
                      />
                    );
                  })()}

                  {getWeather(selected.code).label}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <DetailCard
                  icon={<Thermometer />}
                  label="Temperature"
                  value={`${temp(selected.high)} / ${temp(selected.low)}`}
                  description="High / Low"
                />

                <DetailCard
                  icon={<Shirt />}
                  label="Feels like"
                  value={temp(selected.feels)}
                  description="Maximum apparent temperature"
                />

                <DetailCard
                  icon={<Droplets />}
                  label="Precipitation"
                  value={`${selected.rain}%`}
                  description="Probability of rain"
                />

                <DetailCard
                  icon={<Gauge />}
                  label="UV index"
                  value={String(Math.round(selected.uv))}
                  description="Maximum UV index"
                />
              </div>
            </section>

            <footer className="flex flex-col justify-between gap-2 py-7 text-[11px] text-slate-400 sm:flex-row">
              <span>Powered By Flownode</span>
              <span>Updated automatically</span>
            </footer>
          </>
        ) : null}
      </div>
    </main>
  );
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#9ed6ec]">{icon}</span>

      <div>
        <p className="text-[11px] text-[#91aeb9]">{label}</p>

        <strong className="mt-0.5 block text-sm">
          {value}
        </strong>
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-[#eff6f9] p-4">
      <span className="text-slate-500">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[11px] text-slate-500">
          {label}
        </p>

        <strong className="mt-1 block text-lg">
          {value}
        </strong>

        <p className="mt-1 text-[10px] text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}