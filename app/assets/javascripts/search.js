const search = instantsearch({
  appId: 'LGBNQCJZQ4',
  apiKey: '23475ebf03be0a7445f2c86561dda2b1',
  indexName: 'rubygems',
  urlSync: true
});

// initialize SearchBox
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#query',
      placeholder: 'Search for Gems'
    })
  );

search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: '\
          <a class="gems__gem" href="/gems/{{name}}">\
            <span class="gems__gem__info">\
              <h2 class="gems__gem__name">\
                {{{_highlightResult.name.value}}}\
                <span class="gems__gem__version">{{number}}</span>\
              </h2>\
              <p class="gems__gem__desc t-text">{{description}}</p>\
            </span>\
            <p class="gems__gem__downloads__count">\
              {{downloads}}\
              <span class="gems__gem__downloads__heading">\
                Téléchargements\
              </span>\
            </p>\
          </a>'
      }
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
