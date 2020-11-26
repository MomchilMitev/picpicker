import React from 'react';
import ImageCard from './ImageCard';

const ImageList = ({ images }) => {
  let imagesList = images.map((image) => {
    return <ImageCard key={image.id} image={image} />;
  });

  return <div className="row">{imagesList}</div>;
};

export default ImageList;
