import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { SecureAPIInstance } from "../api/axiosInstance";
import UserItem from "../components/UserItem/UserItem";
import Footer from "../components/Footer/Footer";
import "./rewards.css";

export const MyRewardsPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    SecureAPIInstance.get("/users")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar history={history} />
      <div className="listContainerRewards">
        <div className="listWrapperRewards">
          <div className="listResult">

          {/* <h2 className="pageHeading">My Account</h2> */}
            {isLoading ? (
              "Loading..."
            ) : (
              <>
              <div class="wrapper">
              <div class="left">
                  <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png" 
                  alt="user" width="100"/>
                  <p>{user.tier} MEMBER</p>
                  <h4>{user.firstName} {user.lastName}</h4>
                  <h4>{user.rewardPoints}</h4>
                  <p>POINTS</p>
                   
              </div>
              <div class="right">
                  <div class="info">
                      <h3>Information</h3>
                      <div class="info_data">
                           <div class="data">
                              <h4>Email</h4>
                              <p>{user.email}</p>
                           </div>
                           <div class="data">
                             <h4>Phone</h4>
                              <p>{user.phone}</p>
                        </div>
                      </div>
                  </div>
                
                <div class="projects">
                      <h3>EXPLORE BENEFITS: </h3>
                      <div class="projects_data">
                           <div class="data">
                              <h4>IT PAYS TO BE ELITE</h4>
                              <p>Points required for tier</p>
                           </div>
                        </div>
                        <div class="projects_data">
                           <div class="data">
                              <h4>SILVER</h4>
                              <p>5000 Points</p>
                           </div>
                          </div>
                          <div class="projects_data">
                           <div class="data">
                              <h4>GOLD</h4>
                              <p>10000 Points</p>
                           </div>
                          </div>
                           <div class="projects_data">
                           <div class="data">
                              <h4>PLATINUM</h4>
                              <p>20000 Points</p>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
                
              </>
            )}

          </div>
        
        </div>
      </div>
      {/* <UserItem />
      <Footer /> */}
    </>
  );
};