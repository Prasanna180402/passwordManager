// eslint-disable-next-line

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']
class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUserName = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {username, password, website} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(previous => ({
      latestList: [...previous.latestList, newValues],
      userName: '',
      website: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(list => list.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state
    let isTrue = this.state
    const newList = latestList.filter(eachVal =>
      eachVal.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.listenUserName}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="sub-div-img1"
          />
        </div>

        <div className="sub-div2">
          <div className="first">
            <div className="your-passwords">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-element"
                onChange={this.searchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(each => (
                <li className="item" id={each.id} key={each.id}>
                  <p className={`initial ${each.classAdd}`}>
                    {each.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{each.websiteName}</p>
                    <p className="website">{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{each.Password}</p>}
                  </div>
                  <button
                    className="del-btn"
                    type="button"
                    onClick={() => {
                      this.deleteItem(each.id)
                    }}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
