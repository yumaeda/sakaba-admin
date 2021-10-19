import * as React from 'react'
import Category from '../interfaces/Category'

interface Props {
    categories: Category[]
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
    selectedValue: number
}

const CategoryDropDown: React.VFC<Props> = props => {
    const { categories, handleChange, selectedValue } = props

    return (
        <select name="category" defaultValue={selectedValue} onChange={handleChange}>
            {
                categories.map((category: Category, index: number) => (
                    <option key={index} value={category.value}>{category.name}</option>
                ))
            }
        </select>
    )
}

export default CategoryDropDown
