module.exports = [
    {
        'path': '/Group/GetInterviewList',
        'type': 'get',
        'response': {
            'key': 'server 1'
        },
        'callback': function(req, res) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache' });
            var responseData = {
                code: 200,
                data: {
                    interViews: [
                        {
                            id: '11',
                            label: '2016产品经理助理'
                        },
                        {
                            id: '22',
                            label: '2016产品经理助理'
                        }
                    ]
                }
            }
            res.write(JSON.stringify(responseData));
            res.end();
        }
    },
    {
        'path': '/post1',
        'type': 'post',
        'response': {
            'key': 'post 1'
        }
    }
]