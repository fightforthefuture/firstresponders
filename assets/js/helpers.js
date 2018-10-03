import axios from 'axios'

// Wrap text in paragraph tags
export function simpleFormat(text) {
  return text.split('\n\n').map(l => `<p>${l}</p>`).join('')
}

export function openPopup(url, title='popup', w=600, h=500) {
  // Fixes dual-screen position
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}

export function createMetaTags(tags={}) {
  const meta = {}

  tags = Object.assign({
    'author': 'Fight for the Future',
    'og:description': tags.description,
    'og:image': tags.image,
    'og:site_name': 'First Responders for Net Neutrality',
    'og:title': tags.title,
    'og:type': 'website',
    'og:url': tags.url,
    'twitter:card': 'summary_large_image',
    'twitter:description': tags.description,
    'twitter:image': tags.image,
    'twitter:site': '@FightForTheFtr',
    'twitter:title': tags.title,
    'twitter:url': tags.url
  }, tags)

  const fakeTagNames = ['title', 'image', 'url']

  for (let key of Object.keys(tags)) {
    if (key.match(/^og\:/)) {
      meta[key] = {
        hid: key,
        property: key,
        content: tags[key]
      }
    }
    else if (!fakeTagNames.includes(key)) {
      meta[key] = {
        hid: key,
        name: key,
        content: tags[key]
      }
    }
  }

  return Object.values(meta)
}

// Pre-select US State based on IP
export async function geocodeState() {
  const state = {
    name: null,
    abbr: null
  }

  try {
    const response = await axios.get('https://fftf-geocoder.herokuapp.com')
    const geo = response.data

    if (
      geo.country.iso_code === 'US' &&
      geo.subdivisions &&
      geo.subdivisions[0] &&
      geo.subdivisions[0].names &&
      geo.subdivisions[0].names.en
    ) {
      state.name = geo.subdivisions[0].names.en
      state.abbr = geo.subdivisions[0].iso_code
    }
  }
  catch (err) {
    console.error(err)
  }

  return state
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
export function smoothScrollTo(endX, endY, duration) {
  var startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  var easeInOutQuart = function(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  var timer = window.setInterval(function() {
    var time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      window.clearInterval(timer);
    }
    window.scrollTo(newX, newY);
  }, 1000 / 60); // 60 fps
};

export function smoothScrollToElement(el, duration) {
  duration = typeof duration !== 'undefined' ? duration : 500;
  el = typeof el === 'string' ? document.querySelector(el) : el;

  if (el) {
    smoothScrollTo(el.offsetLeft, el.offsetTop, duration)
  }
}
