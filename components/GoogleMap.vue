<template>
    <div class="google-map" :id="mapName"></div>
</template>
<script>
module.exports = {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
    }
  },
  mounted: function () {
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 7,
      center: new google.maps.LatLng(59.314693, 17.702665),
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
    //map.data.loadGeoJson("map.json");
    var markerCluster = new MarkerClusterer(map, [], {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    $.ajax({
      url: "markers.json",
      dataType: "json",
      success: function(data){
        // Går igenom markers i arrayen och placerar ut dom. 
        // Finns det flera markers på samma plats så skapats det en grupp med markers.
        for (var i = 0; i < data.length; i++){
          markerCluster.addMarker((tweetMarker(data[i])));
        }
        console.log("success")
      },
      error: function (error) {
        console.log("Something went wrong", error);
      }
    });

    function tweetMarker(props){
      var latNew = props.coords.lat + (Math.random() - .00004 ) / 180;
      var lngNew = props.coords.lng + (Math.random() - .00004 ) / 180;
      var finalLatLng = new google.maps.LatLng(latNew, lngNew);
      var marker = new google.maps.Marker({
        position: finalLatLng,
        map: map
      });
      
      if (props.iconImage){
        var image = {
          url: props.iconImage,
          scaledSize: new google.maps.Size(25, 25)
        }
        marker.setIcon(image);
      }   
      
      if (props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: "<i class=" + "material-icons" + ">" + "person" + "</i>" + "<p>" + props.content + "</p>"
      });

      marker.addListener("click", function(){
        infoWindow.open(map, marker);
        });
      }
      return marker;
    }
  }
};
</script>
<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: rgb(187, 187, 187);
}
</style>