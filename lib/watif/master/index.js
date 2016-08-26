/* globals application WatifStory */

import Universe from './universe'

application.setInterface({
  startStory,
})

function startStory (storyCode) {
  eval.call(this, storyCode) // eslint-disable-line no-eval
  const story = WatifStory

  const universe = new Universe(story)
  // keep universe from being garbage collected
  self.__watif_universe__ = universe
  application.remote.storyStarted()
}
