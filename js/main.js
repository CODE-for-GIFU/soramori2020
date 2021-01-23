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
    Basic_Map[ 5 ] = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; <a href="http://www.esrij.com/"> Esri Japan </a>'
    });
    
    var map = L.map('map').setView([35.90756888, 137.2070009], 10);
    map.addLayer( Basic_Map[ 3 ] );

    var baseMap = {
        "国土地理院 写真": Basic_Map[ 3 ],
        "国土地理院 標準地図": Basic_Map[ 1 ],
        "国土地理院 淡色地図": Basic_Map[ 2 ],
        "国土地理院 白地図": Basic_Map[ 4 ],
        "OpenStreetMap": Basic_Map[ 0 ],
        "Esri World Topo Map": Basic_Map[ 5 ],
    };
    L.control.layers(baseMap).addTo(map);

    //危険地域JSON
    $.getJSON("./data/gifu_redzone.geojson", function(geojson){
        var myStyle = {
            "color": "#dd0000",
            "weight": 1,
            "opacity": 0.65
        };
        L.geoJSON(geojson,{
                style:myStyle,
                }).addTo(map);
        L.getJSON
    });
    //凡例の追加
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
            var img = L.DomUtil.create('img');
            img.src = "./img/hanrei.png";
            return img;
    };
    legend.addTo(map);

    //災害地点JSON
    let H30_URYO = "https://cfgifu.users.earthengine.app/view/gifu"
    let H30_PATH = "./img/pos/h30/"
    disastars = [
       {  "lat" : "36.37307755",  "lon" : "137.1800354",  "name" : "（国）３６０号",  "higai" : "土砂流出",  "img" : "image10.jpeg",  "geelink" : "",  },
       {  "lat" : "36.34132121",  "lon" : "137.1792141",  "name" : "コカ谷",  "higai" : "土砂流出",  "img" : "image15.png",  "geelink" : "",  },
       {  "lat" : "36.09314497",  "lon" : "136.9354637",  "name" : "（国）１５６号",  "higai" : "土砂崩れ",  "img" : "image14.jpeg",  "geelink" : "https://cfgifu.users.earthengine.app/view/udc2020route156",  },
       {  "lat" : "36.25800645",  "lon" : "137.1454502",  "name" : "宮川",  "higai" : "護岸決壊",  "img" : "image6.jpeg",  "geelink" : "",  },
       {  "lat" : "36.26934474",  "lon" : "137.3986111",  "name" : "（主）高山上宝線",  "higai" : "路側決壊",  "img" : "image7.jpeg",  "geelink" : "",  },
       {  "lat" : "36.20031121",  "lon" : "137.2235634",  "name" : "瓜単川",  "higai" : "護岸決壊",  "img" : "image4.jpeg",  "geelink" : "https://cfgifu.users.earthengine.app/view/udc2020urisugawa",  },
       {  "lat" : "36.13475673",  "lon" : "137.248567",  "name" : "苔川",  "higai" : "護岸決壊",  "img" : "image5.jpeg",  "geelink" : "",  },
       {  "lat" : "36.12636137",  "lon" : "137.2470499",  "name" : "山王洞",  "higai" : "土砂崩れ",  "img" : "image11.jpeg",  "geelink" : "https://cfgifu.users.earthengine.app/view/udc2020sanoudo",  },
       {  "lat" : "35.98418789",  "lon" : "136.9797218",  "name" : "（一）惣則高鷲線",  "higai" : "舗装破損",  "img" : "image9.jpeg",  "geelink" : "",  },
       {  "lat" : "35.93646212",  "lon" : "136.8351072",  "name" : "（国）１５６号",  "higai" : "ブロック倒壊",  "img" : "image8.jpeg",  "geelink" : "",  },
       {  "lat" : "35.75123964",  "lon" : "137.0893633",  "name" : "和良川",  "higai" : "護岸決壊",  "img" : "image3.jpeg",  "geelink" : "",  },
       {  "lat" : "35.90756888",  "lon" : "137.2070009",  "name" : "上呂地区",  "higai" : "土砂崩れ",  "img" : "image13.jpeg",  "geelink" : "https://cfgifu.users.earthengine.app/view/udc2020jouro",  },
       {  "lat" : "35.73036532",  "lon" : "137.1993812",  "name" : "中原小学校裏",  "higai" : "土砂崩れ",  "img" : "image12.jpeg",  "geelink" : "https://cfgifu.users.earthengine.app/view/udc2020nakahara",  },
       {  "lat" : "35.64127875",  "lon" : "137.1583055",  "name" : "（主）関金山線",  "higai" : "路側決壊",  "img" : "image2.jpeg",  "geelink" : "",  },
   ];

    //ピン
    var pin_alert = L.icon({
        iconUrl: 'img/pin_alert.png',
        iconSize: [50, 58],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
    var pin_warn = L.icon({
        iconUrl: 'img/pin_warn.png',
        iconSize: [50, 58],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
    
    //災害情報を地図にプロット
    for (let i=0;i < disastars.length;i++) {
        let pos = disastars[i];
        let pin = (pos.geelink != "") ? pin_alert : pin_warn;
        let marker = L.marker([parseFloat(pos.lat),parseFloat(pos.lon)],{icon: pin}).addTo(map);

        let popup = "<p>";
        popup += "【"+pos.higai+"】" + pos.name;
        popup += "<br/><img src='"+H30_PATH+pos.img+"' width='350'><br/>";
        if (pos.geelink != "") {
            popup += "<a href='"+pos.geelink+"' target='gee'>災害箇所（衛星データ解析）</a>";
        }
        popup += "</p>";

        marker.bindPopup(popup);
    }
    
}

