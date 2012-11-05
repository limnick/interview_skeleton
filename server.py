import cherrypy
import csv
import json

earthquake_csv = csv.reader(open('quakes.csv'))
earthquakes = []

record_keys = earthquake_csv.next()
for earthquake in earthquake_csv:
    earthquakes.append(dict(zip(record_keys, earthquake)))


class EarthquakeAPI(object):
    @cherrypy.expose
    def index(self):
        return json.dumps(earthquakes[:100])

if __name__ == '__main__':
    cherrypy.quickstart(EarthquakeAPI())
