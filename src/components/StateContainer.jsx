import React from 'react'
import wordSet from 'more-words'
import Header from './Header'
import SplashImage from './SplashImage'
import Grid from 'material-ui/Grid'
import SubmitButton from './SubmitButton'
import PasswordPresenter from './PasswordPresenter'
import SliderFilter from './SliderFilter.jsx'

class StateContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      passwordContent: [],
      passwordMaxLength: 20,
      passwordMaxWordLengthPossible: 5,
      passwordMaxWordLengthCurrent: 3,
    }
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this)
    this.handleMaxWordLengthInput = this.handleMaxWordLengthInput.bind(this)
    this.handleMaxPasswordLengthInput = this.handleMaxPasswordLengthInput.bind(
      this
    )
    this.handleUpdatingPasswordLength = this.handleUpdatingPasswordLength.bind(
      this
    )
  }

  pickRandomIndex(array = []) {
    return Math.floor(Math.random() * array.length)
  }

  generatePassword(words = ['']) {
    const maxWordLength = this.state.passwordMaxWordLengthCurrent
    const filteredWords = this.filterWordSet(words, maxWordLength)
    return new Array(4)
      .fill('')
      .map(() => filteredWords[this.pickRandomIndex(filteredWords)])
  }

  filterWordSet(words, maxWordLength) {
    return words.filter(word => word.length <= maxWordLength)
  }

  handleSubmitButtonClick() {
    window.scroll({ left: 0, top: 1000, behavior: 'smooth' })
    const newPass = this.generatePassword(wordSet)
    this.setState(() => ({ passwordContent: newPass }))
  }

  handleMaxWordLengthInput(event) {
    const currentValue = parseInt(event.target.value, 10)
    this.setState(
      () => ({
        passwordMaxWordLengthCurrent: currentValue,
      }),
      () => this.handleSubmitButtonClick()
    )
  }

  handleMaxPasswordLengthInput(event) {
    const maxLength = parseInt(event.target.value, 10)
    this.setState(
      () => ({
        passwordMaxLength: maxLength,
      }),
      this.handleUpdatingPasswordLength
    )
  }

  handleUpdatingPasswordLength() {
    const newMaxWordLength = Math.floor(this.state.passwordMaxLength / 4)
    this.setState(
      prevState => {
        const adjustedMaxWordLength =
          prevState.passwordMaxWordLengthCurrent < newMaxWordLength
            ? prevState.passwordMaxWordLengthCurrent
            : newMaxWordLength
        return {
          passwordMaxWordLengthPossible: newMaxWordLength,
          passwordMaxWordLengthCurrent: adjustedMaxWordLength,
        }
      },
      () => this.handleSubmitButtonClick()
    )
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item md={12}>
            <div>
              <Header
                className="banner"
                textContent="You Need A Long Password"
              />
              <SplashImage
                id="main-image"
                imageUrl="https://imgs.xkcd.com/comics/password_strength.png"
              />
              <Header className="banner" textContent="Make Me One!" />
              <SubmitButton
                id="new-password-submit"
                clickHandler={this.handleSubmitButtonClick}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item id="control-panel" md={6}>
            <div>
              <SliderFilter
                title="Max Length"
                inputId="slider-max-password-length"
                min={12}
                max={28}
                newSelectionHandler={this.handleMaxPasswordLengthInput}
                value={this.state.passwordMaxLength}
              />
            </div>
          </Grid>
          <Grid item id="control-panel" md={6}>
            <div>
              <SliderFilter
                title="Max Word Length"
                inputId="slider-max-word-length"
                min={3}
                max={this.state.passwordMaxWordLengthPossible}
                newSelectionHandler={this.handleMaxWordLengthInput}
                value={this.state.passwordMaxWordLengthCurrent}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <PasswordPresenter
              id="password-container"
              passwordContent={this.state.passwordContent}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default StateContainer
