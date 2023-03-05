import React, { useEffect, useState } from 'react'
import MainLayout from 'layouts/MainLayout/MainLayout'
import MainContent from '../MainContent/MainContent'
import { useSelector } from 'react-redux'
import { selectCurrentFullCategory } from 'redux/activeCategory/activeCategorySlice'

function PageHome() {
  const [ cakeTypes, setCakeTypes ] = useState(null)
  const [ cakeStyles, setCakeStyles ] = useState(null)
  const [ bestSellCakes, setBestSellCakes ] = useState(null)
  const category = useSelector(selectCurrentFullCategory)
  useEffect(() => {
    if (category) {
      setCakeTypes(category.cakeTypes)
      setCakeStyles(category.cakeStyles)
      const bestSellCakes = category.cakes.filter(cake => cake.bestSell === true)
      setBestSellCakes(bestSellCakes)
    }
  }, [category])
  return (
    <MainLayout>
      <MainContent
        cakeTypes = { cakeTypes }
        cakeStyles = { cakeStyles }
        bestSellCakes = { bestSellCakes }
      />
    </MainLayout>
  )
}

export default PageHome