# cssAnalyzer-client


https://user-images.githubusercontent.com/78012039/141608821-a8768e7e-7057-4634-91f0-5b37538e45a2.mov


https://user-images.githubusercontent.com/78012039/141608831-a9095784-b35e-4b20-b6b4-9c70b4ab340c.mov


- CSS Analyzer는 자바스크립트로 만들어진 웹사이트 CSS 분석 서비스입니다.
- 사용자는 속성, 태그, 브라우저 호환성, 그리고 색상 총 네 가지의 카테고리로 웹사이트에 사용된 요소들을 인터렉티브 그래프 혹은 시각적으로 확인할 수 있습니다.


## 목차
1. [프로젝트 동기](https://github.com/cssAnalyzer/cssAnalyzer-client/edit/dev/README.md#:~:text=%EC%86%8C%EA%B0%90-,%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EB%8F%99%EA%B8%B0,-%EC%A7%80%EB%82%9C%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC%20%EC%A7%84%ED%96%89%ED%95%98%EB%A9%B4%EC%84%9C)
2. [기술 스택](https://github.com/cssAnalyzer/cssAnalyzer-client/edit/dev/README.md#:~:text=%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%EB%A7%8C%EB%93%A4%EA%B3%A0%20%EC%8B%B6%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4.-,%EA%B8%B0%EC%88%A0%20%EC%8A%A4%ED%83%9D,-Client%20Side)
3. [스택 선택시 고려 사항](https://github.com/cssAnalyzer/cssAnalyzer-client/edit/dev/README.md#:~:text=d3.js-,%EC%8A%A4%ED%83%9D%20%EC%84%A0%ED%83%9D%EC%8B%9C%20%EA%B3%A0%EB%A0%A4%20%EC%82%AC%ED%95%AD,-React-persist)
   - React
   - Reduxjs/toolkit
   - React-persist
   - React-dnd
   - XPath
   - d3

4. [작업시 고려 사항](https://github.com/cssAnalyzer/cssAnalyzer-client/edit/dev/README.md#:~:text=%EC%9E%88%EB%8B%A4%EB%8A%94%20%EA%B2%83%EC%9D%B4%20%EB%A7%A4%EB%A0%A5%EC%A0%81%EC%9D%B4%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4.-,%EC%9E%91%EC%97%85%EC%8B%9C%20%EA%B3%A0%EB%A0%A4%20%EC%82%AC%ED%95%AD,-Property%20%EC%A0%95%EB%B3%B4%EB%A5%BC%20%EA%B0%80%EC%A0%B8%EC%98%A4%EB%8A%94)
   - React 와 d3 간의 랜더링 주도권 설정
   - Puppeteer 응답 속도 높이기

5. [아쉬운 점](https://github.com/cssAnalyzer/cssAnalyzer-client/edit/dev/README.md#:~:text=%EC%88%98%20%EC%9E%88%EB%8F%84%EB%A1%9D%20%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4.-,%EC%95%84%EC%89%AC%EC%9A%B4%20%EC%A0%90,-%EC%86%8C%EA%B0%90)

6. [소감](https://github.com/cssAnalyzer/cssAnalyzer-client/edit/dev/README.md#:~:text=%EC%95%84%EC%89%AC%EC%9A%B4%20%EC%A0%90-,%EC%86%8C%EA%B0%90,-%ED%8C%80%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC%20%ED%95%A0)


## 프로젝트 동기
- 지난 프로젝트를 진행하면서 CSS 실력이 많이 부족함을 느꼈습니다. 잘 만들어진 사이트의 CSS를 무조건 복사하는 것 말고, CSS에 대한 감을 키울 수 있는 다른 방법을 찾고 싶었습니다.
- 웹 페이지에 어떤 속성과 색이 쓰였는지 분석해주는 서비스가 있다면, 독창성을 유지하면서도 데이터를 토대로 CSS 실력 향상에 도움을 줄 수 있을만큼의 적당한 영감을 얻을 수 있을 것으로 기대했습니다.
- 무조건 가운데 정렬, 자동 정렬을 벗어나 시각적으로 예쁘면서도 개발에 도움이 되는 내용의 날렵한 사이트를 만들고 싶었습니다.  


## 기술 스택

|  Client Side      |  Server Side  |     etc           |
| :------------:    | :-----------: | :---------------: |
| React             | Node          | Javascript ES2015 |
| React-router-dom  | Express       | Cors              |
| Reduxjs/toolkit   | Puppeteer     | esLint            |
| Redux-persist     | XPath         | mdn-compat-data   |
| React-dnd         |
| Styled-components |               
| Styled-reset      |
| Exios             |
| d3.js             |  


## 스택 선택시 고려 사항
- React-persist
   - 서비스 특성상, 한 번 검색한 홈페이지를 다시 검색하게 될 가능성이 높다고 판단하여 React-persist를 도입, 새로운 검색어가 입력되기 전까지는 사용자의 로컬에 계속 해당 url과 검색 결과를 저장할 수 있도록 로직을 구성했습니다. 
- React-dnd
   - 단순한 드래그 앤 드랍 기능 외에는 사용하지 않을 것이기 때문에 관련 라이브러리 중 가장 가볍고 리액트 hook과 흡사한 구조의 로직을 가진 라이브러리를 선택했습니다. 또한, 예제와 공식 문서가 꾸준히 관리되어 러닝커브가 여타 라이브러리보다 낮았습니다.
- Puppeteer
  - 계속 변하는 불특정 다수의 홈페이지를 크롤링하기 위해서는 입력된 url을 이용해서 실제로 페이지에 들어가보는것이 불가피하다고 생각하여 headless Chrome을 선택했습니다.
- XPath
  - Puppeteer의 자체 api에서는 html tag의 종류를 알아야 크롤링으로 각 요소가 몇개인지 루프를 돌아 집계가 가능했습니다. 그러나 어떠한 사이트를 검색해야할지 에측할 수 없는 서비스의 특성상, tag의 종류를 몰라도 해당 객체의 property를 가져올 수 있는 XPath의 도입이 불가피했습니다.
- d3
  - 단순히 뷰를 그려주는 것에서 그치지 않고, 사용자와 인터렉션(ex. 그래프 각 요소를 클릭하면 검색페이지로 이동)이 가능한 그래프 관련 라이브러리를 찾아보았습니다. 그 중, 공식 홈페이지에 자체 api를 뼈대가 되는 물리 & 수학 공식까지 가장 자세하게 설명한 라이브러리가 d3 였습니다. 또한, Jquery와 흡사한 체이닝 방식을 이용해서 그래프의 각 요소를 원하는대로 커스터마이징할 수 있다는 것이 매력적이었습니다.

## 작업시 고려 사항
 - Property 정보를 가져오는 방법에 대한 고민
   - 사용자가 입력한 url에 get 요청으로 CSS file 만을 요청해서 받는 방법이 가장 빠른 응답 속도를 갖고 있었습니다. 그러나 검색 결과의 정확도를 위해서는 computedCSS property가 필요했고, 해당 속성은 CSS file만으로는 확인할 수 없었습니다. 또한 CSS 를 사용하지 않고 React나 Vue 등과 같은 framework를 사용하는 홈페이지의 url이 검색어로 들어왔을 경우를 처리할 수 없어지기 때문에 로직의 안전성을 위해 해당 페이지의 모든 요소의 property 정보를 가져오는 것으로 로직을 수정했습니다.
 - Puppeteer 응답 속도 높이기 
   - 모든 요소의 property 정보를 루프를 돌며 가져오자, 로직에서 처리한 데이터의 정확도는 상승했으나 그와 비례하여 응답 속도는 느려졌습니다. 이에 다음 조치를 통해 응답 속도를 33% 감소할 수 있었습니다.
      - Page의 성격에 따라 Puppeteer 에 다른 option을 넣어 총 크롤링 시간을 줄였습니다. 예를 들어 태그 데이터는 html에서 가져와야하기 때문에, css가 모두 랜더링될 때까지 퍼페티어가 대기할 필요가 없었습니다. 따라서 요청을 보내는 페이지에 따라 다음 단계로 시간을 단축하고 바로 넘어갈 수 있는 옵션을 적용했습니다.
   - mdn-compat-data.js 라이브러리를 사용, 8가지 종류의 브라우저에서 어떤 속성이 어떤 버전부터 지원되었는지 별도의 요청없이 분류할 수 있도록 했습니다.
 
## 아쉬운 점
  - 더 정열된 로직 작성
    - 리액트와 d3, 둘 중 누구에게 랜더링 주도권을 주어야하나에 고민을 했습니다. 보글거리는 개별 데이터의 움직임을 위해서는 어차피 d3의 물리기반 함수들을 사용해야하며, 동적생성의 키라고 볼 수 있는 검색결과 응답이 한꺼번에 d3에 들어가야 그 안에서 순회를 돌며 각 요소를 동적으로 생성한다는 것을 알고 d3가 주로 랜더링을 하게 만들었습니다. 그러다보니 리액트는 상태 변화에 따른 랜더링 여부와 라우터 동작을 포함한 기본 기능 밖에 담당하지 못했습니다. 만일 리액트와 d3를 조화롭게 썼다면 d3 로직의 끊임없는 체이닝을 개별 데이터 svg 단위로 끊어 좀 더 깔끔한 로직 생성이 가능했을 것입니다.
  - 배포
    - 로컬에서는 쌩쌩 잘 돌아가는 프로젝트가 AWS에 배포하자 전혀 돌아가지 않았습니다. nginx에 구성 요소 중 puppeteer 를 위한 chromium이 없기 때문이었습니다. 하지만 배포 환경에 nginx를 깔아도 로직은 빈 객체만 계속 뱉어냈습니다. puppeteer와 chromium 외에 배포환경의 무엇이 다르기에 빈 객체만 나오는지 지금까지도 알 수 없습니다. 그러나 배포는 언제나 예상치 못한 일이 생기기 때문에 배포 이후를 대응할 시간 역시 여유롭게 잡아야한다는 것을 인지했습니다.

## 소감
- 팀 프로젝트를 할 때는 팀원들과 으쌰으쌰하는 분위기에 적절한 텐션이 유지될 수 있었는데, 개인 프로젝트를 진행하다보니 에러와 씨름을 하거나 라이브러리에 대해 공부한 날(= 작성한 코드가 적은 날)에는 과거의 제가 작성한 계획에 끌려가는 느낌이 들었습니다. 또한, 팀 프로젝트에서 함께 스터디하고 설계했던 내용들이 이번 프로젝트에서의 좀 더 깔끔한 로직 작성에 기여한 것을 알 수 있었습니다. (ex. app 최상단에서 에러 컴포넌트 사용하면서 리덕스로 에러 관리하기) 이 자리를 빌어 팀원분들 감사합니다.
- 새로운 라이브러리를 학습하는데에 생각보다 많은 시간이 소요된다는 것을 알 수 있었습니다. 그러나, 새로 습득해야하는 라이브러리가 있을수록 시간을 더 효율적으로 사용하며 정보를 찾기 위해서 어떠한 방식으로 접근해야하는지 이번 기회에 깨달았습니다. 사용하는 프로그램 / 라이브러리의 버전 및 공식 홈페이지의 릴리즈 노트의 중요성 또한 알게되었습니다.
- 이번에 Puppeteer를 사용하면서 최소 시간에 최대 효율을 낼 수 있는, time cost를 줄일 수 있는 방향을 많이 고려할 수 있어서 머리는 아팠지만 즐거웠습니다. 2초는 작은 시간이지만, 전체 응답 시간의 33% 이라는 점에서 결코 작지 않은 시간입니다. 시간 복잡도의 중요성이 공간 복잡도보다 무거운 프로젝트에서 33%를 줄여냈다고 생각하니 기분이 좋습니다. 😃
