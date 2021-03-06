/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => (
  <>
    <header className="header">
      <h1 className="header-title">管理者ページ</h1>
    </header>
    <div className="contents">
      <h2>管理者ホーム</h2>
      <div>
        <Link to="/menu-edit">メニューの編集</Link>
      </div>
    </div>
  </>
)

export default HomePage
