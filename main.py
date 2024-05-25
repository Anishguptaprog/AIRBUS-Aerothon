import requests
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap
import time
from scipy.spatial import cKDTree
import heapq
import logging

# Configuration parameters
OPENWEATHER_API_KEY = 'aeef95c45f53b7e18a3a6ecebd59038c'
LAT_RANGE = (30, 50)
LON_RANGE = (-120, -70)
OPENWEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather'
OPENWEATHER_API_RATE_LIMIT = 60  # in seconds

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FlightPathOptimizer:
    def __init__(self):
        self.weather_api_key = OPENWEATHER_API_KEY
        self.lat_range = LAT_RANGE
        self.lon_range = LON_RANGE
        self.weather_api_url = OPENWEATHER_API_URL
        self.rate_limit = OPENWEATHER_API_RATE_LIMIT

    def fetch_weather_data(self):
        weather_data = []
        for lat in range(self.lat_range[0], self.lat_range[1]):
            for lon in range(self.lon_range[0], self.lon_range[1]):
                try:
                    response = requests.get(f'{self.weather_api_url}?lat={lat}&lon={lon}&appid={self.weather_api_key}')
                    response.raise_for_status()
                    data = response.json()
                    weather_data.append({
                        'latitude': lat,
                        'longitude': lon,
                        'wind_speed': data['wind']['speed'],
                        'precipitation': data.get('rain', {}).get('1h', 0),
                        'condition': data['weather'][0]['main']
                    })
                    time.sleep(1)  # Respect API rate limits
                except requests.exceptions.RequestException as e:
                    logger.error(f"Error fetching weather data for lat {lat}, lon {lon}: {e}")
                    time.sleep(self.rate_limit)
        return pd.DataFrame(weather_data)

    def fetch_flight_data(self):
        try:
            response = requests.get('https://opensky-network.org/api/states/all')
            response.raise_for_status()
            data = response.json()
            flight_data = []
            for flight in data['states']:
                if flight[5] and flight[6]:  # Ensure lat and lon are not None
                    flight_data.append({
                        'flight_id': flight[0],
                        'latitude': flight[6],
                        'longitude': flight[5],
                        'altitude': flight[13]
                    })
            return pd.DataFrame(flight_data)
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching flight data: {e}")
            return pd.DataFrame()  # Return empty DataFrame in case of error

    def merge_data(self, flight_data, weather_data):
        flight_coords = flight_data[['latitude', 'longitude']].values
        weather_coords = weather_data[['latitude', 'longitude']].values
        tree = cKDTree(weather_coords)
        dist, idx = tree.query(flight_coords, k=1)
        merged_data = flight_data.copy()
        weather_nearest = weather_data.iloc[idx].reset_index(drop=True)
        merged_data = pd.concat([merged_data.reset_index(drop=True), weather_nearest], axis=1)
        return merged_data

    def train_model(self, merged_data):
        features = ['latitude', 'longitude', 'altitude', 'wind_speed', 'precipitation']
        merged_data['condition_label'] = merged_data['condition'].apply(lambda x: 1 if x in ['Storm', 'Turbulence'] else 0)
        X = merged_data[features]
        y = merged_data['condition_label']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = DecisionTreeClassifier()
        print("Training the model...")
        model.fit(X_train, y_train)
        accuracy = model.score(X_test, y_test)
        print(f'Model accuracy: {accuracy:.2f}')
        return model

    def find_alternate_path(self, flight_path, weather_data):
        def heuristic(a, b):
            return np.linalg.norm(np.array(a) - np.array(b))

        def a_star_search(start, goal):
            neighbors = [(0, 1), (1, 0), (0, -1), (-1, 0)]
            close_set = set()
            came_from = {}
            gscore = {start: 0}
            fscore = {start: heuristic(start, goal)}
            oheap = []
            heapq.heappush(oheap, (fscore[start], start))
            
            while oheap:
                current = heapq.heappop(oheap)[1]
                
                if current == goal:
                    data = []
                    while current in came_from:
                        data.append(current)
                        current = came_from[current]
                    return data[::-1]
                
                close_set.add(current)
                for i, j in neighbors:
                    neighbor = current[0] + i, current[1] + j
                    tentative_g_score = gscore[current] + heuristic(current, neighbor)
                    if neighbor in close_set and tentative_g_score >= gscore.get(neighbor, 0):
                        continue
                        
                    if tentative_g_score < gscore.get(neighbor, 0) or neighbor not in [i[1] for i in oheap]:
                        came_from[neighbor] = current
                        gscore[neighbor] = tentative_g_score
                        fscore[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                        heapq.heappush(oheap, (fscore[neighbor], neighbor))
            
            return []

        start = flight_path[0]
        goal = flight_path[-1]
        return a_star_search(start, goal)

    def plot_flight_paths(self, flight_path, alternate_path):
        plt.figure(figsize=(10, 6))
        m = Basemap(projection='merc', llcrnrlat=20, urcrnrlat=55, llcrnrlon=-130, urcrnrlon=-60, resolution='i')
        m.drawcoastlines()
        m.drawcountries()
        m.drawstates()
        
        flight_path_lat, flight_path_lon = zip(*flight_path)
        alternate_path_lat, alternate_path_lon = zip(*alternate_path)
        
        m.scatter(flight_path_lon, flight_path_lat, latlon=True, marker='o', color='blue', label='Original Path')
        m.scatter(alternate_path_lon, alternate_path_lat, latlon=True, marker='x', color='red', label='Alternate Path')
        
        plt.legend()
        plt.title('Flight Path Visualization')
        plt.show()

# Example usage
optimizer = FlightPathOptimizer()

print("Fetching weather data...")
weather_data = optimizer.fetch_weather_data()
print("Weather data fetched successfully.")
print(weather_data.head())

print("Fetching flight data...")
flight_data = optimizer.fetch_flight_data()
if not flight_data.empty:
    print("Flight data fetched successfully.")
    print(flight_data.head())
    
    print("Merging data...")
    merged_data = optimizer.merge_data(flight_data, weather_data)
    print("Data merged successfully.")
    
    print("Training the model...")
    model = optimizer.train_model(merged_data)
    
    print("Finding alternate flight path...")
    # Example flight path
    flight_path = [(lat, lon) for lat, lon in zip(flight_data['latitude'], flight_data['longitude'])]
    alternate_path = optimizer.find_alternate_path(flight_path, weather_data)
    
    print("Plotting flight paths...")
    optimizer.plot_flight_paths(flight_path, alternate_path)
else:
    print("No flight data available.")
