import { useState } from 'react';
import './Slider.scss';

const Slider = ({images}) => {
    const [imageIndex, setImageIndex] = useState(null)

    const changeSlide = (direction) => {
        // Verificar si la dirección proporcionada es 'left' (izquierda)
        if(direction === 'left'){
            // Si la dirección es 'left', verificar si estamos en la primera imagen
            if(imageIndex === 0){
                // Si estamos en la primera imagen, establecer el índice de la imagen en el índice de la última imagen
                setImageIndex(images.length -1);
            } else {
                // Si no estamos en la primera imagen, simplemente disminuir el índice de la imagen en uno
                setImageIndex(imageIndex -1)
            }
        } else {
        // Si la dirección no es 'left', significa que es 'right'
            if(imageIndex === images.length-1) {
            // Si estamos en la última imagen, establecer el índice de la imagen en cero (volver al principio)
                setImageIndex(0);
            } else {
            // Si no estamos en la última imagen, simplemente aumentar el índice de la imagen en uno
                setImageIndex(imageIndex + 1)
            }
        }
    }

  return (
    <div className="slider">  
    {imageIndex !== null && (                  //si el imageIndex(indice de la imagen) no es igual a null, mostrame el componente fullSlider, sino no lo mostramos
        <div className="fullSlider">
            <div className="arrow" onClick={() => changeSlide("left")}>
                <img src="/arrow.png" alt="" />
            </div>
            <div className="imgContainer">
                <img src={images[imageIndex]} alt="" />
            </div>
            <div className="arrow" onClick={() => changeSlide("right")}>
                <img src="/arrow.png" className="right" alt="" />
            </div>
            <div className="close" onClick={() => setImageIndex(null)}>X</div>
        </div>
    )}      
        <div className="bigImage">
            <img src={images[0]} alt="" onClick={() => setImageIndex(0)}/> {/*En cada click actualizo mi estado con el indice de la imagen, en este caso 0 pq ya estaba usando esa*/}
        </div>
        <div className="smallImages">
            {images.slice(1).map((image, index) => (
                <img 
                src={image} 
                alt="" 
                key={index}
                onClick={() => setImageIndex(index+1)} 
                /> 
            ))}
        </div>
    </div>
  )
}
{/*Depende de q imagen clickea, se va a setear en ese numero de indice*/}
export default Slider