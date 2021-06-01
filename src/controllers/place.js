const places = require('../repositories/places')

places = require('../repositories/places')

module.exports = {
    get(){
        places = await places.findAll();
        return places;
    },

    get(id){
        place = await places.find(id);
        return place;
    },

    create(){
        place = await places.create(id, name);
        return place;
    },

    update(id, newId){
        place = await places.update(id, newId);
        return place;
    }
}