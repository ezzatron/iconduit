module.exports = {
  buildWebAppManifest,
}

function buildWebAppManifest (manifest) {
  const {
    applications: {preferNative},
    categories,
    color: {background: backgroundColor, theme: themeColor},
    description,
    displayMode,
    iarcRatingId,
    language,
    name,
    orientation,
    scope,
    shortName,
    startUrl,
    textDirection,
  } = manifest

  const webManifest = {}

  addNonDefault(webManifest, 'dir', textDirection, 'auto')
  addOptional(webManifest, 'lang', language)
  add(webManifest, 'name', name)
  addOptional(webManifest, 'short_name', shortName)
  addOptional(webManifest, 'description', description)
  addNonDefault(webManifest, 'scope', scope, '.')
  addNonEmpty(webManifest, 'icons', buildWebAppManifestIcons(manifest))
  add(webManifest, 'display', displayMode)
  addNonDefault(webManifest, 'orientation', orientation, 'any')
  addOptional(webManifest, 'start_url', startUrl)
  addOptional(webManifest, 'serviceworker', buildWebAppManifestServiceWorker(manifest))
  add(webManifest, 'theme_color', themeColor)

  const applications = buildWebAppManifestRelatedApplications(manifest)

  if (applications.length > 0) {
    add(webManifest, 'related_applications', applications)
    addNonDefault(webManifest, 'prefer_related_applications', preferNative, false)
  }

  add(webManifest, 'background_color', backgroundColor)
  addNonEmpty(webManifest, 'categories', categories)
  addOptional(webManifest, 'iarc_rating_id', iarcRatingId)

  return webManifest
}

function buildWebAppManifestIcons (manifest) {
  const {output: {
    webAppIconMaskable: maskable = {},
    webAppIconMasked: masked = {},
  }} = manifest

  const icons = []

  for (const key in masked) {
    const {htmlSizes, path, type} = masked[key]

    const icon = {}

    add(icon, 'src', path)
    add(icon, 'sizes', htmlSizes)
    add(icon, 'type', type)

    icons.push(icon)
  }

  for (const key in maskable) {
    const {htmlSizes, path, type} = maskable[key]

    const icon = {}

    add(icon, 'src', path)
    add(icon, 'sizes', htmlSizes)
    add(icon, 'type', type)
    add(icon, 'purpose', 'maskable')

    icons.push(icon)
  }

  return icons
}

function buildWebAppManifestServiceWorker (manifest) {
  const {output: {serviceWorker: output}} = manifest

  if (!output) return null

  const {path} = output

  return {
    src: path,
  }
}

function buildWebAppManifestRelatedApplications (manifest) {
  const {applications: {native}} = manifest

  return native.map(application => {
    const {
      fingerprints,
      id,
      minVersion,
      platform,
      url,
    } = application

    const relatedApplication = {}

    addNonEmpty(relatedApplication, 'fingerprints', fingerprints)
    addOptional(relatedApplication, 'id', id)
    addOptional(relatedApplication, 'min_version', minVersion)
    add(relatedApplication, 'platform', platform)
    addOptional(relatedApplication, 'url', url)

    return relatedApplication
  })
}

function add (object, property, value) {
  object[property] = value
}

function addNonDefault (object, property, value, defaultValue) {
  if (value !== defaultValue) object[property] = value
}

function addNonEmpty (object, property, value) {
  if (value.length > 0) object[property] = value
}

function addOptional (object, property, value) {
  if (value != null) object[property] = value
}
