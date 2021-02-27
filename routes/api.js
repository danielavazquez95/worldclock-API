const router = require('express').Router();
const  axios =  require('axios');
const { Timezones } = require('../db');

router.get('/timezones', async (req, res) => {

    try {
        const response = await axios.get('https://worldtimeapi.org/api/timezone');
        const objectData = response.data.map( item => ({name: item}));
        res.json(objectData);

      } catch (err) {
        res.status(413).json({ 'error': err.message}); 
    }

});

router.get('/timezones/:area/:location', async (req, res) => {

  try {
      const response = await axios.get(`https://worldtimeapi.org/api/timezone/${req.params.area}/${req.params.location}`);
      res.json(response.data);

    } catch (err) {
      res.status(413).json({ 'error': err.message}); 
  }

});

router.get('/timezones/:area/:location/:region', async (req, res) => {

    try {
        const response = await axios.get(`https://worldtimeapi.org/api/timezone/${req.params.area}/${req.params.location}/${req.params.region}`);
        res.json(response.data);

      } catch (err) {
        res.status(413).json({ 'error': err.message}); 
    }

});

router.post('/timezones/dbupload', async (req, res) => {
  
  try{

    let timezones = await Timezones.findAll({
      where: {name : req.body.name }
    });

    if(timezones.length > 0) {
      res.json({message: 'The name already exists'});
      throw new Error ('The name already exists');
    }

    timezones = await Timezones.create(req.body);
    res.json(timezones);

  } catch(err) {
    res.status(413).json({ 'error': err.message}); 
  }

});

router.get('/timezones/dbload', async (req, res) => {

  try {
    const timezones = await Timezones.findAll({
      order : [ 
          [ 'createdAt' ,  'asc' ] 
        ] 
    });
    
     res.json(timezones);

  } catch (err) {
    res.status(413).json({ 'error': err.message}); 
  }
});

router.delete('/timezones/dbdelete/:id', async (req, res) =>{

  try{
     const timezones = await Timezones.destroy({
      where: {id: req.params.id}
    });
    res.json({success: 'It was deleted'});

  } catch (err) {
    res.status(413).json({ 'error': err.message}); 
  }

});



module.exports = router;