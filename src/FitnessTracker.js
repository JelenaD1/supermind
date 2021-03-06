import React, { useEffect, useState } from "react"
import FitnessForm from "./FitnessForm"
import FitnessList from "./FitnessList"

const FitnessTracker = () => {
  const [fitnessList, setFitnessList] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/workouts`)
      .then(resp => resp.json())
      .then(data => setFitnessList(data))
  }, [])

  const handleAddExercise = (newExercise) => {
    fetch(`${process.env.REACT_APP_API_URL}/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newExercise)
    })
      .then(resp => resp.json())
      .then(data => setFitnessList([...fitnessList, data]))
  }

  const deleteExercise = (id) => {
    const updatedExercise = fitnessList.filter(list => list.id !== id)
    setFitnessList(updatedExercise)
  }

  return (
        <div className="list">
            <div className="fitness-app">
            <FitnessForm onAddExercise={handleAddExercise} />
            <FitnessList fitnessList={fitnessList} onClickDeleteExercise={deleteExercise} />

            </div>

         </div>
  )
}

export default FitnessTracker
