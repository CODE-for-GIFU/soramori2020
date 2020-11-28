jQuery(document).ready(function( $ ) {

  
});

function init() {
    var Basic_Map = new Array();
    Basic_Map[ 0 ] = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        continuousWorld: false
    });
    Basic_Map[ 1 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    Basic_Map[ 2 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    Basic_Map[ 3 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    Basic_Map[ 4 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    Basic_Map[ 5 ] = L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
        variant: 'toner-background'
    });
    Basic_Map[ 6 ] = L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
        variant: 'toner-lite'
    });
    Basic_Map[ 7 ] = L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 16,
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
        variant: 'watercolor'
    });
    Basic_Map[ 8 ] = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; <a href="http://www.esrij.com/"> Esri Japan </a>'
    });
    Basic_Map[ 9 ] = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 13,
        attribution: 'Tiles by <a href="http://www.esrij.com/"> Esri Japan </a>'
    });
    
    var map_104 = L.map('map_104').setView([35.65809922, 137.04135747], 9);
    map_104.addLayer( Basic_Map[ 5 ] );

    var baseMap = {
        "OpenStreetMap": Basic_Map[ 0 ],
        "国土地理院 標準地図": Basic_Map[ 1 ],
        "国土地理院 淡色地図": Basic_Map[ 2 ],
        "国土地理院 写真": Basic_Map[ 3 ],
        "国土地理院 白地図": Basic_Map[ 4 ],
        "Stamen Toner-Background": Basic_Map[ 5 ],
        "Stamen Toner-Lite": Basic_Map[ 6 ],
        "Stamen Watercolor": Basic_Map[ 7 ],
        "Esri World Topo Map": Basic_Map[ 8 ],
        "Esri Ocean Base Map": Basic_Map[ 9 ],
    };
    L.control.layers(baseMap).addTo(map_104);

    //災害地点JSON
    disastars = [
         {"lat":35.6580,"lon":137.0413,"name":"災害地点１","geelink":"http://yahoo.co.jp","img":"img/pos/pos01.png"}
        ,{"lat":35.8080,"lon":137.3013,"name":"災害地点２","geelink":"http://yahoo.co.jp","img":"img/pos/pos02.png"}
    ];

    //ピン
    var pin = L.icon({
        iconUrl: 'img/pin.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });

    //災害情報を地図にプロット
    // let layers = {};
    // layers["2018年7月"] = L.layerGroup();
    for (let i=0;disastars.length;i++) {
        let pos = disastars[i];
        let marker = L.marker([pos.lat,pos.lon],{icon: pin}).addTo(map_104);
        marker.bindPopup("<p>"
            + pos.name
            + "<br/><img src='"+pos.img+"'><br/>"
            + "<a href='"+pos.geelink+"' target='gee'>災害箇所（GEE解析）</a>"
            +"</p>"
        );
    }
    
}

