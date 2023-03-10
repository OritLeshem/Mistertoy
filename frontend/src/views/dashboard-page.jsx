import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ToyChart } from "../cmps/toy-chart"
import { showErrorMsg } from '../services/event-bus.service'
import { loadToys } from '../store/actions/toy.action'

export function DashboardPage() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

  useEffect(() => {
    onLoadToys()
  }, [])

  function onLoadToys() {
    loadToys()
      .catch(err => {
        showErrorMsg('Cannot load cars', err)
      })
  }

  function pricePerLabels() {
    const avgPriceLabels = labels.map(label => {
      const labelsToys = toys.map(toy => {
        const isLabel = toy.labels.some(toyLabel => toyLabel === label)
        if (isLabel) return toy.price
        else return 0
      })
      return labelsToys.reduce((acc, value) => acc += (+value), 0) / labelsToys.length
    })
    return avgPriceLabels
  }

  function inventoryByType() {
    const avgPriceLabels = labels.map(label => {
      const labelsToys = toys.map(toy => {
        const isLabel = toy.labels.some(toyLabel => toyLabel === label)
        if (isLabel && toy.inStock) return 1
        else return 0
      })
      return labelsToys.reduce((acc, value) => acc += (+value), 0) / labelsToys.length
    })
    return avgPriceLabels
  }

  return <section className="dashboard-page">
    <div className="chart-container">
      <div className="chart">
        <h2>Prices per toy label</h2>
        <ToyChart dataChart={pricePerLabels()} labels={labels} />

      </div>
      <div className="chart">
        <h2>Inventory by type</h2>
        <ToyChart dataChart={inventoryByType()} labels={labels} />

      </div>
    </div>
  </section>
}