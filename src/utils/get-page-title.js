import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Mall Manage'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
