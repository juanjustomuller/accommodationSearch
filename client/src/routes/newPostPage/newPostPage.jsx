import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newPostPage.scss'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import UploadWidget from '../../components/UploadWidget/UploadWidget';
import apiRequest from "../../lib/apiRequest";

function NewPostPage() {
    const [images, setImages] = useState([])
    const [value, setValue] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const inputs = Object.fromEntries(formData)
        //console.log(inputs);
        //Envio mis inputs a la DB. Envio 2: 1- los imputs enteros(inputData) y 2- los imputs para el detail 
        try {
            const res = await apiRequest.post("/posts", {
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type,
                    property: inputs.property,
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                },
                postDetail: {
                    desc: value,
                    utilities: inputs.utilities,
                    pet: inputs.pet,
                    income: inputs.income,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    restaurant: parseInt(inputs.restaurant),
                },
            })
            navigate("/"+res.data.id)  //redirecciono y mando tmb mi postID
        } catch (error) {
            console.log(error);
            setError(error)
        }
    }
    return (
        <div className="newPostPage">
            <div className="formContainer">
                <h1>Add new Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' name='title' />
                        </div>
                        
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input type="number" id='price' name='price' />
                        </div>

                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input type="text" id='address' name='address' />
                        </div>

                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme='snow' onChange={setValue} value={value}/>
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' name='city' />
                        </div>

                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} type="number" id='bedroom' name='bedroom' />
                        </div>

                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} type="number" id='bathroom' name='bathroom' />
                        </div>

                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input type="text" id='latitude' name='latitude' />
                        </div>

                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input type="text" id='longitude' name='longitude' />
                        </div>

                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type">
                                <option value="rent" defaultChecked>
                                    Rent
                                </option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="type">Property</label>
                            <select name="property">
                                <option value="apartmen">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities">
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet">
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="income">Income Policy</label>
                            <input 
                            type="text"
                            id='income'
                            name='income'
                            placeholder='Income Policy'
                            />
                        </div>

                        <div className="item">
                            <label htmlFor="size">Total Size (sqft)</label>
                            <input min={0} type="number" id='size' name='size' />
                        </div>

                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input min={0} type="number" id='school' name='school' />
                        </div>

                        <div className="item">
                            <label htmlFor="bus">Bus</label>
                            <input min={0} type="number" id='bus' name='bus' />
                        </div>

                        <div className="item">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input min={0} type="number" id='restaurant' name='restaurant' />
                        </div>

                        <button className='sendButton'>Update</button>
                        {error && <span>error</span>}
                    </form>
                </div>
            </div>
            <div className='sideContainer'>
                {images.map((image, index) => (
                    <img src={image} key={index} alt="" />
                ))}
                <UploadWidget uwConfig={{
                    multiple: true,
                    cloudName: "dupoule9h",
                    uploadPreset: "alojamiento",
                    maxImageFileSize: 2000000,
                    folder: "posts",
                }}
                setState={setImages}
                />
            </div>
        </div>
    )

}

export default NewPostPage;