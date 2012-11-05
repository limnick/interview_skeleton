import cherrypy
import csv
import json

earthquake_csv = csv.reader(open('quakes.csv'))
earthquakes = []
for earthquake in earthquake_csv:
    earthquakes.append(earthquake)


class EarthquakeAPI(object):
    @cherrypy.expose
    def index(self):
        first_ten_elements = earthquakes[:10]
        return json.dumps(first_ten_elements)

if __name__ == '__main__':
    cherrypy.quickstart(EarthquakeAPI())
