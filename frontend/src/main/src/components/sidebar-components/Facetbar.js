import React from 'react'

import CheckboxFacetAccordion from '../featured-components/CheckboxFacetAccordion'
import SliderFacetAccordion from '../featured-components/SliderFacetAccordion'

export default function Facetbar({ reset, result, onFilterChange }) {

    const [facetTitle] = React.useState(['Price', 'Category', 'Brand'])
    const [facetResult, setFacetResult] = React.useState([])
    const [facetStats, setFacetStats] = React.useState({})
    const [selection, setSelection] = React.useState({})

    React.useEffect(() => {
        if (result && result.facetFields) {
            const r = []
            result.facetFields.map((v,i) => {
                if (v.name === 'Section_Title')
                    r[0] = result.facetResultPages[i]
                else
                    r[1] = result.facetResultPages[i]
                return v
            })
            setFacetResult(r)
        }        
        setFacetStats(result.fieldStatsResults)
    }, [result])

    React.useEffect(()=>{
        if(reset)
            setSelection({})
    }, [reset])

    const handleFilterChange = (data) => {
        const filters = selection
        if (data.title === facetTitle[0]) { // Price fiter
            filters.price = data.values
        } else if (data.title === facetTitle[1]) { // Category filter
            filters.category = data.values
        } else if (data.title === facetTitle[2]) { // Branch filter
            filters.brand = data.values
        }
        setSelection(filters)
        onFilterChange(filters);
    }

    return (
        <div style={{ 'padding': '0px 10px' }}>
            <SliderFacetAccordion expanded={true} title={facetTitle[0]} facetStats={facetStats} handleFilterChange={handleFilterChange} />
            {facetResult.length > 0 ? facetResult.map((page, i) => <CheckboxFacetAccordion key={i} fresh={reset} expanded={true} title={facetTitle[i+1]} content={page.content} handleFilterChange={handleFilterChange} />) : null}
        </div>
    )
}