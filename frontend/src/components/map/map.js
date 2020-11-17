import React, { useEffect} from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from './mapStyles'
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
    width: "39vw",
};
function Map(props){
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })
    const [markers] = React.useState([]);
    const [flag, setFlag] = React.useState(false);
    useEffect(() => {
        if(!flag){
            props.fetchRegions();
            setFlag(true)
        }
        if(props.regions.length > 0){
            if(props.regions.length !== markers.length){
            let marker = {}
            for(let i = 0;i<props.regions.length;i++){
                    marker = {
                        lat: props.regions[i].coordinates.lat,
                        lng: props.regions[i].coordinates.lng,
                        time: new Date(),
                        region_id: props.regions[i]._id,
                        posts: props.regions[i].posts,
                        weather: props.regions[i].weather
                    }
            if(markers.length === 0){
                markers.push(marker)
            }else{
                let bool = false;
                for(let i = 0;i<markers.length;i++){
                    if(markers[i].region_id === marker.region_id){
                        bool = true;
                    }
                }
                if(bool === false){
                    markers.push(marker)
                }
            }

            }
        }}
    });
    const [selected, setSelected] = React.useState(null);
    if(loadError){
        return "Error Loading Maps"
    }   
    if (!isLoaded) {
        return <div>"Loading Map!"</div>
    }

    // const mostLikedPost = (id) => {
    //     let arr = []
    //     let max = -1;
    //     let post = null;
    //     for(let i = 0;i <props.posts.length; i++){
    //         if((props.posts[i].region === id) && (props.posts[i].likes.length > max)){
    //             max = props.posts[i].likes.length
    //             post = props.posts[i]
    //         }
    //     }
    //     if(post === null){
    //         return props.posts[0]
    //     }
    //     return post;
    // }
    
    const mostLikedPost = () => {
        let most = props.posts[0];
        props.posts.forEach(post => {
            if(post.likes.length > most.likes.length){
                most = post
            };
        });
        return most;
    };
        
    return(
        <div>
        {console.log(markers)}
            <GoogleMap id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={sanFran}
            options= {styles}
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
                                <p>{props.posts.sort_id} </p>
                            <p className="see-posts" onClick={() => {props.handleRegionChange(selected.region_id); mostLikedPost(selected.region_id)}}>See more posts from here!</p>
                                <div className="post-preview">
                                    <div className="modal-picture-container">
                                        <img id="modal-picture" alt="" src={mostLikedPost(selected.mostLikedPost).picture} />
                                    </div>
                                <p className="post-preview-text">{mostLikedPost(selected.mostLikedPost).text} </p>
                                <p> {selected.weather}</p>
                                </div>
                                {/* <Link to={`/api/posts/${props.posts[0]._id}`}> Go to Post </Link> */}
                                {/* <Post fetchpost={props.fetchPost} lat={selected.lat} lng={selected.lng}/> */}
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default Map