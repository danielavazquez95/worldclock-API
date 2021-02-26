const router = require('express').Router();
const  axios =  require('axios');
const { Timezones } = require('../db');


router.get('/timezones', async (req, res) => {

    try {
        const response = await axios.get('https://worldtimeapi.org/api/timezone');
        const objectData = response.data.map( item => ({name: item}));
        res.json(objectData)
      } catch (error) {
        res.status(413).json({ 'error': err.message}); 
    }

});

router.get('/timezones/:area/:location', async (req, res) => {

  try {
      const response = await axios.get(`https://worldtimeapi.org/api/timezone/${req.params.area}/${req.params.location}`);
      res.json(response.data)
    } catch (error) {
      res.status(413).json({ 'error': err.message}); 
  }

});

router.get('/timezones/:area/:location/:region', async (req, res) => {

    try {
        const response = await axios.get(`https://worldtimeapi.org/api/timezone/${req.params.area}/${req.params.location}/${req.params.region}`);
        console.log(response);
        res.json(response.data)
      } catch (error) {
        res.status(413).json({ 'error': err.message}); 
    }

});

router.post('/timezones/dbupload', async (req, res) => {

  const timezones = await Timezones.create(req.body);
  res.json(timezones);

});

router.get('/timezones/dbload', async (req, res) => {

    const timezones = await Timezones.findAll({
      order : [ 
          [ 'createdAt' ,  'asc' ] 
        ] 
    });
     res.json(timezones);
});

router.delete('/timezones/dbdelete/:id', async (req, res) =>{

    await Timezones.destroy({
      where: {id: req.params.id}
    });
    res.json({success: 'It was deleted'});
});



module.exports = router;