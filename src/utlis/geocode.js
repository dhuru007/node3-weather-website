const request=require('request')

const geocode=(address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +  address  + '.json?access_token=pk.eyJ1IjoiZGh1cnUwMDciLCJhIjoiY2s3ZDZ3aWljMDAwcTNsbGF2dWlhN3p6dyJ9.CHm-Kcmp2b9pvU0jStKkWQ'
    
    request({url:url, json:true}, (error,response) => {
        if(error){
            callback('Unable to connect to location',undefined)
        }else if (response.body.features.length ===0) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:response.body.features[0].place_name

            })
        }

    })
    
}

module.exports = geocode