/* global console:true */
module.exports = function (http, host) {
    return {
        send: function (metric, tags) {
            if (host===undefined) {
                return;
            }
            var graphiteData = JSON.stringify({
                what: metric,
                tags: tags
            });

            var headers = {
                'Content-Type': 'application/json',
                'Content-Length': graphiteData.length
            };

            var options = {
                host: host,
                port: 80,
                path: '/events/',
                method: 'POST',
                headers: headers
            };
            var req = http.request(options);
            console.log(req);

            req.write(graphiteData);
            req.end();
        }
    };
};

