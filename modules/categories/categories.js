const express = require('express');
const router = express.Router();
const category = require('./categories.model.js');

router.get('/', function(request, response) {

    category.get({}, null, null, {_id: 1}, function(err, result) {
        if(!err)
            response.status(200);
        else
            response.status(500);

        if(!result)
            response.status(404).end();
        else
            response.json(result);
    });

});

router.post('/', function(request, response) {

    const name = request.body.name;

    category.insert({ name: name }, function(err, result) {
        if(!err)
            response.status(200);
        else
            response.status(500);

        response.json(result);
    });
});

router.get('/:id', function(request, response) {

    const id = request.params.id;

    category.get({ "_id" : id }, null, null, null, function(err, result) {
        if(!err)
            response.status(200);
        else
            response.status(500);

        if(!result)
            response.status(404).end();
        else
            response.json(result);
    });
});

router.put('/:id', function(request, response) {

    const id = request.params.id;
    const name = request.body.name;
    const update = { name: name};

    category.update(id, update, function(err, result) {
        if(!err)
            response.status(200);
        else
            response.status(500);

        response.end();
    });
});

router.delete('/:id', function(request, response) {

    const id = request.params.id;

    category.delete(id, function(err, result) {
        if(!err)
            response.status(200);
        else
            response.status(500);

        response.end();
    });
});

module.exports = router;
