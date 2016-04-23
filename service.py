#!/usr/bin/python
print "Content-type: text/html\n\n"

import webapp2
import requests

urls = (
    '/imagedata', 'get_image'
)
cnt = 0
class get_image:
    def post(self):
        json_data = self.request.post()
        parsed_json=json.loads(json_data)
        imgdata = base64.b64decode(parsed_json['link'])
        filename = '../vhosts/images/some_image'+cnt+'.png'
        cnt += 1
        with open(filename, 'wb') as f:
   		f.write(imgdata)
        return filename

app = webapp2.WSGIApplication([
    urls,
], debug=True)

def main():
    from paste import httpserver
    httpserver.serve(app, host='127.0.0.1', port='8080')

if __name__ == '__main__':
    main()

