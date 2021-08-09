/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import * as React from 'react'

const HomePage: React.FC = () => {
    return (
        <>
            <header className="header">
                <h1 className="header-title">{`管理者ページ`}</h1>
            </header>
            <div>管理者ホーム</div> 
            <Footer />
        </>
    )
}

export default HomePage
