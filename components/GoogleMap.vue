<template>
    <div class="google-map" :id="mapName"></div>
</template>
<script>
module.exports = {
  name: 'google-map',
  props: ['name', 'tweettag'],
  data: function () {
    return {
      mapName: this.name + "-map",
      tweets: null
    }
  },
  mounted: function () {

    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 5,
      center: new google.maps.LatLng(61.426159, 15.067068),
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    }
    const map = new google.maps.Map(element, options);
    var geocoder = new google.maps.Geocoder();
    var markerCluster = new MarkerClusterer(map, [], {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    axios
            .get("http://localhost:5000/tweets/" + this.tweettag)
            .then(res => {
                this.tweets = res.data.tweets
                for (var i = 0; i < this.tweets.length; i++){
                  tweetMarker(this.tweets[i]);
                }
            });

    function tweetMarker(props){
      // Geocoder tar in adresser och översätter dom till koordinater.
      var address = props.userLocation;
      geocoder.geocode({"address": address}, function(results, status){
        if (status == "OK"){
          var latN = results[0].geometry.location.lat() + (Math.random() - .00004 ) / 180;
          var lngN = results[0].geometry.location.lng() + (Math.random() - .00004 ) / 180;
          var finalLatLng = new google.maps.LatLng(latN, lngN);
          var marker = new google.maps.Marker({
            position: finalLatLng,
            map: map
          });
        if (props.profileImageURL){
          var image = {
            url: props.profileImageURL,
            scaledSize: new google.maps.Size(25, 25)
          }
          marker.setIcon(image);
        }   
        
        if (props.tweetText){
          var infoWindow = new google.maps.InfoWindow({
            content: "<i class=" + "material-icons" + ">" + "person" + "</i>" + "<p>" + props.tweetText + "</p>"
          });
          marker.addListener("click", function(){
            map.panTo(this.getPosition());
            infoWindow.open(map, marker);
            });
          }
        markerCluster.addMarker(marker);
        }
        else {
          console.log('Geocode was not successful because: ' + status);
        }
      });
    }
  }
};
</script>
<style scoped>
.google-map {
  max-width: 1500px;
  width: 100%;
  min-height: 600px;
  margin: 0 auto;
  margin-bottom: 15px;
  margin-top: 15px;
  background: rgb(187, 187, 187);
}
</style>