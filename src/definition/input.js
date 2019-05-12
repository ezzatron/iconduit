module.exports = {
  'apple-touch-icon': {
    type: 'composite',
    options: {
      layers: [
        {input: 'icon-foreground', style: 'apple-touch-icon-scale'},
        {input: 'icon-background', style: 'apple-touch-icon-scale'},
      ],
    },
  },
  'apple-touch-startup': {},
  'background-color': {},
  'dmg-background': {},
  icon: {},
  'icon-background': {
    options: {
      fallback: 'background-color',
    },
  },
  'icon-bleed': {},
  'icon-foreground': {
    type: 'composite',
    options: {
      layers: [
        {input: 'icon'},
        {input: 'icon-bleed', optional: true},
      ],
    },
  },
  'icon-mask': {
    options: {
      fallback: 'icon-mask-android-circle',
    },
  },
  'icon-mask-android-circle': {},
  'icon-mask-android-rounded-square': {},
  'icon-mask-android-square': {},
  'icon-mask-android-squircle': {},
  'icon-mask-android-teardrop': {},
  'icon-silhouette': {
    options: {
      fallback: 'icon',
    },
  },
  'maskable-icon': {
    type: 'composite',
    options: {
      layers: ['icon-foreground', 'icon-background'],
    },
  },
  'masked-icon': {
    type: 'composite',
    options: {
      mask: 'icon-mask',
      layers: ['icon-foreground', 'icon-background'],
    },
  },
  'open-graph-image': {
    options: {
      fallback: 'social-share-image',
    },
  },
  'safari-mask-icon': {
    type: 'composite',
    options: {
      layers: [
        {input: 'icon-silhouette', style: 'safari-mask-icon-scale'},
      ],
    },
  },
  'social-share-image': {
    type: 'composite',
    options: {
      layers: [
        {input: 'icon-silhouette', style: 'social-share-icon-scale'},
      ],
    },
  },
  'twitter-card-image': {
    options: {
      fallback: 'social-share-image',
    },
  },
  'windows-tile': {
    type: 'composite',
    options: {
      layers: [
        {input: 'windows-tile-icon', style: 'windows-tile-icon-position'},
      ],
    },
  },
  'windows-tile-icon': {
    options: {
      fallback: 'icon-silhouette',
    },
  },
}
