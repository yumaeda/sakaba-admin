/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Menu from '../../interfaces/Menu'
import Footer from '../Footer'
import * as React from 'react'

const MenuEditPage: React.FC = () => {
    const menus: Menu[] = [
        {
            id: 'xxxxxx1',
            name: 'Gin & Tonic',
            name_jpn: 'ジントニック（ジン各種あります）',
            category: 1,
            sub_category: 1,
            region: 0,
            price: 650,
            is_min_price: 1
        },
        {
            id: 'xxxxxx2',
            name: 'Negroni',
            name_jpn: 'ネグローニ',
            category: 1,
            sub_category: 1,
            region: 0,
            price: 800,
            is_min_price: 0
        },
        {
            id: 'xxxxxx3',
            name: 'WhiteLady',
            name_jpn: 'ホワイトレディ',
            category: 1,
            sub_category: 1,
            region: 0,
            price: 900,
            is_min_price: 0
        }
    ]

    const [menuId, setMenuId] = React.useState<string>('')

    const handleFocus = (event: React.FormEvent<HTMLTableRowElement>) => {
        setMenuId(event.currentTarget.getAttribute('id') || '')
    }

    const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        alert(`Menu ID: ${menuId}`)
        alert(`Column Name: ${event.currentTarget.getAttribute('name')}`)
        alert(`Column Value: ${event.currentTarget.value}`)
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
                        menus.map((menu: Menu) => (
                            <tr onFocus={handleFocus} id={menu.id}>
                                <td><input type="number" name="category" value={menu.category} onBlur={handleBlur} /></td>
                                <td><input type="number" name="sub_category" value={menu.sub_category} onBlur={handleBlur} /></td>
                                <td><input type="number" name="region" value={menu.region} onBlur={handleBlur} /></td>
                                <td><input type="text" name="name" value={menu.name} onBlur={handleBlur} /></td>
                                <td><input type="text" name="name_jpn" value={menu.name_jpn} onBlur={handleBlur} /></td>
                                <td><input type="number" name="price" value={menu.price} onBlur={handleBlur} /></td>
                                <td><input type="number" name="is_min_price" value={menu.is_min_price} onBlur={handleBlur} /></td>
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
