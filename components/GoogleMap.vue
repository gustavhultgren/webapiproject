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
      zoom: 14,
      center: new google.maps.LatLng(51.501527,-0.1921837)
    }
    const map = new google.maps.Map(element, options);
    map.data.loadGeoJson("map.json");

    var image = {
        url: "https://pbs.twimg.com/profile_images/875168599299637248/84CkAq6s.jpg",
        scaledSize: new google.maps.Size(25, 25)
    }

    var markers = [
      {
        coords: {lat:59.329323, lng:18.068581},
        content:"<p>Testar123</p>",
        iconImage: image
      },
      {
        coords: {lat:55.603310, lng:13.001310},
        content:"<p>Tweet från malmö</p>",
        iconImage: image
      }
    ];

    //Går igenom markers i arrayen och placerar ut dom.
    for (var i = 0; i < markers.length; i++){
      tweetMarker(markers[i]);
    }

    function tweetMarker(props){
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map
      });
      
      if (props.iconImage){
        marker.setIcon(props.iconImage);
      }

      if (props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: "<i class=" + "material-icons" + ">" + "person" + "</i>" + "<p>" + props.content + "</p>"
      });

      marker.addListener("click", function(){
        infoWindow.open(map, marker);
      });
      }
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