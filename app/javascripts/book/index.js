import * as actions from './actions'

export const introduction = {
  text: "When you agreed to house sit for the Bakers\', you didn't know what you were getting into.",
  verbs: [{
    label: 'start',
    arity: 0,
    action: actions.startStory(),
  }],
}

export default introduction
