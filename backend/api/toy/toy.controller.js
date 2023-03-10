const toyService = require('./toy.service.js')

// const logger = require('../../services/logger.service')

async function getToys(req, res) {
  try {
    // logger.debug('Getting Toys')
    // const filterBy = {
    //   name: req.query.params.filterBy.name || '',
    //   price: req.query.params.filterBy.price || 0
    // }
    const { filterBy } = req.query.params
    const toys = await toyService.query(filterBy)
    res.json(toys)
  } catch (err) {
    // logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}
async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    // logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function addToy(req, res) {
  const { loggedinUser } = req

  try {
    const toy = req.body
    toy.owner = loggedinUser
    console.log('added toy', toy, 'by', toy.owner)
    const addedToy = await toyService.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}
async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    // logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}
async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}


module.exports = {
  getToys,
  removeToy,
  addToy,
  getToyById,
  updateToy

}
