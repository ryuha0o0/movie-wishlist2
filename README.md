# 🎬 Movie Wishlist 🎥

**Movie Wishlist**는 TMDB(The Movie Database) API를 이용해 영화를 불러오고, 사용자가 로컬 스토리지를 통해 관리하며 각 영화에 좋아요를 추가할 수 있는 웹 애플리케이션입니다. 사용자는 로그인 후 위시리스트 탭에서 추가한 영화를 볼 수 있습니다. 또한, 다크모드/라이트모드 전환, 영화 필터링 및 검색 기능을 제공합니다. 🌙✨

## 실시간 데모 🌐
프로젝트는 [GitHub Pages](https://ryuha0o0.github.io/movie-wishlist2/)에서 확인하실 수 있습니다. 📱💻

## 주요 기능 ✨
- **🌑 다크모드/🌞 라이트모드 전환**: 다크모드와 라이트모드 사이를 전환할 수 있어 사용자 경험을 개선합니다. 👀
- **🎬 영화 리스트 및 필터링**: TMDB API에서 가져온 영화 리스트를 장르, 인기, 개봉일 등을 기준으로 필터링하여 표시합니다. 📊
- **💖 위시리스트 추가 기능**: 각 영화에 대해 "좋아요" 버튼을 클릭하여 위시리스트에 추가하고, 로컬 스토리지에 저장됩니다. 📥
- **🔐 로그인 기능**: 사용자는 이메일과 비밀번호로 로그인하여 개인화된 서비스를 이용할 수 있습니다. 👤
- **📜 무한 스크롤**: 사용자가 스크롤을 내릴 때마다 자동으로 더 많은 영화를 불러옵니다. 🌀
- **🔍 검색 기능**: 영화 제목을 검색하고, 장르, 평점 등 다양한 기준으로 필터링하여 영화를 찾을 수 있습니다. 🔎

## 설치 및 실행 방법 ⚙️

1. [파일 다운로드]
2. [npm install]
3. [npm start]

**참고**: 사이트의 다른 탭에 들어가려면 먼저 로그인해야 해요! 로그인 후, 위시리스트 탭에서 좋아요를 추가한 영화와 함께 이메일을 확인할 수 있습니다. 📧

## 코드 설명 📝
### 주요 컴포넌트 및 파일 🗂️
- **App.js**: 애플리케이션의 진입점으로, 라우팅과 전체적인 구조를 관리합니다. 🏠
- **Main.js**: 메인 페이지입니다. ('/') 🎬
- **MovieCard.js**: 영화 정보를 카드 형태로 표시하는 컴포넌트입니다. 🎴
- **Popular.js**: 인기 영화를 불러옵니다. ('/popular') 🌟
- **Login.js**: 로그인 기능을 담당하는 컴포넌트입니다.('/signup') 🔑
- **Wishlist.js**: 사용자가 추가한 영화를 관리하는 위시리스트 페이지입니다.('/wishlist') 💖
- **Search.js**: 사용자가 영화를 검색하고 필터링할 수 있습니다.('/search') 🔍

### 핵심 로직 🔑
- **TMDB API와의 통신**: 영화 데이터를 가져오기 위해 `fetchMovies` 함수에서 TMDB API와 통신합니다. 🌐
- **상태 관리**: 사용자의 로그인 상태와 위시리스트 데이터를 로컬 스토리지에 저장하여 페이지가 새로고침되더라도 상태를 유지합니다. 🔄
- **이벤트 처리**: 영화 카드에서 "좋아요" 버튼을 클릭하여 영화를 위시리스트에 추가하는 기능을 처리합니다. 👍

## 기술 스택 🛠️
- **React**: 프론트엔드 라이브러리 ⚛️
- **TMDB API**: 영화 데이터 제공 🌍
- **CSS**: 스타일링 🎨
- **JavaScript**: 기능 구현 🔧
- **GitHub Pages**: 배포 📡
- **Local Storage**: 사용자 데이터 저장 🗄️

## 그 외 정보 📚
- **스크린샷/기타 시각적 자료**: 로그인 후, 위시리스트 탭에서 사용자의 이메일과 함께 위시리스트가 표시됩니다. 로그인 전에 다른 탭에는 접근할 수 없어요! 😅
![img_1.png](img_1.png)
---