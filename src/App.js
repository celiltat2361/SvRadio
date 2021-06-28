import {BrowserRouter, Route} from "react-router-dom" ;


import Navbar from './components/Navbar';
import ChannelProvider from "./contexts/ChannelContext";
import UserProvider from "./contexts/UserContext";
import ProgramProvider from './contexts/ProgramContext';
import ChannelDetails from "./pages/ChannelDetails";
import ProgramDetails from './pages/ProgramDetails' ;
import Categories from './pages/Categories';
import Channels from './pages/Channels' ;
import Programs from './pages/Programs';
import Login from "./pages/Login";
import Register from './pages/Register' ;
import ProgramsOfCategory from "./pages/ProgramsOfCategory";
import MyPage from "./pages/MyPage";
import Favorites from "./pages/Favorites";
import EditUser from "./pages/EditUser";
import ChannelsSchedule from "./pages/ChannelsSchedule";
import ProgramsOfChannel from "./pages/ProgramsOfChannel";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <UserProvider>
          <ProgramProvider>
            <ChannelProvider>
              <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={Home} />

                <Route exact path="/channels" component={Channels} />
                <Route exact path="/channels/:channelId" component={ChannelDetails}/>
                <Route exact path="/channels/schedule/:channelId" component={ChannelsSchedule}/>
                <Route exact path="/channels/programs/:channelId" component={ProgramsOfChannel}/>

                <Route exact path="/programs" component={Programs} />
                <Route exact path="/programs/:programId" component={ProgramDetails}/>

                <Route exact path="/categories" component={Categories}/>
                <Route exact path="/categories/programs/:categoryId" component={ProgramsOfCategory}/>

                <Route exact path="/favs/:userID" component={Favorites}/>
                <Route exact path="/users/mypage" component={MyPage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/edit/:userID" component={EditUser} />

              </BrowserRouter>
            </ChannelProvider>
          </ProgramProvider>
      </UserProvider>
    </div>
  );
}

export default App;
