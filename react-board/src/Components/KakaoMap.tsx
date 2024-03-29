import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  const [mapLevel, setMapLevel] = useState<number>(8);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: mapLevel
    };

    const initializedMap = new window.kakao.maps.Map(container, options);
    setMap(initializedMap);

    var marker = new window.kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: initializedMap.getCenter()
    });

    marker.setMap(initializedMap);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    if (initializedMap) {
      window.kakao.maps.event.addListener(
        initializedMap,
        "click",
        function (mouseEvent: any) {
          // 클릭한 위도, 경도 정보를 가져옵니다
          var latlng = mouseEvent.latLng;

          marker.setPosition(latlng);

          var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
          message += "경도는 " + latlng.getLng() + " 입니다";

          var resultDiv = document.getElementById("result");
          if (resultDiv) {
            resultDiv.innerHTML = message;
          }
        }
      );
    }

    if (initializedMap) {
      window.kakao.maps.event.addListener(
        initializedMap,
        "dragend",
        function () {
          // 지도 중심좌표를 얻어옵니다
          var latlng2 = initializedMap.getCenter();

          var message2 =
            "변경된 지도 중심좌표는 " + latlng2.getLat() + " 이고, ";
          message2 += "경도는 " + latlng2.getLng() + " 입니다";

          var resulted = document.getElementById("haves");
          if (resulted) {
            resulted.innerHTML = message2;
          }
        }
      );
    }

    // var markerPosition = new window.kakao.maps.LatLng(
    //   34.365264512305174,
    //   126.10676860117488
    // );
    // var marker = new window.kakao.maps.Marker({
    //   position: markerPosition
    // });
    // marker.setMap(initializedMap);
  }, [mapLevel]);

  function zoomIn() {
    if (mapLevel > 1) {
      setMapLevel(mapLevel - 1);
    }
  }
  function zoomOut() {
    if (mapLevel < 13) {
      setMapLevel(mapLevel + 1);
    }
  }

  function setMapType(maptype: string) {
    var roadmapControl = document.getElementById("btnRoadmap");
    var skyviewControl = document.getElementById("btnSkyview");

    console.log(roadmapControl);
    console.log(skyviewControl);

    if (maptype === "roadmap") {
      map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
      roadmapControl?.classList.add("selected_btn");
      skyviewControl?.classList.remove("selected_btn");
    } else {
      map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
      skyviewControl?.classList.add("selected_btn");
      roadmapControl?.classList.remove("selected_btn");
    }
  }

  return (
    <div>
      <div className="map_wrap">
        <div id="map"></div>
        <div className="custom_typecontrol radius_border">
          <span
            id="btnRoadmap"
            className="selected_btn"
            onClick={() => setMapType("roadmap")}
          >
            지도
          </span>
          <span
            id="btnSkyview"
            className="btn"
            onClick={() => setMapType("skyview")}
          >
            스카이뷰
          </span>
        </div>

        <div className="custom_zoomcontrol radius_border">
          <span onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </span>
          <span onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </span>
        </div>
      </div>
      <div className="res">
        <div id="result">res</div>
        <div id="haves">hav</div>
        <button onClick={zoomIn}>지도레벨 - 1</button>
        <button onClick={zoomOut}>지도레벨 + 1</button>
        <span id="maplevel">
          "현재 지도 레벨은 {mapLevel} 레벨 입니다."
          <hr />
        </span>
      </div>
    </div>
  );
};

export default KakaoMap;
