window.addEventListener('load', (function() {
  var d, desc, e, f, fbQuery, fn, i, itemJ, j, k, l, nameJ, names, path, s, t, u, vkImage;
  e = document.getElementsByTagName('div');
  path = function(name) {
    var b, m, p, sc, scL, sr;
    sc = document.getElementsByTagName('script');
    sr = new RegExp('^(.*/|)(' + name + ')([#?]|$)');
    p = 0;
    scL = sc.length;
    while (p < scL) {
      m = String(sc[p].src).match(sr);
      if (m) {
        if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\/\\])/)) {
          return m[1];
        }
        if (m[1].indexOf('/') === 0) {
          return m[1];
        }
        b = document.getElementsByTagName('base');
        if (b[0] && b[0].href) {
          return b[0].href + m[1];
        } else {
          return document.location.pathname.match(/(.*[\/\\])/)[0] + m[1];
        }
      }
      p++;
    }
    return null;
  };
  desc = function() {
    var m, meta;
    meta = document.getElementsByTagName('meta');
    m = 0;
    while (m < meta.length) {
      if (meta[m].name.toLowerCase() === 'description') {
        return meta[m].content;
      }
      m++;
    }
    return '';
  };
  k = 0;
  while (k < e.length) {
    if (e[k].className.indexOf('share__init') !== -1) {
      if (e[k].getAttribute('data-url') !== -1) {
        u = e[k].getAttribute('data-url');
      }
      if (e[k].getAttribute('data-title') !== -1) {
        t = e[k].getAttribute('data-title');
      }
      if (e[k].getAttribute('data-image') !== -1) {
        i = e[k].getAttribute('data-image');
      }
      if (e[k].getAttribute('data-description') !== -1) {
        d = e[k].getAttribute('data-description');
      }
      if (e[k].getAttribute('data-path') !== -1) {
        f = e[k].getAttribute('data-path');
      }
      if (e[k].getAttribute('data-icons-file') !== -1) {
        fn = e[k].getAttribute('data-icons-file');
      }
      if (!f) {
        f = path('share42.js');
      }
      if (!u) {
        u = location.href;
      }
      if (!t) {
        t = document.title;
      }
      if (!fn) {
        fn = 'icons.png';
      }
      if (!d) {
        d = desc();
      }
      u = encodeURIComponent(u);
      t = encodeURIComponent(t);
      t = t.replace(/\'/g, '%27');
      i = encodeURIComponent(i);
      d = encodeURIComponent(d);
      d = d.replace(/\'/g, '%27');
      fbQuery = 'u=' + u;
      if (i !== 'null' && i !== '') {
        fbQuery = 's=100&p[url]=' + u + '&p[title]=' + t + '&p[summary]=' + d + '&p[images][0]=' + i;
      }
      vkImage = '';
      if (i !== 'null' && i !== '') {
        vkImage = '&image=' + i;
      }
      s = ['data-link-class="facebook"  data-count="fb" onclick="window.open(\'//www.facebook.com/sharer.php?m2w&' + fbQuery + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Facebook"', 'data-link-class="ok"  data-count="ok" onclick="window.open(\'//ok.ru/dk?st.cmd=addShare&st._surl=' + u + '&title=' + t + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Одноклассники"', 'data-link-class="twitter"  data-count="twi" onclick="window.open(\'//twitter.com/intent/tweet?text=' + t + '&url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Twitter"'];
      l = '';
      j = 0;
      names = ['fb', 'ok', 'tw'];
      while (j < s.length) {
        nameJ = names[j];
        itemJ = s[j];
        l += '<span class="b-socials__link b-socials__link--' + nameJ + '" ' + itemJ + '></span>';
        j++;
      }
      e[k].innerHTML = l;
    }
    k++;
  }
}), false);
