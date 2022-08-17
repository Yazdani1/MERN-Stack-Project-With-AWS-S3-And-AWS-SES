import React from 'react'
import { Link, useHistory, useParams } from "react-router-dom";

const EditCategory = () => {

    const { id } = useParams();


  return (
    <div>{id}</div>
  )
}

export default EditCategory