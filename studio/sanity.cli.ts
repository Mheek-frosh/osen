import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'glm7nutk'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {projectId, dataset},
  studioHost: 'osen-luxe-glm7nutk',
  deployment: {
    appId: 't2g68w6x6v9kigweo7ws5jp9',
    autoUpdates: true,
  },
})
