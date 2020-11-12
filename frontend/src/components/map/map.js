/* global google */
import React, { useEffect} from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from './mapStyles'
import { formatRelative } from "date-fns";
import { Link, withRouter } from 'react-router-dom';
import './map.css';

/// make sure to npm i -S @react-google-maps/api
// npm install --save use-places-autocomplete

const libraries = ["places"]
const styles = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const sanFran = {
    lat: 37.773972,
    lng: -122.431297
} // San Francisco coords
const mapContainerStyle = {
    height: "100vh",
    width: "420px",
};
let bool = false;
function Map(props){
    console.log(props)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })
    // [{ lat: 39.09423597068579, lng: -120.02614425979569, time: new Date() },
    // { lat: 37.64794739271973, lng: -122.2829815703125, time: new Date() },
    //     { lat: 39.05225234813503, lng: -122.8322979765625, time: new Date() }]
    const [markers, placeMarkers] = React.useState([]);
    // if(props.regions.length> 0){

    //     useEffect(() => {
    //         props.fetchRegions().then( () => 
    //         {for(let i =0;i<props.regions.length;i++){
    //             props.regions[i].weather = props.fetchWeather(props.regions[i].coordinates.lat, props.regions[i].coordinates.lng)
    //         }}
    //         )
    //     }, []);
    // }

    // for(let i = 0;i<props.regions.length;i++){
    //     console.log(props.regions[i].weather)
    // }

    // console.log(markers)
    useEffect( () => {
        props.fetchRegions();
    }, [])
    useEffect(() => {
        if(!bool){
            props.fetchRegions();
            props.fetchPosts();
        }
        
        if(props.regions.length > 0){
            console.log("regions")
            console.log(props.regions[0])
            console.log(props.regions[0].posts)
            let marker = {}
            for(let i = 0;i<props.regions.length;i++){
                console.log(props.regions.weather)
                if(props.regions.weather === undefined){
                    console.log("wewrawerwerweR")
                    let weatherVar = "not default"
                    // let weatherVar = props.fetchWeather(props.regions[i].coordinates.lat, props.regions[i].coordinates.lng)
                    console.log(weatherVar)
                    marker = {
                        lat: props.regions[i].coordinates.lat,
                        lng: props.regions[i].coordinates.lng,
                        time: new Date(),
                        region_id: props.regions[i]._id,
                        posts: props.regions[i].posts,
                        weather: weatherVar
                        //put arary of likes
                        // weather: props.regions[i].weather
                        // weather: props.fetchWeather(props.regions[i].coordinates.lat, props.regions[i].coordinates.lng)
                    }
                }else{
                    marker = {
                        lat: props.regions[i].coordinates.lat,
                        lng: props.regions[i].coordinates.lng,
                        time: new Date(),
                        region_id: props.regions[i]._id,
                        posts: props.regions[i].posts,
                        weather:"default"
                    }
                }
                // console.log(marker)
                markers.push(marker)
            }
        }
        bool = true;
    });
    // markers.push({ lat: 39.09423597068579, lng: -120.02614425979569, time: new Date() })
    // markers.push({ lat: 37.64794739271973, lng: -122.2829815703125, time: new Date() })
    // markers.push({ lat: 39.05225234813503, lng: -122.8322979765625, time: new Date() })
    const [selected, setSelected] = React.useState(null);
    const getWeather = (latitude, longitude) => {
        props.fetchWeather(latitude, longitude)
    }

    if(loadError){
        return "Error Loading Maps"
    }   
    if (!isLoaded) {
        return <div>"Loading Map!"</div>
    }

    // const mostLikedPost = () => {
    //     let most = props.posts[0];
    //     props.posts.forEach(post => {
    //         post.likes.length > most.likes ? most = post : most = most;
    //     });
    //     return most;
    // };

    // const mostLikedPost = (id) => {
    //     let arr = []
    //     let max = -1;
    //     let post = null;
    //     for(let i = 0;i <props.posts.length; i++){
    //         console.log(props.posts[i].region)
    //         console.log(id)
    //         if((props.posts[i].region === id) && (props.posts[i].likes.length > max)){
    //             max = props.posts[i].likes.length
    //             post = props.posts[i]
    //         }
    //     }
    //     if(post === null){
    //         console.log(props.posts)
    //         console.log(props.posts[0])

    //         return props.posts[0]
    //     }
    //     return post;
    // }
    
    const mostLikedPost = () => {
        let most = props.posts[0];
        props.posts.forEach(post => {
            post.likes.length > most.likes.length ? most = post : most = most;
        });
        return most;
    };
        
        

    return(
        <div>
            <GoogleMap id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={sanFran}
            options= {styles}
            // onClick={onMapClick}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.region_id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);
                            marker.mostLikedPost = mostLikedPost(marker.region_id)
                        }}
                    />
                ))}
                
                {selected ? (
                    <InfoWindow
                    
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                    setSelected(null);
                    }}
                    >
                        <div>
                            {/* {mostLikedPost(selected.region_id)} */}
                            {/* <h2> */}
                                {/* We will put post modal here? */}
                                {/* <p>{selected.lat} {selected.lng}</p>
                                <p>{props.posts.sort_id} </p> */}
                            <p className="see-posts" onClick={() => {props.handleRegionChange(selected.region_id); mostLikedPost(selected.region_id)}}>See more posts from here!</p>
                                <div className="post-preview">
                                    <div className="modal-picture-container">
                                        <img id="modal-picture" src={mostLikedPost(selected.mostLikedPost).picture} />
                                    </div>
                                <p className="post-preview-text">{mostLikedPost(selected.mostLikedPost).text} </p>
                                <p> {selected.weather}</p>
                                </div>
                                {/* <p>{props.posts[0].date} </p> */}
                                {/* <Link to={`/api/posts/${props.posts[0]._id}`}> Go to Post </Link> */}
                                
                                {/* <p>{props.weather.bool.weather[0].description ? <div>{props.weather.data.weather[0].description}</div> : getWeather(selected.lat,selected.lng)}</p> */}
                                
                                {/* <Post fetchpost={props.fetchPost} lat={selected.lat} lng={selected.lng}/> */}
                            {/* </h2> */}
                            {/* <p>{formatRelative(selected.time, new Date())}</p> */}
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default Map