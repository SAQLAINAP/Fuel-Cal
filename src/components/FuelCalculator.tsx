import React, { useState, useEffect } from 'react';
import { Car as Card, Fuel, Car, Route } from 'lucide-react';
import carData from '../data/cars.json';
import routeData from '../data/routes.json';
import fuelPrices from '../data/fuel-prices.json';

const FuelCalculator = () => {
    const [selectedCar, setSelectedCar] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [distance, setDistance] = useState(0);
    const [results, setResults] = useState(null);
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedCar) {
            const car = carData.cars.find(c => c.car === selectedCar);
            if (car) {
                setVehicleDetails(car);
                setFuelPrice(fuelPrices.prices[car.fuel].toString());
            }
        }
    }, [selectedCar]);

    useEffect(() => {
        if (fromLocation && toLocation) {
            const route = routeData.routes.find(
                r => (r.city1 === fromLocation && r.city2 === toLocation) ||
                    (r.city1 === toLocation && r.city2 === fromLocation)
            );
            if (route) {
                setDistance(route.distance_km);
                setError('');
            } else {
                setError('Route not found in database');
                setDistance(0);
            }
        }
    }, [fromLocation, toLocation]);

    const calculateFuelCost = () => {
        if (!selectedCar || !distance || !fuelPrice) {
            setError('Please fill in all fields');
            return;
        }

        const car = carData.cars.find(c => c.car === selectedCar);
        if (!car) {
            setError('Invalid car selection');
            return;
        }

        try {
            // Formula: Fuel Needed (L) = Distance (km) / Mileage (kmpl)
            const mileage = parseFloat(car.mileage);
            const fuelNeeded = distance / mileage;
            
            // Formula: Cost = Fuel Needed * Fuel Price
            const totalCost = fuelNeeded * parseFloat(fuelPrice);

            setResults({
                fuelRequired: fuelNeeded.toFixed(2),
                totalCost: totalCost.toFixed(2),
                distance: distance,
                mileage: mileage
            });
            setError('');
        } catch (err) {
            setError('Calculation error. Please check inputs.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                    <Car className="w-8 h-8 text-blue-400 mr-3" />
                    <h1 className="text-3xl font-bold">Fuel Cost Calculator</h1>
                </div>
                <p className="text-center text-gray-400 mb-8">Plan your road trips like a pro! 🚗</p>

                <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Select Your Vehicle</label>
                            <select 
                                className="w-full bg-slate-700 p-3 rounded-md"
                                value={selectedCar}
                                onChange={(e) => setSelectedCar(e.target.value)}
                            >
                                <option value="">Choose a car...</option>
                                {carData.cars.map(car => (
                                    <option key={car.car} value={car.car}>
                                        {car.car} - {car.mileage} kmpl ({car.fuel})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {vehicleDetails && (
                            <div className="bg-slate-700 p-4 rounded-md">
                                <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400">Fuel Type</p>
                                        <p>{vehicleDetails.fuel}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Mileage</p>
                                        <p>{vehicleDetails.mileage} kmpl</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Transmission</p>
                                        <p>{vehicleDetails.transmission}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Engine</p>
                                        <p>{vehicleDetails.engine}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-300 mb-2">From Location</label>
                            <select 
                                className="w-full bg-slate-700 p-3 rounded-md"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                            >
                                <option value="">Select starting point...</option>
                                {Array.from(new Set([
                                    ...routeData.routes.map(d => d.city1),
                                    ...routeData.routes.map(d => d.city2)
                                ])).map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">To Location</label>
                            <select 
                                className="w-full bg-slate-700 p-3 rounded-md"
                                value={toLocation}
                                onChange={(e) => setToLocation(e.target.value)}
                            >
                                <option value="">Select destination...</option>
                                {Array.from(new Set([
                                    ...routeData.routes.map(d => d.city1),
                                    ...routeData.routes.map(d => d.city2)
                                ])).map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Fuel Price (₹/litre)</label>
                            <input 
                                type="number"
                                className="w-full bg-slate-700 p-3 rounded-md"
                                value={fuelPrice}
                                onChange={(e) => setFuelPrice(e.target.value)}
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 p-3 bg-red-900/20 rounded-md">
                                {error}
                            </div>
                        )}

                        <button 
                            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-md font-medium"
                            onClick={calculateFuelCost}
                        >
                            Calculate
                        </button>

                        {results && (
                            <div className="mt-6 space-y-6">
                                <div className="bg-slate-700 p-4 rounded-md">
                                    <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Distance</span>
                                            <span>{results.distance} km</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Vehicle Mileage</span>
                                            <span>{results.mileage} kmpl</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Fuel Price</span>
                                            <span>₹{fuelPrice}/L</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Fuel className="w-6 h-6 text-blue-400 mr-2" />
                                        <span className="text-gray-300">Fuel Required</span>
                                    </div>
                                    <span className="text-2xl text-blue-400">{results.fuelRequired} litres</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Route className="w-6 h-6 text-green-400 mr-2" />
                                        <span className="text-gray-300">Total Cost</span>
                                    </div>
                                    <span className="text-2xl text-green-400">₹{results.totalCost}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FuelCalculator;