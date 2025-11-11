import React from 'react'
import { useState } from 'react';

export const Blog = () => {
    const [file, setFile] = useState(null);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <>

    <h1>Blog</h1>
     
    </>
  )
}
