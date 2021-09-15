/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Menu from '../../interfaces/Menu'
import { idTokenKey } from '../../utils/LocalStorageKeys'
import Footer from '../Footer'
import * as React from 'react'

const MenuEditPage: React.FC = () => {
    const [menus, setMenus] = React.useState<Menu[]>()
    const [menuId, setMenuId] = React.useState<string>('')

    React.useEffect(() => {
        fetch('https://api.tokyo-takeout.com/menus', {
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

    const handleFocus = (event: React.FormEvent<HTMLTableRowElement>) => {
        setMenuId(event.currentTarget.getAttribute('id') || '')
    }

    const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        const column = event.currentTarget.getAttribute('name')
        const value = event.currentTarget.value
        const postOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem(idTokenKey) ?? ''
            },
            body: JSON.stringify(
                {
                    'id': menuId,
                    'column': column,
                    'value': value,
                })
        }
        fetch('https://api.tokyo-takeout.com/menu', postOptions)
            .then(res => res.json())
            .then(data => {
                console.dir(data)
            })
    }

    return (
        <>
            <header className="header">
                <h1 className="header-title">{`メニューの編集`}</h1>
            </header>
            <div>
            {
                <table>
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
                        menus?.map((menu: Menu) => (
                            <tr onFocus={handleFocus} key={window.atob(menu.id)} id={window.atob(menu.id)}>
                                <td><input type="number" name="category" defaultValue={menu.category} onBlur={handleBlur} /></td>
                                <td><input type="number" name="sub_category" defaultValue={menu.sub_category} onBlur={handleBlur} /></td>
                                <td><input type="number" name="region" defaultValue={menu.region} onBlur={handleBlur} /></td>
                                <td><input type="text" name="name" defaultValue={menu.name} onBlur={handleBlur} /></td>
                                <td><input type="text" name="name_jpn" defaultValue={menu.name_jpn} onBlur={handleBlur} /></td>
                                <td><input type="number" name="price" defaultValue={menu.price} onBlur={handleBlur} /></td>
                                <td><input type="number" name="is_min_price" defaultValue={menu.is_min_price} onBlur={handleBlur} /></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            }
            </div> 
            <Footer />
        </>
    )
}

export default MenuEditPage
