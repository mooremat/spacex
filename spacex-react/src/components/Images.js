import React from 'react';

const Images = ({ image }) => {
  return (
    <div className="col-6-sm col-3-md m-2">
      <a href={image}>
        <img src={image} alt="" className='img-test' />
      </a>
    </div>
  )
}

export default Images;
