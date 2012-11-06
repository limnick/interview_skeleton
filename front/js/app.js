$(document).ready(function() {

    window.App = new Backbone.Marionette.Application();

    var QuakeModel = Backbone.Model.extend({});
    
    var QuakeCollection = Backbone.Collection.extend({
        url: 'http://localhost:8080/',
        model: QuakeModel
    });

    var QuakeItemView =  Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        template: _.template($('#quake-item-view').html()),
        model: QuakeModel
    });

    var QuakeCollectionView = Backbone.Marionette.CollectionView.extend({
        tagName: 'table',
        className: 'table table-striped',
        itemView: QuakeItemView,

        initialize: function() {
            this.collection.fetch();
        },

        onRender: function() {
            this.$el.prepend('<thead><tr> <th>Source</th> <th>Region</th> <th>Latitude</th> <th>Longitude</th> <th>Depth</th> <th>Magnitude</th> <th>Datetime</th> </tr></thead>');
        }
    });

    App.addInitializer(function(options){
        App.addRegions({
            viewport: '#viewport'
        });
    });

    App.on("initialize:after", function(options){
        var quakeTable = new QuakeCollectionView({
            collection: new QuakeCollection()
        });

        App.viewport.show(quakeTable);
    });

    App.start();
});