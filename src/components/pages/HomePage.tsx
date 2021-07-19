/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import * as React from 'react'

const HomePage: React.FC = () => {
    return (
        <>
            <header className="header">
                <h1>{`管理者ページ`}</h1>
            </header>
            <div>Hello World!</div> 
            <Footer />
        </>
    )
}

export default HomePage
