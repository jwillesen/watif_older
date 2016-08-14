/* globals application WatifStory */

import Universe from './universe'

application.setInterface({
  startStory,
})

function startStory (storyCode) {
  eval.call(this, storyCode) // eslint-disable-line no-eval
  const story = WatifStory

  // keep universe from being garbage collected
  self.__watif_universe__ = new Universe(story)
  application.remote.storyStarted()
}
