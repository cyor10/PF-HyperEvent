'use client'
import React, { useEffect, useState } from "react";
import AxiosInstance from '../../utils/axiosInstance'
import { useDispatch, useSelector } from 'react-redux';
import { getStates, getCities } from '@/redux/features/location/locationSlice';

export default function PartTwo({ formData, setFormData }) {

  const currentDate = new Date().toISOString().split("T")[0];

  const dispatch = useDispatch();
  const [countries, setCountries] = useState([])
  const states = useSelector((state) => state.location.states);
  const cities = useSelector((state) => state.location.cities);

  const [selectedCountry, setSelectedCountry] = useState(formData.country);
  const [selectedState, setSelectedState] = useState(formData.state);
  const [selectedCity, setSelectedCity] = useState(formData.city);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await AxiosInstance('/countries');
        const dataCountries = response.data;

        setCountries(dataCountries)
      } catch (error) {
        console.error('Error fetching countries data', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity
    });
  }, [selectedCountry, selectedState, selectedCity]);

  const handleCountryChange = (event) => {
    const selectedCountryName = event.target.value;
    setSelectedCountry(selectedCountryName);
    setSelectedState('');
    setSelectedCity('')

    setFormData({ ...formData, country: selectedCountryName });

    // Filter the states based on the selected country
    const selectedCountryData = countries.find((country) => country.name === selectedCountryName);
    if (selectedCountryData) {
      dispatch(getStates(selectedCountryData.name));
    }
  };

  const handleStateChange = (event) => {
    const selectedStateName = event.target.value;
    setSelectedState(selectedStateName);
    setSelectedCity('');

    setFormData({ ...formData, state: selectedStateName });

    // Filter cities based on the selected state
    const selectedStateData = states.find((state) => state.name === selectedStateName);
    if (selectedStateData) {
      dispatch(getCities(selectedStateData.name));
    }
  };

  return (
    <div className="text-black font-figtree md:my-10">
      <div className="flex flex-row items-center justify-center mr-4">
        <p className="text-[.8rem]">Step 2 of 4 </p>
        <div className="w-14 h-1 bg-purpleOscuro ml-2 rounded-md"></div>
        <div className="w-14 h-1 bg-[#F4EFFD] rounded-r-md"></div>
      </div>

      <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm md:mx-[15rem]">
        Location, date and time
      </h3>

      <h4 className="pt-5 text-[1.6rem] font-bold text-textForm md:mx-[15rem]">Location</h4>
      <p className="text-[1rem] font-ligth mr-4 md:mx-[15rem]">
        Help people in the area discover your event and let attendees know where
        to show up.
      </p>

      <div className="flex flex-col items-start md:px-[15rem]">
        <input
          className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
          placeholder="Venue Name *"
          value={formData.place_name}
          onChange={(e) => {
            setFormData({ ...formData, place_name: e.target.value });
          }}
        ></input>

        <input
          className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
          placeholder="Adress 1 *"
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
        ></input>

        <div className="flex flex-row items-center justify-center">
          <select
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            value={selectedCountry}
            onChange={handleCountryChange}>
            <option value="" disabled>Country *</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

          <select
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setFormData({ ...formData, city: e.target.value });
            }}>
            {formData.state ? (
              <>
                <option value="" disabled>City *</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="" disabled>Require State</option>
            )}
          </select>
        </div>

        <div className="flex flex-row items-center justify-center">
          <select
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            value={selectedState}
            onChange={handleStateChange}>
            {formData.country ? (
              <>
              <option value="" disabled>State/Province *</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
              </>
            ) : ( <option value="" disabled>Require Country</option> )}
          </select>

          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            placeholder="Postal Code*" type='number'
            value={formData.postal}
            onChange={(e) => {
              setFormData({ ...formData, postal: e.target.value });
            }}
          ></input>
        </div>
        <div>
          <h3 className="pt-5 text-2xl font-bold text-textForm">
            Date and Time
          </h3>

          <p className="text-[1rem] font-ligth mr-4 pt-1">
            Tell event-goers when your event starts and ends so they can make
            plans to attend.
          </p>
        </div>

        <div className="flex flex-col items-start w-[100%]">
          <label className="text-[1rem] pt-5 ml-1">Event Starts *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            placeholder="11/12/2023" type='date'
            value={formData.start_at}
            min={currentDate}
            onChange={(e) => {
              setFormData({ ...formData, start_at: e.target.value });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Start time *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            placeholder="19:00hs" type='number'
            value={formData.start_at}
            onChange={(e) => {
              setFormData({ ...formData, start_at: e.target.value });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Event End*</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            placeholder="11/12/2023" type='date'
            value={formData.end_at}
            min={formData.start_at}
            onChange={(e) => {
              setFormData({ ...formData, end_at: e.target.value });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">End time *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2 focus:outline-none"
            placeholder="19:00hs" type='text'
            value={formData.end_at}
            onChange={(e) => {
              setFormData({ ...formData, end_at: e.target.value });
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}