import * as React from 'react'
import Category from '../interfaces/Category'

interface Props {
    categories: Category[]
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
    column: string
    value: number
}

const CategoryDropDown: React.VFC<Props> = props => {
    const { categories, column, handleChange, value } = props

    return (categories.length > 0) ? (
        <select name={column} defaultValue={value} onChange={handleChange}>
            {
                [{parent_id: null, id: 0, name:'未選択'}, ...categories].map((category: Category) => (
                    <option value={category.id}>{category.name}</option>
                ))
            }
        </select>
    ) : <></>
}

export default CategoryDropDown
