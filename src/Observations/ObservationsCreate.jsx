import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createObservation, getObservation, updateObservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ObservationCreate() {
  const {observation_id} = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState( (observation_id === undefined) ? "create" : "edit");

  const [observation, setObservation] = useState({});

  useEffect(() => {
    
    console.log("observation_id", observation_id)

    function loadObservation(){
      if (editMode === "edit"){
        const abortController = new AbortController();
        getObservation(observation_id, abortController.signal)
          .then(setObservation)
          .catch(setError);
        return () => abortController.abort();
      }
    }
    
    loadObservation();

    }, [])


  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    if (editMode === "create"){
      createObservation(observation, abortController.signal)
      .then(() => {
        history.push("/");
      })
      .catch(setError);

      return () => abortController.abort();
    } else {

      updateObservation(observation_id, observation, abortController.signal)
      .then(() => {
        history.push("/");

      })
      .catch(setError);

      return () => abortController.abort();
    }
  }

  function changeHandler({ target: { name, value } }) {
    setObservation((previousObservation) => ({   
    ...previousObservation,
    [name]: value,
    }));
  }

  console.log("editMode", editMode, observation)

  return (
    <main>
      <h1 className="mb-3">Create Observation</h1>
      <ErrorAlert error={error}/>
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="latitude">
              Latitude
            </label>
            <input
              className="form-control"
              id="latitude"
              name="latitude"
              type="number"
              max="90"
              min="-90"
              value={observation.latitude}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter a value between -90 and 90.</small>
          </div>
          <div className="col-6">
            <label className="form-label" htmlFor="longitude">
              Longitude
            </label>
            <input
              className="form-control"
              id="longitude"
              name="longitude"
              type="number"
              max="180"
              min="-180"
              value={observation.longitude}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter a value between -180 and 180.</small>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="air_temperature">
              Air Temperature
            </label>
            <input
              className="form-control"
              id="air_temperature"
              name="air_temperature"
              type="number"
              max="120"
              min="-50"
              value={observation.air_temperature}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter a value between -50 and 120.</small>
          </div>
          <div className="col-6">
            <label className="form-label" htmlFor="air_temperature_unit">
              Air Temperature Unit
            </label>
            <input
              className="form-control"
              id="air_temperature_unit"
              name="air_temperature_unit"
              type="text"
              pattern="[CF]"
              value={observation.air_temperature_unit}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter C for Celcius, or F for Fahrenheit</small>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="cloudCover">
            Sky conditions
          </label>
          <select
            className="form-control"
            id="sky_condition"
            name="sky_condition"
            value={observation.sky_condition}
            onChange={changeHandler}
            required={true}
          >
            <option value="">Select a sky condition option</option>
            <option value="100">Cloudless</option>
            <option value="101">Some clouds</option>
            <option value="102">Cloud covered</option>
            <option value="103">Foggy</option>
            <option value="104">Raining</option>
            <option value="106">Snowing</option>
            <option value="108">Hailing</option>
            <option value="109">Thunderstorms</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default ObservationCreate;