import React from "react";
import Head from "next/head";

const Seo: React.FC = () => {
  return (
    <div>
      <div>
        <p>
          1. SEO 란? SEO(Search Engine Optimization, 검색 엔진 최적화) 검색
          엔진의 작동 방식에 맞게 웹 페이지를 최적화해주는 작업. SEO를 통해 검색
          엔진에서 웹 페이지를 보다 더 상위에 노출될 수 있게끔 만들 수 있다.
          <br /> 2. React에서 SEO 하는 방법 React 로 작성된 대부분의 콘텐츠는
          기본적으로 CSR(Client Side Rendering) 이다. 구글봇은 JS 를 해석할 수
          있기에 SEO에 문제는 없지만, SPA 방식이기 때문에 SSR 보다 크롤링에
          시간이 더 걸린다고 한다. 다음은 React 를 사용할 때 좀더 SEO 에 영향을
          줄 수 있는 방법들이다. 1. robots.txt 설정 구글봇(구글 웹 크롤러 봇)
          에게 수집 정보를 알려주는 robots.txt 파일을 설정해준다.(React 에서는
          public 폴더 내) 2. pre-render (SSR / SSG) SSR(Next.js 이용)을 쓰거나
          react-snap 라이브러리를 사용하여 빌드될 때 미리 렌더링을 해준다.
          SSR(Server-side Rendering) : 클라이언트에서 요청을 받을 때마다
          서버에서 HTML 을 생성하여 제공하는 방식. rendering happens with SSR
          when a browser requests a URL SSR can be more dynamic but slower due
          to additional latency while the server renders the content before
          sending it to the user’s browser. SSG(Static Site Generation / Static
          Rendering) : 배포 시점, 즉 빌드 시에 정적 파일을 생성하는 방식.
          pre-rendering JavaScript into HTML before a browser requests the URL
          SSG is faster, as the content has already been rendered, meaning it
          can be served to the user immediately (meaning a quicker TTFB).
          <br /> 3. meta tag title, name, content 등의 meta tag 를 설정하는
          방법이 있다. React 는 설정할 수 있는 정적 페이지가 index.html 하나
          뿐이므로 react-helmet 라이브러리를 사용해서 페이지별 메타태그를 변경할
          수 있다고 한다.
          <br /> 4. 올바른 Status Code 사용하기 200, 404 등 올바른 HTTP status
          code 를 사용해야 한다.
          <br /> 5. 올바른 URL 사용하기 /#/ 페이지별로 링크되는 fragment(#) 사용
          지양하기. 구글봇은 # 뒤의 내용을 무시하는 경우가 많다.
          <br /> 6. 링크에 "a href" 사용하기. 해당 태그가 없으면 구글이 URL 을
          크롤링하지 못한다.
          <br /> 7. click이나 hover 등의 유저의 이벤트 결과로 컨텐츠가 나타나게
          해 놓을 경우, 해당 컨텐츠가 검색에서 제외될 가능성이 높음. 대신
          Accordions, Modals, Tabs, Mega menus(full-width dropdown menu in a
          navigation bar), Hamburger menus(가로선 세개로 이루어진 아이콘에
          링크된 리스트) 등을 사용하거나, CSS 의 visibility: hidden; 혹은
          display: none; property 를 사용하면 된다.
        </p>
      </div>
    </div>
  );
};

export default Seo;
