import {Status, Wrapper} from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap.tsx";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap />;
  }
};

function App() {

  return (
    <Wrapper apiKey="구글에서 받은 api key" render={render} libraries={['marker']}/>
  )
}

export default App