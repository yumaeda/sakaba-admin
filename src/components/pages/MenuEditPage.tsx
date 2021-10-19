/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Category from '../../interfaces/Category'
import Menu from '../../interfaces/Menu'
import CategoryDropDown from '../CategoryDropdown'
import { idTokenKey, userNameKey } from '../../utils/LocalStorageKeys'
import restaurantIdHash from '../../utils/RestaurantIdHash'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

const MenuEditPage: React.FC = () => {
    const [categories, setCategories] = React.useState<Category[]>([])
    const [menus, setMenus] = React.useState<Menu[]>([])
    const [menuId, setMenuId] = React.useState<string>('')
    const [menuIndex, setMenuIndex] = React.useState<number>(0)
    const restaurantId = restaurantIdHash[localStorage.getItem(userNameKey) ?? '']

    React.useEffect(() => {
        fetch(`https://api.sakaba.link/categories?restaurant_id=${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setCategories(JSON.parse(data.body))
            },
            (error: Error) => {
                console.dir(error)
            }
        )

        fetch(`https://api.sakaba.link/menus?restaurant_id=${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setMenus(JSON.parse(data.body))
            },
            (error: Error) => {
                console.dir(error)
            }
        )
    }, [])

    const handleAddMenu = () => {
        let emptyMenu: Menu = {
            id: uuidv4(),
            restaurant_id: restaurantId,
            category:  0,
            sub_category:  0,
            region: 0,
            name: '',
            name_jpn: '',
            price:  0,
            is_min_price: 0
        }

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem(idTokenKey) ?? ''
            },
            body: JSON.stringify(emptyMenu)
        }
        fetch('https://api.sakaba.link/menu', postOptions)
            .then(res => res.json())
            .then(data => {
                emptyMenu.id = window.btoa(emptyMenu.id)
                console.dir(data)
                setMenus([...menus, emptyMenu])
            })
    }

    const handleDeleteMenu = () => {
        const deleteOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem(idTokenKey) ?? ''
            },
            body: JSON.stringify({
                'id': menuId
            })
        }
        fetch('https://api.sakaba.link/menu', deleteOptions)
            .then(res => res.json())
            .then(data => {
                console.dir(data)
                let newMenus = [...menus]
                newMenus.splice(menuIndex, 1)
                setMenus(newMenus)
            })
    }

    const handleFocus = (event: React.FormEvent<HTMLTableRowElement>) => {
        setMenuId(event.currentTarget.getAttribute('id') || '')
        setMenuIndex(Number(event.currentTarget.getAttribute('tabindex')) || 0)
    }

    const updateMenu = (column: string, value: string) => {
        const postOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem(idTokenKey) ?? ''
            },
            body: JSON.stringify({
                'id': menuId,
                column,
                value
            })
        }
        fetch('https://api.sakaba.link/menu', postOptions)
            .then(res => res.json())
            .then(data => {
                console.dir(data)
            })
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateMenu(
            event.currentTarget.getAttribute('name') || '',
            event.currentTarget.value
        )
    }

    const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        updateMenu(
            event.currentTarget.getAttribute('name') || '',
            event.currentTarget.value
        )
    }

    return (
        <>
            <header className="header">
                <h1 className="header-title">{`メニュー管理`}</h1>
                <input type="button" onClick={handleAddMenu} value="追加する" />
            </header>
            <div className="contents">
                <table className="menu-table">
                    <thead>
                        <tr>
                            <th>第1カテゴリー</th>
                            <th>第2カテゴリー</th>
                            <th>第3カテゴリー</th>
                            <th>名前</th>
                            <th>フリガナ</th>
                            <th>金額</th>
                            <th>最低金額</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        menus?.map((menu: Menu, index: number) => (
                            <tr onFocus={handleFocus} key={window.atob(menu.id)} id={window.atob(menu.id)} tabIndex={index}>
                                <td>
                                    <CategoryDropDown categories={categories.filter((category: Category) => category.parent_id == null)} handleChange={handleChange} column="category" value={menu.category} />
                                </td>
                                <td>
                                    <CategoryDropDown categories={categories.filter((category: Category) => category.parent_id == menu.category)} handleChange={handleChange} column="sub_category" value={menu.sub_category} />
                                </td>
                                <td>
                                    <CategoryDropDown categories={categories.filter((category: Category) => category.parent_id == menu.sub_category)} handleChange={handleChange} column="region" value={menu.region} />
                                </td>
                                <td><input type="text" name="name" defaultValue={menu.name} onBlur={handleBlur} /></td>
                                <td><input type="text" name="name_jpn" defaultValue={menu.name_jpn} onBlur={handleBlur} /></td>
                                <td><input type="number" name="price" defaultValue={menu.price} onBlur={handleBlur} /></td>
                                <td><input type="number" name="is_min_price" defaultValue={menu.is_min_price} onBlur={handleBlur} /></td>
                                <td><input type="button" onClick={handleDeleteMenu} value="削除" /></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div> 
        </>
    )
}

export default MenuEditPage
