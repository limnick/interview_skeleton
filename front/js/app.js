
var earthquakes;

$(document).ready(function() {

    var EarthquakeRecord = Backbone.Model.extend({});

    var Earthquakes = Backbone.Collection.extend({
        url: "http://localhost:8080",
        model: EarthquakeRecord
    });

    var EarthquakeTable = Backbone.View.extend({
        el: ".container",

        initialize: function() {
            this.$table = this.$el.find("#earthquakes");
            this.earthquakes = new Earthquakes();
            this.earthquakes.on('reset', _.bind(this.render, this));
            this.earthquakes.fetch();
        },

        render: function() {
            var regionNames = _.uniq(this.earthquakes.pluck("Region"));

            this.$el.find("#finder").typeahead({
                source: regionNames
            });

            this.renderEarthquakeRow(Object.keys(this.earthquakes.first().attributes));

            this.earthquakes.each(_.bind(function(earthquake) {
                this.renderEarthquakeRow(earthquake.attributes);
            }, this));
        },

        renderEarthquakeRow: function(list, extraClassName) {
            var $tr = $("<tr/>");

            _.each(list, function(value) {
                $tr.append($("<td/>", { text: value }));
            });

            this.$table.append($tr);
        }
    });

    var table = new EarthquakeTable();
});