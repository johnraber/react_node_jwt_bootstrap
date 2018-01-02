import React from 'react';
//import { Link } from 'react-router-dom';
import { userService } from '../services/user.service';


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout = () => {

    userService.logout( () => {

    });
  }

  render() {
    return (
      <div>
        <h1>React Slingshot - Home</h1>
        <div>
          {/*<Link class="btn" onClick={this.logout}>Logout</Link>*/}
        </div>
      </div>

    );
  }
}

export default HomePage;
