import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 8
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
  }, []);

  return (
    <div>
      <div id="map"></div>
    </div>
  );
};

export default KakaoMap;
