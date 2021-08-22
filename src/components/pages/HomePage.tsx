/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import * as React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
    return (
        <>
            <header className="header">
                <h1 className="header-title">{`管理者ページ`}</h1>
            </header>
            <div>
                <h2>管理者ホーム</h2>
                <div>
                    <Link to="/menu-edit">メニューの編集</Link>
                </div>
            </div> 
            <Footer />
        </>
    )
}

export default HomePage
