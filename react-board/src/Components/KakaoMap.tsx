import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  const [mapLevel, setMapLevel] = useState<number>(8);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: mapLevel
    };

    const map = new window.kakao.maps.Map(container, options);

    var markerPosition = new window.kakao.maps.LatLng(
      34.365264512305174,
      126.10676860117488
    );
    var marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
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

  return (
    <div>
      <div>
        <div id="map"></div>
        <p>
          <button onClick={zoomIn}>지도레벨 - 1</button>
          <button onClick={zoomOut}>지도레벨 + 1</button>
          <span id="maplevel">"현재 지도 레벨은 {mapLevel} 레벨 입니다."</span>
        </p>
      </div>
    </div>
  );
};

export default KakaoMap;
