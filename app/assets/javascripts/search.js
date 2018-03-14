const search = instantsearch({
  appId: 'LGBNQCJZQ4',
  apiKey: '23475ebf03be0a7445f2c86561dda2b1',
  indexName: 'rubygems',
  urlSync: true
});

const numberWithSpaces = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// initialize SearchBox
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#query',
      placeholder: 'Search for Gems',
      autofocus: false,
      poweredBy: false,
      reset: true,
      loadingIndicator: false
    })
  );

search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: function(hit) {
          var licenses = '';
          var desc = (hit._snippetResult.description.value ?
            hit._snippetResult.description.value :
            hit._snippetResult.summary.value);
          var author = [hit.github_organisation, hit.authors, hit.hostname].filter(function(e) {return e && e.length})[0];
          var authorURL = [hit.home, hit.code, 'http://www.rubydoc.info/gems/' + hit.name].filter(function(e) {return e && e.length})[0];

          var authorImg = (hit.github_organisation ?
            'https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/https://github.com/' + hit.github_organisation + '.png' :
            '/assets/ico-home.svg');

          for (var i = 0; i < hit.licenses.length; i++) {
            licenses += '<span class="ais-hit-license">' + hit.licenses[i] + '</span>'
          }

          return '\
          <div class="ais-hit-links">\
            <a href="' + authorURL + '" target="_blank">\
              <img width="20" height="20" class="ais-project-author" src="' + authorImg + '" />\
              <span class="ais-author-link">' + author + '</span>\
            </a>\
          </div>\
          <a class="gems__gem" href="/gems/' + hit.name + '">\
              <span class="gems__gem__info">\
                <h2 class="gems__gem__name">' + hit._highlightResult.name.value +
                  '<div class="ais-hit-licenses">' + licenses + '</div>\
                  <span class="gems__gem__version">' + hit.number + '</span>\
                </h2>\
                <p class="gems__gem__desc t-text">' + desc + '</p>\
              </span>\
              <p class="gems__gem__downloads__count">' + numberWithSpaces(hit.downloads) + '\
                <span class="gems__gem__downloads__heading">Downloads</span>\
              </p>\
            </a>';
        }
      }
    })
  );

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats-container',
    cssClasses: {
      body: 'ais-stats-results'
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    scrollTo: true,
    showFirstLast: false
  })
);


  // <%= link_to rubygem_path(rubygem.name), :class => 'gems__gem' do %>
  //   <span class="gems__gem__info">
  //     <h2 class="gems__gem__name">
  //       <%= rubygem.name %>
  //       <span class="gems__gem__version"><%= latest_version_number(rubygem) %></span>
  //     </h2>
  //     <p class="gems__gem__desc t-text"><%= short_info(rubygem) %></p>
  //   </span>
  //   <p class="gems__gem__downloads__count">
  //     <%= download_count rubygem %>
  //     <span class="gems__gem__downloads__heading">
  //       <%= t('rubygems.index.downloads') %>
  //     </span>
  //   </p>
  // <% end %>


search.start();

if($("#advanced-search").length){
  var $main        = $('#home_query');
  var $name        = $('input#name');
  var $summary     = $('input#summary');
  var $description = $('input#description');
  var $downloads   = $('input#downloads');
  var $updated     = $('input#updated');

  $name.add($summary)
    .add($description)
    .add($downloads)
    .add($updated)
    .on('input', function(e) {
      var name        = $name.val().length > 0 ? 'name: ' + $name.val() : '';
      var summary     = $summary.val().length > 0 ? 'summary: ' + $summary.val() : '';
      var description = $description.val().length > 0 ? 'description: ' + $description.val() : '';
      var downloads   = $downloads.val().length > 0 ? 'downloads: ' + $downloads.val() : '';
      var updated     = $updated.val().length > 0 ? 'updated: ' + $updated.val() : '';

      $main.val($.trim(name + ' ' + summary + ' ' + description + ' ' + downloads + ' ' + updated));
  });
}
